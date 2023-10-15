export const formatDateToString = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = Math.round(date.getMinutes()).toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export const formatPrice = (price: number): string => {
  const formattedPrice = price.toFixed(2);
  const lastTwoDigits = formattedPrice.slice(-2);
  if (lastTwoDigits === "00") {
    return formattedPrice.slice(0, -3);
  }
  return formattedPrice;
};
