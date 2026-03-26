import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolicies, selectAllPolicies } from "../../redux/slice/policy";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import { Space, Tag, Table, ConfigProvider, Modal } from "antd";
import { EditOutlined } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "antd";
import TextField from "@mui/material/TextField";
import PolicyForm from "./PolicyForm";
import { formatCurrency, formatNepaliNumber } from "../../utils/currencyFormatter";

const POLICY_TYPE_LABEL = { 0: "Motor", 1: "Property", 2: "Travel" };
const POLICY_TYPE_COLOR = { 0: "blue", 1: "purple", 2: "cyan" };

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function DisplayPolicy() {
  const dispatch = useDispatch();
  const policies = useSelector(selectAllPolicies);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPolicy, setIsNewPolicy] = useState(true);
  const [selectedPolicyId, setSelectedPolicyId] = useState(undefined);
  const [selectedPolicy, setSelectedPolicy] = useState(null);

  useEffect(() => {
    dispatch(fetchPolicies());
  }, [dispatch]);

  const handleEdit = (record) => {
    setSelectedPolicyId(record.id);
    setSelectedPolicy(record);
    setIsNewPolicy(false);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setIsNewPolicy(true);
    setSelectedPolicyId(undefined);
    setSelectedPolicy(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const afterSubmit = () => {
    dispatch(fetchPolicies());
  };

  const filtered = policies
    .filter((p) =>
      Object.values(p).some((val) =>
        val?.toString().toLowerCase().includes(searchText.toLowerCase())
      )
    )
    .map((p) => ({ ...p, key: p.id }));

  const columns = [
    {
      title: "Policy Number",
      dataIndex: "policyNumber",
      key: "policyNumber",
      render: (val) => (
        <span className="font-mono font-semibold text-blue-600">{val}</span>
      ),
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
      sorter: (a, b) => (a.customerName || "").localeCompare(b.customerName || ""),
      render: (val) => <span className="font-medium text-gray-800">{val}</span>,
    },
    {
      title: "Policy Type",
      dataIndex: "policyType",
      key: "policyType",
      render: (val) => (
        <Tag color={POLICY_TYPE_COLOR[val] || "default"}>
          {POLICY_TYPE_LABEL[val] || val}
        </Tag>
      ),
      filters: [
        { text: "Motor", value: 0 },
        { text: "Property", value: 1 },
        { text: "Travel", value: 2 },
      ],
      onFilter: (value, record) => record.policyType === value,
    },
    {
      title: "Sum Insured",
      dataIndex: "sumInsured",
      key: "sumInsured",
      sorter: (a, b) => a.sumInsured - b.sumInsured,
      render: (val) => (
        <span className={Number(val) > 20000000 ? "text-orange-600 font-semibold" : ""}>
          {formatNepaliNumber(val)}
          {Number(val) > 20000000 && (
            <span className="ml-1 text-xs bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full">
              High Value
            </span>
          )}
        </span>
      ),
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (val) => formatDate(val),
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (val) => formatDate(val),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      render: (val) => (
        <Tag color={val ? "green" : "red"}>{val ? "Active" : "Inactive"}</Tag>
      ),
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.isActive === value,
    },
    {
      title: "Action",
      key: "action",
      width: "10%",
      render: (_, record) => (
        <Space size="middle">
          <div
            className="border border-[#91d5ff] rounded-[4px] p-[8px] cursor-pointer inline-flex items-center justify-center hover:bg-blue-50"
            onClick={() => handleEdit(record)}
          >
            <EditOutlined style={{ color: "#1890ff", fontSize: "16px" }} />
          </div>
        </Space>
      ),
    },
  ];

  return (
    <>
      <PageBreadcrumb pageTitle="Policy Management" />

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Policy Management</h2>
        <Button
          type="primary"
          icon={<AddIcon style={{ fontSize: 18 }} />}
          onClick={handleAddNew}
          className="bg-blue-500 flex items-center gap-1"
        >
          Add Policy
        </Button>
      </div>

      <div className="space-y-6 p-4 bg-white shadow rounded-xl">
        <ConfigProvider
          theme={{ components: { Pagination: { colorPrimary: "#3F63C7" } } }}
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500 hidden md:block">
                Showing{" "}
                <span className="text-[#3F63C7] font-semibold">{filtered.length}</span>{" "}
                results
              </p>
              <TextField
                variant="outlined"
                placeholder="Search by customer, policy number..."
                size="small"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-72"
                sx={{
                  borderRadius: 2,
                  "& .MuiOutlinedInput-root": {
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#3F63C7" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#3F63C7" },
                  },
                }}
              />
            </div>

            <div className="border rounded-xl overflow-hidden overflow-x-auto">
              <Table
                columns={columns}
                dataSource={filtered}
                pagination={{
                  pageSize: 10,
                  placement: "bottomRight",
                  showSizeChanger: false,
                }}
                scroll={{ x: "max-content" }}
              />
            </div>
          </div>
        </ConfigProvider>
      </div>

      {/* Inline Modal - no ReusableModal */}
      <Modal
        open={isModalOpen}
        onCancel={handleCloseModal}
        footer={null}
        width={800}
        centered
        title={
          <h3 className="text-lg font-semibold">
            {isNewPolicy ? "Add New Policy" : "Edit Policy"}
          </h3>
        }
      >
        <PolicyForm
          policyId={selectedPolicyId}
          isNewPolicy={isNewPolicy}
          onClose={handleCloseModal}
          afterSubmit={afterSubmit}
          initialData={selectedPolicy}
        />
      </Modal>
    </>
  );
}