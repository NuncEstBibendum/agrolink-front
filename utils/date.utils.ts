export const getTimeBetweenDateAndNow = (date: Date) => {
  // Current time
  const now = new Date();

  // Difference in milliseconds
  const differenceInMilliseconds = now.getTime() - date.getTime();

  // Converting difference into various units
  const differenceInSeconds = differenceInMilliseconds / 1000;
  const differenceInMinutes = differenceInSeconds / 60;
  const differenceInHours = differenceInMinutes / 60;
  const differenceInDays = differenceInHours / 24;
  const differenceInWeeks = differenceInDays / 7;
  const differenceInMonths = differenceInDays / 30.44; // Average number of days in a month (365.25/12)
  const differenceInYears = differenceInDays / 365.25; // Considering leap year

  // Determining the largest unit for the time difference
  if (Math.abs(differenceInYears) >= 1) {
    return `${Math.round(differenceInYears)}a`;
  } else if (Math.abs(differenceInMonths) >= 1) {
    return `${Math.round(differenceInMonths)}mois`;
  } else if (Math.abs(differenceInWeeks) >= 1) {
    return `${Math.round(differenceInWeeks)}semaine(s)`;
  } else if (Math.abs(differenceInDays) >= 1) {
    return `${Math.round(differenceInDays)}j`;
  } else if (Math.abs(differenceInHours) >= 1) {
    return `${Math.round(differenceInHours)}h`;
  } else if (Math.abs(differenceInMinutes) >= 1) {
    return `${Math.round(differenceInMinutes)}mn`;
  } else {
    return `${Math.round(differenceInSeconds)}s`;
  }
};
