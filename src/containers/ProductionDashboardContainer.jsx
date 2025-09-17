import React from "react";
// import ProductionDashboard from "../components/ProductionDashboard/ProductionDashboard";
// import { SinglePage, PageFrame } from "cs-web-components-base";
import Dashboardd from "../components/Forging_Capacity_Management/Dashboardd";

// ✅ Exporting a default React component
const ProductionDashboardContainer = () => {
  // return <ProductionDashboard />;

//   return (
//     <SinglePage
//       frameComponent={PageFrame.ApplicationFrame}
//       pageContent={ProductionDashboard}
//     />
//   );

return (
    <Dashboardd/>
)
};

export default ProductionDashboardContainer;
