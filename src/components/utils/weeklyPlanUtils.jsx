// utils/weeklyPlanUtils.js
export const DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const getWeekDates = (offset = 0) => {
  const dates = [];
  const today = new Date();
  const currentMonday = new Date(today);
  const dayOfWeek = today.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  currentMonday.setDate(today.getDate() + daysToMonday + offset * 7);

  for (let i = 0; i < 6; i++) {
    const date = new Date(currentMonday);
    date.setDate(currentMonday.getDate() + i);
    dates.push({
      dayName: DAY_NAMES[i],
      date: date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      fullDate: date,
      key: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`,
    });
  }
  return dates;
};

export const getWeekTitle = (offset, weekDates) => {
  const start = weekDates[0].fullDate;
  const end = weekDates[5].fullDate;
  return `${start.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  })} - ${end.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}`;
};

export const getWeekStatus = (offset) => {
  if (offset === 0) return "Current Week";
  if (offset === 1) return "Next Week";
  return offset > 1 ? `${offset} Weeks Ahead` : `${Math.abs(offset)} Weeks Ago`;
};

export const createEmptyRecord = (dayName, date, modalWeekOffset) => ({
  id: `temp_${Date.now()}_${Math.random()}`,
  pressId: "",
  customer: "",
  netWt: "",
  dieNo: [""],
  qty: { shift1: "", shift2: "", shift3: "" },
  prodTonn: "",
  section: "",
  plantCode: "",
  grade: "",
  dieRequired: "",
  rmStatus: "",
  heatCode: "",
  remark: "",
  day: dayName,
  date: date,
  weekOffset: modalWeekOffset,
  isNew: true,
});
