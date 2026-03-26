import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchPolicyCountByType, selectPolicyCountByType } from "../../redux/slice/policy";

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function PolicyCountPieChart() {
  const dispatch = useDispatch();
  const countByType = useSelector(selectPolicyCountByType);

  useEffect(() => {
    dispatch(fetchPolicyCountByType());
  }, [dispatch]);

  const totalPolicies = countByType?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Policy Count by Type
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Total Policies: {totalPolicies}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={countByType}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="count"
            nameKey="type"
          >
            {countByType?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} Policies`, 'Count']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}