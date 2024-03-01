import { format } from "date-fns";

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

export const createDateFormat = (date) => format(date, "dd-MM-yyyy");
