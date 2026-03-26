import React from "react";
import PageMeta from "../../components/common/PageMeta";
import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import PolicyCountPieChart from "../../components/ecommerce/PolicyCountPieChart";
import PolicyCountBarChart from "../../components/ecommerce/PolicyCountBarChart";
import SumInsuredByTypeChart from "../../components/ecommerce/SumInsuredByTypeChart";

export default function Home() {
  return (
    <>
      <PageMeta title="Insurance Policy Management" description="Insurance Policy Management Dashboard" />

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <EcommerceMetrics />
        </div>
        
        <div className="col-span-12 lg:col-span-6">
          <PolicyCountPieChart />
        </div>
        <div className="col-span-12 lg:col-span-6">
          <PolicyCountBarChart />
        </div>

        <div className="col-span-12">
          <SumInsuredByTypeChart />
        </div>
      </div>
    </>
  );
}