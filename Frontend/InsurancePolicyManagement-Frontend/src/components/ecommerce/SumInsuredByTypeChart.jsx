import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSumInsuredByType, selectSumInsuredByType } from "../../redux/slice/policy";
import { formatCurrency, formatNepaliNumber } from "../../utils/currencyFormatter";

export default function SumInsuredByTypeChart() {
  const dispatch = useDispatch();
  const sumInsuredByType = useSelector(selectSumInsuredByType);

  useEffect(() => {
    dispatch(fetchSumInsuredByType());
  }, [dispatch]);

  const totalSumInsured = sumInsuredByType?.reduce((sum, item) => sum + item.totalSumInsured, 0) || 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
          Total Sum Insured by Type
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Total: {formatCurrency(totalSumInsured)}
        </p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart
          data={sumInsuredByType}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
          barSize={50}
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
            tickFormatter={(value) => formatCurrency(value)}
            axisLine={false}
            tickLine={false}
            width={70}
          />
          <Tooltip 
            formatter={(value) => [formatNepaliNumber(value), 'Sum Insured']}
            contentStyle={{ fontSize: '12px', padding: '8px' }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
            iconSize={10}
          />
          <Bar 
            dataKey="totalSumInsured" 
            fill="#10B981" 
            name="Sum Insured"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}