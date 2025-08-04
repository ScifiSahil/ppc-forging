import React, { useState, useEffect } from "react";
import { Filter, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { useWeeklyPlanData } from "./useWeeklyPlanData";
import { apiService } from "./apiService";
import WeeklyPlanModal from "./WeeklyPlanModal"

// Constants
const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Styles
const styles = {
  container: { padding: "20px", fontFamily: "Arial, sans-serif" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  button: {
    padding: "8px 16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    background: "#f5f5f5",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  primaryButton: {
    padding: "8px 16px",
    border: "1px solid #007bff",
    borderRadius: "4px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
  weekNav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px",
    padding: "10px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
  },
  table: { 
    width: "100%", 
    borderCollapse: "collapse", 
    minWidth: "1200px" 
  },
  tableHeader: {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: { 
    border: "1px solid #ccc", 
    padding: "6px" 
  },
  loading: { 
    textAlign: "center", 
    padding: "20px", 
    color: "#666" 
  },
};

const WeeklyPlan = () => {
  // State Management
  const [weekOffset, setWeekOffset] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showPreviewTable, setShowPreviewTable] = useState(false);
  const [loading, setLoading] = useState(false);

  // Use custom hook for weekly plan data
  const {
    modalWeekOffset,
    setModalWeekOffset,
    plans,
    dayWiseData,
    setDayWiseData,
    masterData,
    pressDropdown,
    customerDropdown,
    gradeDropdown,
    editingRow,
    setEditingRow,
    loadWeeklyPlans,
    loadMasterData,
    handleDieNoChange,
    handleDayWiseChange,
    addNewRowForDay,
    removeRowFromDay,
    handleEditClick,
    handleCancelEdit,
    handlePreviewRowChange,
    handlePreviewSave,
    initializeDayWiseData,
    getWeekDates,
    getWeekTitle,
    getWeekStatus,
    createEmptyRecord,
  } = useWeeklyPlanData();

  // Event Handlers
  const handleWeekChange = (newOffset) => {
    setWeekOffset(newOffset);
    loadWeeklyPlans(newOffset);
  };

  const handleSavePlan = async () => {
    setLoading(true);
    try {
      const planData = {
        weekOffset: modalWeekOffset,
        weekDates: getWeekDates(modalWeekOffset),
        plans: dayWiseData,
      };

      const response = await apiService.saveWeeklyPlan(planData);
      if (response.success) {
        alert("Plan saved successfully!");
        setShowModal(false);
        loadWeeklyPlans(weekOffset); // Refresh current view
      }
    } catch (error) {
      console.error("Error saving plan:", error);
      alert("Error saving plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openModal = () => {
    setModalWeekOffset(weekOffset);
    setShowModal(true);
    setShowPreviewTable(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowPreviewTable(false);
    setModalWeekOffset(weekOffset);
  };

  // Effects
  useEffect(() => {
    loadMasterData();
    loadWeeklyPlans(weekOffset);
  }, []);

  useEffect(() => {
    if (showModal) {
      setDayWiseData(initializeDayWiseData(modalWeekOffset));
    }
  }, [modalWeekOffset, showModal]);

  // Render Functions
  const renderWeekNavigation = (offset, setOffset) => (
    <div style={styles.weekNav}>
      <button
        onClick={() => setOffset(offset - 1)}
        style={{ ...styles.button, background: "white" }}
      >
        <ChevronLeft size={16} /> Previous Week
      </button>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        <div>{getWeekTitle(offset)}</div>
        <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
          {getWeekStatus(offset)}
        </div>
      </div>

      <button
        onClick={() => setOffset(offset + 1)}
        style={{ ...styles.button, background: "white" }}
      >
        Next Week <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderCurrentWeekView = () => {
    const currentWeekData = plans[weekOffset] || {};
    
    return (
      <div style={{ overflowX: "auto", border: "1px solid #ddd", borderRadius: "4px" }}>
        <h4 style={{ 
          padding: "10px", 
          margin: 0, 
          background: "#f8f9fa", 
          borderBottom: "1px solid #ccc" 
        }}>
          Current Week Plan - {getWeekTitle(weekOffset)}
        </h4>
        
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.tableHeader}>Day</th>
              <th style={styles.tableHeader}>Press</th>
              <th style={styles.tableHeader}>Customer</th>
              <th style={styles.tableHeader}>Die No</th>
              <th style={styles.tableHeader}>Quantity</th>
              <th style={styles.tableHeader}>Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(currentWeekData).length > 0 ? (
              Object.entries(currentWeekData).map(([dayName, records]) =>
                records.map((record, index) => (
                  <tr key={`${dayName}-${index}`}>
                    <td style={styles.tableCell}>{dayName}</td>
                    <td style={styles.tableCell}>{record.pressId}</td>
                    <td style={styles.tableCell}>{record.customer}</td>
                    <td style={styles.tableCell}>
                      {Array.isArray(record.dieNo) ? record.dieNo.join(", ") : record.dieNo}
                    </td>
                    <td style={styles.tableCell}>{record.qty}</td>
                    <td style={styles.tableCell}>
                      <span style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        backgroundColor: record.rmStatus === 'Available' ? '#d4edda' : '#f8d7da',
                        color: record.rmStatus === 'Available' ? '#155724' : '#721c24',
                        fontSize: "12px"
                      }}>
                        {record.rmStatus || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={6} style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#777",
                  fontStyle: "italic",
                }}>
                  No plans available for {getWeekTitle(weekOffset)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading && !showModal) {
    return <div style={styles.loading}>Loading...</div>;
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0, color: "#333" }}>Weekly Plan View</h2>
          <p style={{ margin: "5px 0", color: "#666" }}>
            Press-wise execution details
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={styles.button}>
            <Filter size={16} /> Filter
          </button>
          <button onClick={openModal} style={styles.primaryButton}>
            <Plus size={16} /> Enter Plan
          </button>
        </div>
      </div>

      {/* Main Week Navigation */}
      {renderWeekNavigation(weekOffset, handleWeekChange)}

      {/* Current Week View */}
      {renderCurrentWeekView()}

      {/* Weekly Plan Modal */}
      <WeeklyPlanModal
        showModal={showModal}
        closeModal={closeModal}
        modalWeekOffset={modalWeekOffset}
        setModalWeekOffset={setModalWeekOffset}
        dayWiseData={dayWiseData}
        setDayWiseData={setDayWiseData}
        handleDieNoChange={handleDieNoChange}
        handleDayWiseChange={handleDayWiseChange}
        addNewRowForDay={addNewRowForDay}
        removeRowFromDay={removeRowFromDay}
        handleSavePlan={handleSavePlan}
        loading={loading}
        pressDropdown={pressDropdown}
        customerDropdown={customerDropdown}
        gradeDropdown={gradeDropdown}
        masterData={masterData}
        getWeekDates={getWeekDates}
        getWeekTitle={getWeekTitle}
        getWeekStatus={getWeekStatus}
        editingRow={editingRow}
        setEditingRow={setEditingRow}
        handleEditClick={handleEditClick}
        handleCancelEdit={handleCancelEdit}
        handlePreviewRowChange={handlePreviewRowChange}
        handlePreviewSave={handlePreviewSave}
        DAY_NAMES={DAY_NAMES}
      />
    </div>
  );
};

export default WeeklyPlan;