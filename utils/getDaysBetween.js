const moment = require('moment');
function getDaysBetween(start, end) {
  
  const daysBetween = [];
  let currentDate = moment(start)

  while (currentDate.isSameOrBefore(end)) {
    daysBetween.push(currentDate.clone());
    currentDate.add(1, 'day');
  }

  return daysBetween.map(day => day.format('YYYY-MM-DD'));
}

export default getDaysBetween
