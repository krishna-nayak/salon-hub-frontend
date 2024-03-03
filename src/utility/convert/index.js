import { format } from "date-fns";

const getTimeSlot = (hours) => {
  if (hours >= 0 && hours < 12) {
    return 0;
  } else if (hours >= 12 && hours < 17) {
    return 1;
  } else {
    return 2;
  }
};

export const capitalizeAllWords = (str) => {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
};

export const createDateFromTime = (timeString) => {
  const date = new Date();
  const [hours, minutes] = timeString.split(":").map(Number);
  let newHours = hours;
  let newMinutes = minutes;

  if (minutes > 30) {
    newMinutes = 0;
    newHours += 1;
  } else if (minutes > 0) {
    newMinutes = 30;
  }
  const newDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    newHours,
    newMinutes
  );

  return newDate;
};

export const createDateFromTimeAmPm = (timeString) => {
  const [hoursStr, minutesStr, ampm] = timeString.split(/:| /);
  let hours = parseInt(hoursStr);
  let minutes = parseInt(minutesStr);

  if (minutes > 0 && minutes <= 30) {
    minutes = 30;
  } else if (minutes > 30) {
    minutes = 0;
    hours++;
  }

  // console.log(ampm);

  if (hours === 12 && ampm.toLowerCase() === "am") {
    hours = 0;
  } else if (ampm.toLowerCase() === "pm" && hours < 12) {
    hours += 12;
  }

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  const timeSlot = getTimeSlot(hours);

  return { date, timeSlot };
};

export const createDateFormat = (date) => format(date, "dd-MM-yyyy");
