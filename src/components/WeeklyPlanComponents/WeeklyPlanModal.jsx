import React from "react";
import { X, Edit, ChevronLeft, ChevronRight, Trash2 } from "lucide-react";

// Styles
const styles = {
  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    width: "95%",
    maxWidth: "1400px",
    maxHeight: "90vh",
    overflowY: "auto",
  },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "1200px" },
  tableHeader: {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#f0f0f0",
    fontWeight: "bold",
  },
  tableCell: { border: "1px solid #ccc", padding: "6px" },
  input: {
    width: "100%",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  select: {
    width: "100%",
    padding: "6px",
    border: "1px solid #ccc",
    borderRadius: "4px",
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
  successButton: {
    padding: "12px 30px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
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
};

const WeeklyPlanModal = ({
  showModal,
  closeModal,
  modalWeekOffset,
  handleModalWeekChange,
  dayWiseData,
  handleDieNoChange,
  handleDayWiseChange,
  addNewRowForDay,
  removeRowFromDay,
  handleSavePlan,
  loading,
  getWeekDates,
  getWeekTitle,
  getWeekStatus,
  pressDropdown,
  customerDropdown,
  gradeDropdown,
  FIELD_LABELS,
  editingRow,
  handleEditClick,
  handleCancelEdit,
  handlePreviewRowChange,
  handlePreviewSave,
  showPreviewTable,
  masterData,
}) => {
  const renderSelectField = (field, value, day, recordIndex) => {
    let options = [];

    switch (field) {
      case "pressId":
        options = pressDropdown.map((press) => ({
          value: press,
          label: press,
        }));
        break;
      case "customer":
        options = customerDropdown.map((customer) => ({
          value: customer,
          label: customer,
        }));
        break;
      case "grade":
        options = gradeDropdown.map((grade) => ({
          value: grade,
          label: grade,
        }));
        break;
      case "section":
        options = masterData.sections.map((section) => ({
          value: section,
          label: section,
        }));
        break;
      case "dieRequired":
        options = [
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ];
        break;
      case "rmStatus":
        options = [
          { value: "Available", label: "Available" },
          { value: "Pending", label: "Pending" },
        ];
        break;
      default:
        return renderInputField(field, value, day, recordIndex);
    }

    return (
      <select
        value={value || ""}
        onChange={(e) =>
          handleDayWiseChange(day, recordIndex, field, e.target.value)
        }
        style={styles.select}
      >
        <option value="">Select {FIELD_LABELS[field]}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  };

  const renderInputField = (field, value, day, recordIndex) => {
    const numberFields = ["qty", "netWt", "prodTonn"];

    return (
      <input
        type={numberFields.includes(field) ? "number" : "text"}
        value={value || ""}
        onChange={(e) =>
          handleDayWiseChange(day, recordIndex, field, e.target.value)
        }
        style={styles.input}
        placeholder={`Enter ${FIELD_LABELS[field]}`}
      />
    );
  };

  const renderWeekNavigation = () => (
    <div style={styles.weekNav}>
      <button
        onClick={() => handleModalWeekChange(modalWeekOffset - 1)}
        style={{ ...styles.button, background: "white" }}
      >
        <ChevronLeft size={16} /> Previous Week
      </button>

      <div
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#333",
          textAlign: "center",
        }}
      >
        <div>{getWeekTitle(modalWeekOffset)}</div>
        <div style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
          {getWeekStatus(modalWeekOffset)}
        </div>
      </div>

      <button
        onClick={() => handleModalWeekChange(modalWeekOffset + 1)}
        style={{ ...styles.button, background: "white" }}
      >
        Next Week <ChevronRight size={16} />
      </button>
    </div>
  );

  const renderPreviewTable = () => (
    <div
      style={{
        overflowX: "auto",
        border: "1px solid #ddd",
        borderRadius: "4px",
        marginTop: "20px",
      }}
    >
      <h4
        style={{
          padding: "10px",
          margin: 0,
          background: "#f8f9fa",
          borderBottom: "1px solid #ccc",
        }}
      >
        Weekly Plan Preview - {getWeekTitle(modalWeekOffset)}
      </h4>
      <table style={styles.table}>
        <thead>
          <tr>
            {[
              "Day",
              "Production Order No.",
              "Press",
              "Customer",
              "Net Wt",
              "Die No",
              "Qty",
              "Prod Tonn",
              "Section",
              "Grade",
              "Die Required",
              "RM Status",
              "Heat Code",
              "Remark",
              "Actions",
            ].map((label) => (
              <th key={label} style={styles.tableHeader}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(dayWiseData).some(
            ([_, records]) => records.length > 0
          ) ? (
            Object.entries(dayWiseData).map(([dayName, records]) =>
              records.map((record, index) => {
                const isEditing =
                  editingRow &&
                  editingRow.dayName === dayName &&
                  editingRow.index === index;
                return (
                  <tr key={`${dayName}-${index}`}>
                    <td style={styles.tableCell}>{dayName}</td>

                    {Object.keys(FIELD_LABELS).map((field) => (
                      <td key={field} style={styles.tableCell}>
                        {isEditing ? (
                          field === "dieNo" ? (
                            <input
                              type="text"
                              value={(record.dieNo || []).join(", ")}
                              onChange={(e) =>
                                handlePreviewRowChange(
                                  "dieNo",
                                  e.target.value.split(",").map((s) => s.trim())
                                )
                              }
                              style={styles.input}
                            />
                          ) : (
                            <input
                              type={
                                ["qty", "netWt", "prodTonn"].includes(field)
                                  ? "number"
                                  : "text"
                              }
                              value={record[field] || ""}
                              onChange={(e) =>
                                handlePreviewRowChange(field, e.target.value)
                              }
                              style={styles.input}
                            />
                          )
                        ) : field === "dieNo" && Array.isArray(record.dieNo) ? (
                          record.dieNo.join(", ")
                        ) : (
                          record[field] || ""
                        )}
                      </td>
                    ))}

                    <td style={styles.tableCell}>
                      {isEditing ? (
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            onClick={handlePreviewSave}
                            style={{
                              ...styles.button,
                              padding: "4px 8px",
                              background: "#28a745",
                              color: "white",
                            }}
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            style={{
                              ...styles.button,
                              padding: "4px 8px",
                              background: "#6c757d",
                              color: "white",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleEditClick(dayName, index)}
                          style={{ ...styles.button, padding: "4px 8px" }}
                        >
                          <Edit size={14} /> Edit
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )
          ) : (
            <tr>
              <td
                colSpan={15}
                style={{
                  padding: "20px",
                  textAlign: "center",
                  color: "#777",
                  fontStyle: "italic",
                }}
              >
                No data available for {getWeekTitle(modalWeekOffset)}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  if (!showModal) return null;

  return (
    <div style={styles.modal}>
      <div style={styles.modalContent}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Enter Weekly Plan</h3>
            <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
              Plan your production schedule
            </p>
          </div>
          <X size={24} style={{ cursor: "pointer" }} onClick={closeModal} />
        </div>

        {renderWeekNavigation()}

        <div style={{ overflowX: "auto", marginBottom: "20px" }}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Day & Date</th>
                {Object.keys(FIELD_LABELS).map((field) => (
                  <th key={field} style={styles.tableHeader}>
                    {FIELD_LABELS[field]}
                  </th>
                ))}
                <th style={styles.tableHeader}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getWeekDates(modalWeekOffset).map(({ dayName, date }) =>
                dayWiseData[dayName]?.map((record, recordIndex) => (
                  <tr key={`${dayName}-${recordIndex}`}>
                    <td
                      style={{
                        ...styles.tableCell,
                        fontWeight: "bold",
                        background: "#fafafa",
                      }}
                    >
                      {dayName} {date}
                      {recordIndex > 0 && (
                        <div style={{ fontSize: "12px", color: "#666" }}>
                          Entry {recordIndex + 1}
                        </div>
                      )}
                    </td>

                    {Object.keys(FIELD_LABELS).map((field) => (
                      <td
                        key={`${dayName}-${recordIndex}-${field}`}
                        style={styles.tableCell}
                      >
                        {field === "dieNo" ? (
                          <input
                            type="text"
                            value={record.dieNo[0] || ""}
                            onChange={(e) =>
                              handleDieNoChange(
                                dayName,
                                recordIndex,
                                e.target.value
                              )
                            }
                            style={styles.input}
                            placeholder="Die No"
                          />
                        ) : field === "section" ? (
                          <input
                            type="text"
                            value={record.section || ""}
                            readOnly
                            style={styles.input}
                            placeholder="Section"
                          />
                        ) : field === "grade" ? (
                          <input
                            type="text"
                            value={record.grade || ""}
                            readOnly
                            style={styles.input}
                            placeholder="Material Grade"
                          />
                        ) : field === "pressId" ? (
                          <select
                            value={record.pressId || ""}
                            onChange={(e) =>
                              handleDayWiseChange(
                                dayName,
                                recordIndex,
                                "pressId",
                                e.target.value
                              )
                            }
                            style={styles.select}
                          >
                            <option value="">Select Press</option>
                            {pressDropdown.map((press, idx) => (
                              <option key={idx} value={press}>
                                {press}
                              </option>
                            ))}
                          </select>
                        ) : field === "customer" ? (
                          <select
                            value={record.customer || ""}
                            onChange={(e) =>
                              handleDayWiseChange(
                                dayName,
                                recordIndex,
                                "customer",
                                e.target.value
                              )
                            }
                            style={styles.select}
                          >
                            <option value="">Select Customer</option>
                            {customerDropdown.map((cust, idx) => (
                              <option key={idx} value={cust}>
                                {cust}
                              </option>
                            ))}
                          </select>
                        ) : [
                            "dieRequired",
                            "rmStatus",
                          ].includes(field) ? (
                          renderSelectField(
                            field,
                            record[field],
                            dayName,
                            recordIndex
                          )
                        ) : (
                          renderInputField(
                            field,
                            record[field],
                            dayName,
                            recordIndex
                          )
                        )}
                      </td>
                    ))}

                    <td style={styles.tableCell}>
                      <div style={{ display: "flex", gap: "4px" }}>
                        {recordIndex === dayWiseData[dayName].length - 1 && (
                          <button
                            onClick={() => addNewRowForDay(dayName)}
                            style={{
                              padding: "4px 8px",
                              background: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              fontSize: "12px",
                            }}
                          >
                            + Add
                          </button>
                        )}
                        {dayWiseData[dayName].length > 1 && (
                          <button
                            onClick={() =>
                              removeRowFromDay(dayName, recordIndex)
                            }
                            style={{
                              padding: "4px 8px",
                              background: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "3px",
                              fontSize: "12px",
                            }}
                          >
                            <Trash2 size={12} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {showPreviewTable && renderPreviewTable()}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <button
            onClick={closeModal}
            style={{ ...styles.button, padding: "12px 24px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSavePlan}
            disabled={loading}
            style={{ ...styles.successButton, opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Saving..." : "Save Plan"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyPlanModal;