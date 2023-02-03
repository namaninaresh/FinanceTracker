import {View} from 'react-native';

export function separator() {
  return <View></View>;
}
export function MoneyFormat(x) {
  var number = Number(x);
  return number.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'INR',
  });
}

export function dateFormatters(timestamp) {
  //const timestamp = "2023-01-26T13:34:08.649Z";
  const date = new Date(timestamp);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const day = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dateNumber = date.getUTCDate();
  let suffix = 'th';
  if (dateNumber === 1 || dateNumber === 21 || dateNumber === 31) {
    suffix = 'st';
  } else if (dateNumber === 2 || dateNumber === 22) {
    suffix = 'nd';
  } else if (dateNumber === 3 || dateNumber === 23) {
    suffix = 'rd';
  }
  const hour = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const year = date.getUTCFullYear();
  let hour12 = hour;
  let ampm = 'AM';
  if (hour12 >= 12) {
    hour12 = hour12 % 12;
    ampm = 'PM';
  }
  if (hour12 === 0) {
    hour12 = 12;
  }
  const formattedDate = `${day} ${dateNumber}${suffix} ${month} ${year} ${hour12}:${minutes} ${ampm}`;
  return formattedDate;
}

export const dateFormatter = currentDate => {
  let tempDate = new Date(currentDate);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  let date = tempDate.getDate();
  let m = tempDate.getMonth() + 1;

  if (date < 10) date = '0' + date;
  //if (m < 10) m = '0' + m;

  //let dateF =  `${days[tempDate.getUTCDay()]} ${date} ${months[m]} ${tempDate.getFullYear()} `

  let fDate = date + '/' + m + '/' + tempDate.getFullYear();

  //dateTimeText.date = fDate;

  let hr = tempDate.getHours();
  let min = tempDate.getMinutes();
  if (min < 10) min = '0' + min;
  let ampm = 'am';
  if (hr > 12) {
    hr -= 12;
    ampm = 'pm';
  }
  if (hr < 10) hr = '0' + hr;
  let fTime = hr + ':' + min + ' ' + ampm;
  //dateTimeText = fTime;
  let dateF = `${days[tempDate.getUTCDay()]} ${date} ${
    months[m - 1]
  } ${tempDate.getFullYear()}  ${fTime}`;
  return dateF;
  //return [fDate, fTime];
};

export function getLastWorkingDay() {
  // Get the current date
  var currentDate = new Date();

  // Get the last day of the last month
  var lastMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    0,
  );

  console.log('lastmont', currentDate, lastMonth);
  // Get the day of the week for the last day of the last month (0 - Sunday, 1 - Monday, etc.)
  var lastDayOfWeek = lastMonth.getDay();

  // Check if the last day of the last month is a working day (not a weekend)
  if (lastDayOfWeek === 0 || lastDayOfWeek === 6) {
    // If it's a weekend, subtract one day and check again
    lastMonth.setDate(lastMonth.getDate() - 1);
    lastDayOfWeek = lastMonth.getDay();

    if (lastDayOfWeek === 0 || lastDayOfWeek === 6) {
      // If it's still a weekend, subtract one more day
      lastMonth.setDate(lastMonth.getDate() - 1);
    }
  }

  // Format the last working day of the last month for display
  var lastWorkingDay = lastMonth.toLocaleDateString();
  console.log('Last working day of last month: ' + lastWorkingDay);

  var lastWorkingDayTimestamp = lastMonth.getTime() / 1000;
  return lastWorkingDayTimestamp;
  /*var currentDate = new Date();

  var lastMonth = currentDate.getMonth() - 1;

  if (lastMonth < 0) {
    lastMonth = 11;
    currentDate.setFullYear(currentDate.getFullYear() - 1);
  }

  var lastDayOfLastMonth = new Date(
    currentDate.getFullYear(),
    lastMonth + 1,
    0,
  );
  var lastDayOfLastMonthWeekday = lastDayOfLastMonth.getUTCDay();

  while (lastDayOfLastMonthWeekday === 0 || lastDayOfLastMonthWeekday === 6) {
    lastDayOfLastMonth.setDate(lastDayOfLastMonth.getDate() - 1);
    lastDayOfLastMonthWeekday = lastDayOfLastMonth.getUTCDay();
  }

  return lastDayOfLastMonth; */
}

export const generateUniqueId = title => {
  const timestamp = new Date().getTime().toString();
  return `${title}-${timestamp}`;
};
