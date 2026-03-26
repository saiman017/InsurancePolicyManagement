import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUpIcon, ArrowDownIcon } from "../../icons";
import Badge from "../ui/badge/Badge";
import { fetchPolicySummary, selectPolicySummary } from "../../redux/slice/policy";
import { FaRupeeSign, FaChartLine } from "react-icons/fa";
import { HiOutlineDocumentText } from "react-icons/hi";
import { formatCurrency } from "../../utils/currencyFormatter";

export default function EcommerceMetrics() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPolicySummary());
  }, [dispatch]);

  const summary = useSelector(selectPolicySummary);

  const totalPolicies = summary?.totalPolicies ?? 0;
  const motorCount = summary?.motorCount ?? 0;
  const propertyCount = summary?.propertyCount ?? 0;
  const travelCount = summary?.travelCount ?? 0;
  const totalSumInsured = summary?.totalSumInsured ?? 0;
  const highValuePolicies = summary?.highValuePolicies ?? 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {/* Total Policies Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-xl dark:bg-blue-900/30">
          <HiOutlineDocumentText className="text-blue-600 size-6 dark:text-blue-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Policies</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{totalPolicies.toLocaleString()}</h4>
            <div className="mt-1 text-xs text-gray-500">Total Number of Policies</div>
          </div>
        </div>
      </div>

      {/* Total Sum Insured Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-xl dark:bg-green-900/30">
          <span className="text-green-600 text-2xl font-bold dark:text-green-400">रू</span>
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Total Sum Insured</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{formatCurrency(totalSumInsured)}</h4>
            <div className="mt-1 text-xs text-gray-500">Total amount</div>
          </div>
        </div>
      </div>

      {/* High Value Policies Card */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-xl dark:bg-red-900/30">
          <FaChartLine className="text-red-600 size-6 dark:text-red-400" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">High Value Policies</span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">{highValuePolicies.toLocaleString()}</h4>
            <div className="mt-1 text-xs text-gray-500">Policies &gt; NPR 2 Crore</div>
          </div>
        </div>
      </div>

    </div>
  );
}
