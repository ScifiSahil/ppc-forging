import React, { useState } from "react";

const styles = {
  chatIcon: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    backgroundColor: "#007bff",
    color: "#fff",
    fontSize: "24px",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 9999,
  },
  chatBox: {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "350px",
    maxHeight: "500px",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "10px",
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    fontSize: "13px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    zIndex: 9999,
  },
  chatArea: {
    flex: 1,
    overflowY: "auto",
    marginBottom: "10px",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
  },
  inputBox: {
    flex: 1,
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  sendBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
  },
  messageBot: {
    backgroundColor: "#f1f1f1",
    padding: "6px 10px",
    borderRadius: "6px",
    marginBottom: "6px",
    alignSelf: "flex-start",
  },
  messageUser: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "6px",
    marginBottom: "6px",
    alignSelf: "flex-end",
  },
};

const fieldLabels = {
  plant_code: "Plant Code",
  main_prod_no: "Production Order No",
  main_forge_press: "Press",
  week_prod_date: "Production Date (YYYY-MM-DD)",
  heat_code: "Heat Code",
  shift1_qty: "Shift 1 Quantity",
  shift2_qty: "Shift 2 Quantity",
  shift3_qty: "Shift 3 Quantity",
  dies_req: "Dies Required",
  rm_status: "RM Status",
  week_net_tonn: "Net Tonnage",
  remark: "Remark",
  week_die_no: "Die No",
  customer_name: "Customer",
  week_section: "Section",
  rm_grade: "RM Grade",
};

const SmartWeeklyPlanChatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hi 👋! I'm your Weekly Plan Assistant. What would you like to do?",
    },
    {
      type: "suggestions",
      buttons: [
        { label: "📄 View Weekly Plan", value: "view" },
        { label: "➕ Add Production Order", value: "add" },
        { label: "✏️ Update Order", value: "update" },
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState("idle");
  const [formData, setFormData] = useState({});
  const [currentField, setCurrentField] = useState("");
  const [allData, setAllData] = useState([]);

  const handleSuggestionClick = (value) => {
    setInput(value);
    setTimeout(() => handleSend(), 0);
  };

  const formatWeeklyPlanForChat = (data) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grouped = {};

    data.forEach((item) => {
      const dateObj = new Date(item.week_prod_date);
      const day = dayNames[dateObj.getDay()];
      const dateStr = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
      const label = `${day} (${dateStr})`;

      if (!grouped[label]) {
        grouped[label] = [];
      }

      grouped[label].push({
        prod: item.main_prod_no || "N/A",
        cust: item.customer_name || "N/A",
        press: item.main_forge_press || "N/A",
        qty: [item.shift1_qty, item.shift2_qty, item.shift3_qty].join(", "),
      });
    });

    // Build formatted string
    let message = "";
    for (const [dayLabel, plans] of Object.entries(grouped)) {
      message += `📅 ${dayLabel}\n\n`;
      plans.forEach((p) => {
        message += `🔹 Production Order: ${p.prod}\n`;
        message += `   Customer       : ${p.cust}\n`;
        message += `   Qty (S1,S2,S3) : ${p.qty}\n`;
        message += `   Press          : ${p.press}\n\n`;
      });
    }

    return message.trim();
  };

  const formatPlansByDay = (data) => {
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grouped = {};

    data.forEach((item) => {
      const date = new Date(item.week_prod_date);
      const day = dayNames[date.getDay()];
      const dateLabel = `${day} (${date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      })})`;

      if (!grouped[dateLabel]) {
        grouped[dateLabel] = [];
      }

      grouped[dateLabel].push({
        prod: item.main_prod_no || "N/A",
        cust: item.customer_name || "N/A",
        press: item.main_forge_press || "N/A",
        qty: [item.shift1_qty, item.shift2_qty, item.shift3_qty].join(", "),
      });
    });

    return grouped;
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input.trim();
    setInput("");

    if (step === "idle") {
      if (userInput === "view") {
        try {
          const res = await fetch("http://localhost:8080/http://localhost:8080/internal/weekly_plan");
          const data = await res.json();

          const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
          const grouped = {};

          data.forEach((item) => {
            const dateObj = new Date(item.week_prod_date);
            const day = dayNames[dateObj.getDay()];
            const dateStr = dateObj.toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
            });
            const label = `${day} (${dateStr})`;

            if (!grouped[label]) {
              grouped[label] = [];
            }

            grouped[label].push({
              prod: item.main_prod_no || "N/A",
              cust: item.customer_name || "N/A",
              press: item.main_forge_press || "N/A",
              qty: [item.shift1_qty, item.shift2_qty, item.shift3_qty]
                .map((q) => q ?? 0)
                .join(", "),
            });
          });

          let formatted = "";
          for (const [dayLabel, plans] of Object.entries(grouped)) {
            formatted += `📅 ${dayLabel}\n\n`;
            plans.forEach((p) => {
              formatted += `🔹 Production Order: ${p.prod}\n`;
              formatted += `   Customer       : ${p.cust}\n`;
              formatted += `   Qty (S1,S2,S3) : ${p.qty}\n`;
              formatted += `   Press          : ${p.press}\n\n`;
            });
          }

          setMessages((prev) => [
            ...prev,
            { type: "bot", text: formatted.trim() || "No plans found." },
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: "❌ Failed to fetch data." },
          ]);
        }
      } else if (userInput === "add") {
        setStep("add_plant_code");
        setFormData({});
        setCurrentField("plant_code");
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `Let's add a new order.\nEnter ${fieldLabels["plant_code"]}:`,
          },
        ]);
      } else if (userInput === "update") {
        setStep("update_ask_prod_no");
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Enter the Production Order No. you want to update:",
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "❓ Type or click: `view`, `add`, or `update`.",
          },
        ]);
      }
    } else if (step.startsWith("add_")) {
      const fieldMap = Object.keys(fieldLabels);
      const currentIdx = fieldMap.indexOf(currentField);
      const nextField = fieldMap[currentIdx + 1];
      const updatedForm = { ...formData, [currentField]: userInput };
      setFormData(updatedForm);

      if (!nextField) {
        try {
          const res = await fetch(
            "http://localhost:8080/http://localhost:8080/internal/weekly_plan",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(updatedForm),
            }
          );
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: res.ok ? "✅ Order added!" : "❌ Failed to add order.",
            },
          ]);
        } catch {
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: "❌ Network error." },
          ]);
        }
        setStep("idle");
        setFormData({});
      } else {
        setCurrentField(nextField);
        setStep("add_" + nextField);
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: `Enter ${fieldLabels[nextField]}:` },
        ]);
      }
    } else if (step === "update_ask_prod_no") {
      try {
        const res = await fetch("http://localhost:8080/http://localhost:8080/internal/weekly_plan");
        const data = await res.json();
        setAllData(data);
        const order = data.find((item) => item.main_prod_no === userInput);
        if (!order) {
          setMessages((prev) => [
            ...prev,
            { type: "bot", text: "❌ Order not found. Try again." },
          ]);
        } else {
          setFormData(order);
          setStep("update_field_select");
          const summary = Object.entries(order)
            .slice(0, 6)
            .map(([k, v]) => `${k}: ${v}`)
            .join("\n");
          setMessages((prev) => [
            ...prev,
            {
              type: "bot",
              text: `Order found:\n${summary}\nWhich field would you like to update?`,
            },
          ]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "❌ Error fetching data." },
        ]);
      }
    } else if (step === "update_field_select") {
      if (!formData.hasOwnProperty(userInput)) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "❌ Invalid field. Try again." },
        ]);
      } else {
        setCurrentField(userInput);
        setStep("update_field_value");
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: `Enter new value for ${userInput}:` },
        ]);
      }
    } else if (step === "update_field_value") {
      const patchData = {
        prod_order: formData.main_prod_no,
        [currentField]: userInput,
      };
      try {
        const res = await fetch("http://localhost:8080/http://localhost:8080/internal/weekly_plan", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patchData),
        });
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: res.ok
              ? `✅ ${currentField} updated.`
              : "❌ Failed to update.",
          },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          { type: "bot", text: "❌ Network error." },
        ]);
      }
      setStep("idle");
      setFormData({});
    }
  };

  return (
    <>
      <button style={styles.chatIcon} onClick={() => setOpen(!open)}>
        💬
      </button>
      {open && (
        <div style={styles.chatBox}>
          <div style={styles.chatArea}>
            {messages.map((msg, idx) => {
              if (msg.type === "bot")
                return (
                  <div key={idx} style={styles.messageBot}>
                    {msg.text}
                  </div>
                );
              if (msg.type === "user")
                return (
                  <div key={idx} style={styles.messageUser}>
                    {msg.text}
                  </div>
                );
              if (msg.type === "suggestions") {
                return (
                  <div key={idx} style={styles.messageBot}>
                    {msg.buttons.map((btn, i) => (
                      <button
                        key={i}
                        style={{
                          display: "inline-block",
                          margin: "4px 6px 0 0",
                          padding: "4px 8px",
                          fontSize: "12px",
                          backgroundColor: "#e2e6ea",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleSuggestionClick(btn.value)}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div style={styles.inputRow}>
            <input
              style={styles.inputBox}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type here..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button style={styles.sendBtn} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartWeeklyPlanChatbot;
