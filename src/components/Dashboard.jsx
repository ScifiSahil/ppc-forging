import React, { useState } from "react";
import { BarChart3, Calendar, Target } from "lucide-react";
import "./Dashboard.css";
import MainDashboard from "./MainDashboard";
import WeeklyPlan from "./WeeklyPlan.jsx";
import DieSummary from "./DieSummary";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("weekly");

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <h1 className="dashboard-title">Weekly Plan</h1>
          </div>
          <div className="view-toggle">
            <button
              onClick={() => setActiveView("weekly")}
              className={`toggle-button ${
                activeView === "weekly" ? "active" : ""
              }`}
            >
              <Calendar className="icon-sm inline" /> Weekly Plan
            </button>
          </div>
        </div>

        {activeView === "weekly" && <WeeklyPlan />}
        {activeView === "summary" && <DieSummary />}
      </div>
    </div>
  );
};

export default Dashboard;
