import React, { useState } from "react";
import "./Dashboard.css";
// import MainDashboard from "./MainDashboard";
import WeeklyPlan from "./WeeklyPlan.jsx";
// import DieSummary from "./DieSummary";
import ProductionDashboard from "./ProductionDashboard/ProductionDashboard.jsx";
import ScheduleSummary from "./schedule_summary/schedule_summary.jsx";
import InventoryDashboard from "./ProductionDashboard/InventoryDashboard.jsx";
// import Dashboardd from "./Forging_Capacity_Management/Dashboardd.jsx";
import Diestatus from "./Diestatus.jsx";
import AdminPanel from "./AdminPanel.jsx";
import { X } from "lucide-react";
import SimpleActivityLog from "./SimpleActivityLog.jsx"; // ✅ ADD THIS

const Dashboard = () => {
  const [activeView, setActiveView] = useState("weekly");
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const ADMIN_PASSWORD = "admin123";

  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setActiveView("admin_panel");
    } else {
      setShowPasswordModal(true);
      setPassword("");
      setPasswordError("");
    }
  };

  const handlePasswordSubmit = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setActiveView("admin_panel");
      setShowPasswordModal(false);
      setPassword("");
      setPasswordError("");
    } else {
      setPasswordError("Incorrect password. Please try again.");
      setPassword("");
    }
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPassword("");
    setPasswordError("");
  };

  // Add this function to handle logout from admin panel
  const handleLogoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setActiveView("weekly");
  };

  // 🎨 Add these inline styles
  const containerStyle = {
    minHeight: "100vh",
    padding: "1.5rem",
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  };

  const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "2rem",
    flexWrap: "wrap",
    gap: "1rem",
  };

  const titleContainerStyle = {};

  const toggleButtonStyle = (isActive) => ({
    padding: "0.75rem 1.5rem",
    fontWeight: "600",
    borderRadius: "50px",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    background: isActive ? "rgba(255, 255, 255, 0.9)" : "transparent",
    color: isActive ? "#667eea" : "#000000",
    boxShadow: isActive ? "0 4px 15px rgba(0, 0, 0, 0.1)" : "none",
  });

  // Password Modal Styles
  const modalOverlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(5px)",
  };

  const modalStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "15px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    minWidth: "400px",
    maxWidth: "90vw",
    textAlign: "center",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    margin: "10px 0",
    border: "2px solid #e1e5e9",
    borderRadius: "8px",
    fontSize: "16px",
    outline: "none",
    transition: "border-color 0.3s ease",
  };

  const buttonStyle = {
    padding: "12px 24px",
    margin: "0 8px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#667eea",
    color: "white",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f3f4f6",
    color: "#374151",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <div style={titleContainerStyle}></div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(20px)",
            padding: "0.5rem",
            borderRadius: "50px",
          }}
        >
          {/* <button
            onClick={() => setActiveView("activity_log")}
            style={toggleButtonStyle(activeView === "activity_log")}
          >
            Activity Log
          </button> */}
          <button
            onClick={() => setActiveView("weekly")}
            style={toggleButtonStyle(activeView === "weekly")}
          >
            Weekly Plan
          </button>
          <button
            onClick={() => setActiveView("summary")}
            style={toggleButtonStyle(activeView === "summary")}
          >
            Asking Rate
          </button>
          <button
            onClick={() => setActiveView("schedule_summary")}
            style={toggleButtonStyle(activeView === "schedule_summary")}
          >
            Schedule Summary
          </button>
          <button
            onClick={() => setActiveView("Inventory_Dashboard")}
            style={toggleButtonStyle(activeView === "Inventory_Dashboard")}
          >
            WIP & RM
          </button>
          {/* <button
            onClick={() => setActiveView("Forging_Management")}
            style={toggleButtonStyle(activeView === "Forging_Management")}
          >
            Forging_Management
          </button> */}
          <button
            onClick={() => setActiveView("die_status")}
            style={toggleButtonStyle(activeView === "die_status")}
          >
            Die Status
          </button>

          {/* 👇 New Admin Panel Button */}
          <button
            onClick={handleAdminClick}
            style={{
              ...toggleButtonStyle(activeView === "admin_panel"),
              position: "relative",
            }}
          >
            Admin Panel
            {isAdminAuthenticated && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#10b981",
                  color: "white",
                  borderRadius: "50%",
                  width: "12px",
                  height: "12px",
                  fontSize: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✓
              </span>
            )}
          </button>

          {/* Logout button when admin is authenticated */}
          {isAdminAuthenticated && (
            <button
              onClick={handleLogoutAdmin}
              style={{
                ...toggleButtonStyle(false),
                backgroundColor: "#ef4444",
                color: "white",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Password Modal */}
      {showPasswordModal && (
        <div style={modalOverlayStyle}>
          <div style={modalStyle}>
            <h2 style={{ marginBottom: "1rem", color: "#374151" }}>
              Admin Access Required
            </h2>
            <p style={{ marginBottom: "1.5rem", color: "#6b7280" }}>
              Please enter the admin password to access the Admin Panel
            </p>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handlePasswordKeyPress}
              style={{
                ...inputStyle,
                borderColor: passwordError ? "#ef4444" : "#e1e5e9",
              }}
              autoFocus
            />

            {passwordError && (
              <p
                style={{ color: "#ef4444", fontSize: "14px", margin: "5px 0" }}
              >
                {passwordError}
              </p>
            )}

            <div style={{ marginTop: "1.5rem" }}>
              <button
                onClick={handlePasswordSubmit}
                style={primaryButtonStyle}
                disabled={!password.trim()}
              >
                Access Admin Panel
              </button>
              <button onClick={closePasswordModal} style={secondaryButtonStyle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Component Views */}
      {activeView === "activity_log" && <SimpleActivityLog />}
      {activeView === "weekly" && <WeeklyPlan />}
      {activeView === "summary" && <ProductionDashboard />}
      {activeView === "schedule_summary" && <ScheduleSummary />}
      {activeView === "Inventory_Dashboard" && <InventoryDashboard />}
      {/* {activeView === "Forging_Management" && <Dashboardd />} */}
      {activeView === "die_status" && <Diestatus />}
      {activeView === "admin_panel" && isAdminAuthenticated && <AdminPanel />}
    </div>
  );
};

export default Dashboard;
