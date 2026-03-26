import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Select, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { addPolicy, editPolicy, fetchPolicies, getPolicyById } from "../../redux/slice/policy";
import { toast } from "react-toastify";

const HIGH_VALUE_THRESHOLD = 20000000; // 2 Crore

const POLICY_TYPE_OPTIONS = [
  { label: "Motor", value: 0 },
  { label: "Property", value: 1 },
  { label: "Travel", value: 2 },
];

const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer name is required"),
  policyType: Yup.number().required("Policy type is required"),
  sumInsured: Yup.number()
    .typeError("Sum insured must be a number")
    .required("Sum insured is required")
    .positive("Sum insured must be positive"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test("end-after-start", "End date must be after start date", function (value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return dayjs(value).isAfter(dayjs(startDate));
    }),
});

const PolicyFormik = ({ policyId, isNewPolicy, onClose, afterSubmit, initialData }) => {
  const dispatch = useDispatch();
  const [policyData, setPolicyData] = useState(initialData || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isNewPolicy && policyId && !initialData) {
      dispatch(getPolicyById(policyId))
        .unwrap()
        .then((data) => setPolicyData(data))
        .catch((err) => console.error("Failed to fetch policy", err));
    } else if (initialData) {
      setPolicyData(initialData);
    }
  }, [dispatch, isNewPolicy, policyId, initialData]);

  const initialValues = {
    customerName: policyData?.customerName || "",
    policyType: policyData?.policyType ?? "",
    sumInsured: policyData?.sumInsured || "",
    startDate: policyData?.startDate || "",
    endDate: policyData?.endDate || "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    let didSucceed = false;
    setLoading(true);

    try {
      let payload;

      if (isNewPolicy) {
        payload = await dispatch(addPolicy(values)).unwrap();
      } else {
        payload = await dispatch(editPolicy({ id: policyId, data: values })).unwrap();
      }

      if (payload) {
        toast.success(isNewPolicy ? "Policy created successfully" : "Policy updated successfully");
        didSucceed = true;
      }
    } catch (err) {
      toast.error(err.message || (isNewPolicy ? "Failed to create policy" : "Failed to update policy"));
    } finally {
      setLoading(false);
      resetForm();
      dispatch(fetchPolicies());
      onClose();
      if (didSucceed) afterSubmit?.();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ setFieldValue, values }) => (
        <Form className="space-y-4">

          {/* High Value Warning */}
          {Number(values.sumInsured) > HIGH_VALUE_THRESHOLD && (
            <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 rounded-lg px-4 py-3 text-sm font-medium">
              ⚠️ High Value Policy — Requires Underwriting Approval
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">

            {/* Customer Name */}
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <Field name="customerName" as={Input} placeholder="Enter customer name" />
              <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Policy Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Type <span className="text-red-500">*</span>
              </label>
              <Field name="policyType">
                {({ field }) => (
                  <Select
                    {...field}
                    placeholder="Select policy type"
                    className="w-full"
                    value={values.policyType === "" ? undefined : values.policyType}
                    onChange={(val) => setFieldValue("policyType", val)}
                    options={POLICY_TYPE_OPTIONS}
                  />
                )}
              </Field>
              <ErrorMessage name="policyType" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Sum Insured */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sum Insured (₹) <span className="text-red-500">*</span>
              </label>
              <Field name="sumInsured">
                {({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Enter sum insured"
                    onChange={(e) => setFieldValue("sumInsured", e.target.value)}
                  />
                )}
              </Field>
              <ErrorMessage name="sumInsured" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                className="w-full"
                value={values.startDate ? dayjs(values.startDate) : undefined}
                onChange={(date) => setFieldValue("startDate", date?.toISOString() || "")}
              />
              <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                className="w-full"
                value={values.endDate ? dayjs(values.endDate) : undefined}
                disabledDate={(current) =>
                  values.startDate
                    ? current && current.isBefore(dayjs(values.startDate), "day")
                    : false
                }
                onChange={(date) => setFieldValue("endDate", date?.toISOString() || "")}
              />
              <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            {/* Read-only fields for edit mode */}
            {!isNewPolicy && policyData?.policyNumber && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                <Input value={policyData.policyNumber} disabled />
              </div>
            )}

            {!isNewPolicy && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <Input value={policyData?.isActive ? "Active" : "Inactive"} disabled />
              </div>
            )}

          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              className="bg-blue-500 text-white"
            >
              {isNewPolicy ? "Create Policy" : "Update Policy"}
            </Button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default PolicyFormik;