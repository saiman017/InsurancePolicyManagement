import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input, Select, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { addPolicy, editPolicy, fetchPolicies, getPolicyById } from "../../redux/slice/policy";
import { toast } from "react-toastify";

const HIGH_VALUE_THRESHOLD = 20000000;

const POLICY_TYPE_OPTIONS = [
  { label: "Motor", value: 1 },
  { label: "Property", value: 2 },
  { label: "Travel", value: 3 },
];

const enumMap = {
  Motor: 1,
  Property: 2,
  Travel: 3,
};

const validationSchema = Yup.object({
  customerName: Yup.string().required("Customer name is required"),
  policyType: Yup.number().required("Policy type is required"),
  sumInsured: Yup.number().typeError("Sum insured must be a number").required("Sum insured is required").positive("Sum insured must be positive"),
  startDate: Yup.string().required("Start date is required"),
  endDate: Yup.string()
    .required("End date is required")
    .test("end-after-start", "End date must be after start date", function (value) {
      const { startDate } = this.parent;
      if (!startDate || !value) return true;
      return dayjs(value).isAfter(dayjs(startDate));
    }),
});

const PolicyForm = ({ policyId, isNewPolicy, onClose, afterSubmit, initialData }) => {
  const dispatch = useDispatch();
  const [policyData, setPolicyData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isNewPolicy) {
      setPolicyData(null);
    } else if (policyId && !initialData) {
      dispatch(getPolicyById(policyId))
        .unwrap()
        .then((data) => setPolicyData(data))
        .catch(() => {});
    } else if (initialData) {
      setPolicyData(initialData);
    }
  }, [dispatch, isNewPolicy, policyId, initialData]);

  const initialValues = {
    customerName: policyData?.customerName || "",
    policyType: typeof policyData?.policyType === "string" ? enumMap[policyData.policyType] : policyData?.policyType ?? null,
    sumInsured: policyData?.sumInsured ?? "",
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
      if (didSucceed) {
        resetForm();
        dispatch(fetchPolicies());
        onClose();
        afterSubmit?.();
      }
    }
  };

  return (
    <Formik key={isNewPolicy ? "new" : policyId} initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit} enableReinitialize>
      {({ setFieldValue, values }) => (
        <Form className="space-y-4">
          {Number(values.sumInsured) > HIGH_VALUE_THRESHOLD && (
            <div className="bg-yellow-50 border border-yellow-400 text-yellow-800 rounded-lg px-4 py-3 text-sm font-medium">High Value Policy — Requires Underwriting Approval</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Customer Name <span className="text-red-500">*</span>
              </label>
              <Field name="customerName" as={Input} placeholder="Enter customer name" />
              <ErrorMessage name="customerName" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Policy Type <span className="text-red-500">*</span>
              </label>
              <Select placeholder="Select policy type" className="w-full" value={values.policyType} onChange={(val) => setFieldValue("policyType", val)} options={POLICY_TYPE_OPTIONS} />
              <ErrorMessage name="policyType" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Sum Insured (₹) <span className="text-red-500">*</span>
              </label>
              <Field name="sumInsured">{({ field }) => <Input {...field} type="number" placeholder="Enter sum insured" onChange={(e) => setFieldValue("sumInsured", e.target.value)} />}</Field>
              <ErrorMessage name="sumInsured" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                className="w-full"
                value={values.startDate ? dayjs(values.startDate) : null}
                disabledDate={(current) => current && current < dayjs().startOf("day")}
                onChange={(date) => setFieldValue("startDate", date ? date.toISOString() : "")}
              />
              <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date <span className="text-red-500">*</span>
              </label>
              <DatePicker
                className="w-full"
                value={values.endDate ? dayjs(values.endDate) : null}
                disabledDate={(current) => (values.startDate ? current && current.isBefore(dayjs(values.startDate), "day") : false)}
                onChange={(date) => setFieldValue("endDate", date ? date.toISOString() : "")}
              />
              <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
            </div>

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
            <Button htmlType="submit" type="primary" loading={loading}>
              {isNewPolicy ? "Create Policy" : "Update Policy"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PolicyForm;
