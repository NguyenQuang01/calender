const moment = require("moment");
function getDaysBetween(start, end) {
  const daysBetween = [];
  let currentDate = moment(start);

  while (currentDate.isSameOrBefore(end)) {
    daysBetween.push(currentDate.clone());
    currentDate.add(1, "day");
  }

  return daysBetween.map((day) => day.format("YYYY-MM-DD"));
}

export default getDaysBetween;

const today = () => {
  const day = new Date().getDate().toString().padStart(2, "0");
  const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
  const year = new Date().getFullYear();
  return `${year}/${month}/${day}`;
};

export { today };
