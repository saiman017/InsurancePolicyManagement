import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchPolicyCountByType, selectPolicyCountByType } from "../../redux/slice/policy";

export default function PolicyCountBarChart() {
  const dispatch = useDispatch();
  const countByType = useSelector(selectPolicyCountByType);

  useEffect(() => {
    dispatch(fetchPolicyCountByType());
  }, [dispatch]);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Policy Count by Type
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Bar Chart View
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={countByType}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
          barSize={40}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="type" 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value) => [`${value} Policies`, 'Count']}
            contentStyle={{ fontSize: '12px', padding: '8px' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            iconSize={10}
          />
          <Bar 
            dataKey="count" 
            fill="#3B82F6" 
            name="Policy Count"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}