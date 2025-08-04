import React, { useState } from "react";
import { TrendingUp, MessageCircle } from "lucide-react";
import "./MainDashboard.css";

// KPI Section Data
const kpiData = [
  { title: "Total Plan Qty", value: "12,000", change: "+8%", icon: "📊" },
  { title: "Total Actual Qty", value: "10,450", change: "+12%", icon: "✅" },
  { title: "Avg Utilization", value: "85%", change: "+5%", icon: "⚡" },
  { title: "Die in Use", value: "18", change: "+2", icon: "🔧" },
];

// Press-Wise Summary Data (Single Example Kept for Cleanliness)
const pressSummary = [
  {
    press: "630T",
    plan: 220000,
    produced: 44631,
    avgPerDay: 7439,
    balance: 175369,
    reqPerDay: 8768,
    netTon: 1.81,
    cumTon: 16.87,
    shifts: [
      { shift: 1, dieNo: 701, qty: 2180 },
      { shift: 2, dieNo: 701, qty: 2378 },
      { shift: 3, dieNo: 701, qty: 1683 },
    ],
  },
   {
    press: "630T",
    plan: 220000,
    produced: 44631,
    avgPerDay: 7439,
    balance: 175369,
    reqPerDay: 8768,
    netTon: 1.81,
    cumTon: 16.87,
    shifts: [
      { shift: 1, dieNo: 701, qty: 2180 },
      { shift: 2, dieNo: 701, qty: 2378 },
      { shift: 3, dieNo: 701, qty: 1683 },
    ],
  },
   {
    press: "630T",
    plan: 220000,
    produced: 44631,
    avgPerDay: 7439,
    balance: 175369,
    reqPerDay: 8768,
    netTon: 1.81,
    cumTon: 16.87,
    shifts: [
      { shift: 1, dieNo: 701, qty: 2180 },
      { shift: 2, dieNo: 701, qty: 2378 },
      { shift: 3, dieNo: 701, qty: 1683 },
    ],
  },
   {
    press: "630T",
    plan: 220000,
    produced: 44631,
    avgPerDay: 7439,
    balance: 175369,
    reqPerDay: 8768,
    netTon: 1.81,
    cumTon: 16.87,
    shifts: [
      { shift: 1, dieNo: 701, qty: 2180 },
      { shift: 2, dieNo: 701, qty: 2378 },
      { shift: 3, dieNo: 701, qty: 1683 },
    ],
  },
   {
    press: "630T",
    plan: 220000,
    produced: 44631,
    avgPerDay: 7439,
    balance: 175369,
    reqPerDay: 8768,
    netTon: 1.81,
    cumTon: 16.87,
    shifts: [
      { shift: 1, dieNo: 701, qty: 2180 },
      { shift: 2, dieNo: 701, qty: 2378 },
      { shift: 3, dieNo: 701, qty: 1683 },
    ],
  },
   {
    press: "630T",
    plan: 220000,
    produced: 44631,
    avgPerDay: 7439,
    balance: 175369,
    reqPerDay: 8768,
    netTon: 1.81,
    cumTon: 16.87,
    shifts: [
      { shift: 1, dieNo: 701, qty: 2180 },
      { shift: 2, dieNo: 701, qty: 2378 },
      { shift: 3, dieNo: 701, qty: 1683 },
    ],
  },
];

// KPI Card Component
const KPICard = ({ title, value, change, icon }) => (
  <div className="kpi-card">
    <div className="kpi-card-content">
      <div className="kpi-left">
        <p className="kpi-title">{title}</p>
        <p className="kpi-value">{value}</p>
        <p className="kpi-change">
          <TrendingUp size={14} /> {change}
        </p>
      </div>
      <div className="kpi-right">{icon}</div>
    </div>
    <div className="kpi-progress-track">
      <div className="kpi-progress" style={{ width: "75%" }}></div>
    </div>
  </div>
);

// ChatBot Component with Suggestions
const ChatBot = ({ open, onClose }) => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! Ask me about KPI or Press Summary." },
  ]);
  const [input, setInput] = useState("");

  const suggestions = [
    "Total Plan Qty",
    "Total Actual Qty",
    "Avg Utilization",
    "Die in Use",
    "630T",
  ];

  const handleSend = (message = input) => {
    if (!message.trim()) return;
    const userMessage = message.trim();
    setMessages((prev) => [...prev, { from: "user", text: userMessage }]);
    const botReply = generateBotReply(userMessage);
    setMessages((prev) => [...prev, { from: "bot", text: botReply }]);
    setInput("");
  };

  const generateBotReply = (message) => {
    const lower = message.toLowerCase();
    for (const kpi of kpiData) {
      if (lower.includes(kpi.title.toLowerCase())) {
        return `${kpi.title}: ${kpi.value}, Change: ${kpi.change}`;
      }
    }
    for (const press of pressSummary) {
      if (lower.includes(press.press.toLowerCase())) {
        const totalQty = press.shifts.reduce((acc, s) => acc + s.qty, 0);
        return `For ${press.press}: Plan ${press.plan}, Produced ${press.produced}, Balance ${press.balance}, Total Shift Qty ${totalQty}`;
      }
    }
    return "Sorry, I can only answer about KPIs or specific presses like 630T, 1000T-1, etc.";
  };

  if (!open) return null;

  return (
    <div className="chatbot-window">
      <div className="chatbot-header">
        ChatBot <button onClick={onClose}>X</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.from}`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbot-suggestions">
        {suggestions.map((s, idx) => (
          <button key={idx} onClick={() => handleSend(s)}>
            {s}
          </button>
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about KPI or Press Summary..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={() => handleSend()}>Send</button>
      </div>
    </div>
  );
};

// Main Dashboard Component
const MainDashboard = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <div className="kpi-grid">
        {kpiData.map((kpi, i) => (
          <KPICard key={i} {...kpi} />
        ))}
      </div>

      <div className="press-summary-grid">
        {pressSummary.map((press, idx) => {
          const totalQty = press.shifts.reduce((acc, s) => acc + s.qty, 0);
          return (
            <div key={idx} className="press-card">
              <div className="press-header">
                <h3 className="press-title">{press.press}</h3>
              </div>
              <div className="press-info">
                <div><strong>Plan:</strong> {press.plan.toLocaleString()}</div>
                <div><strong>Produced:</strong> <span className="highlight">{press.produced.toLocaleString()}</span></div>
                <div><strong>Avg/Day:</strong> {press.avgPerDay}</div>
                <div><strong>Balance:</strong> {press.balance.toLocaleString()}</div>
                <div><strong>Req/Day:</strong> {press.reqPerDay}</div>
                <div><strong>Net Tonn:</strong> {press.netTon} T</div>
                <div><strong>Cum Tonn:</strong> {press.cumTon} T</div>
              </div>

              <table className="shift-table">
                <thead>
                  <tr>
                    <th>Shift</th>
                    <th>Die No</th>
                    <th>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {press.shifts.map((s, i) => (
                    <tr key={i}>
                      <td>{s.shift}</td>
                      <td>{s.dieNo}</td>
                      <td>{s.qty}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td colSpan="2"><strong>Total</strong></td>
                    <td><strong>{totalQty}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>

      <button className="chatbot-toggle-btn" onClick={() => setChatOpen(!chatOpen)}>
        <MessageCircle size={24} />
      </button>

      <ChatBot open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default MainDashboard;
