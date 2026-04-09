const adjustForTimezone = (date) => {
  const adjustedDate = new Date(date);
  adjustedDate.setMinutes(
    adjustedDate.getMinutes() + adjustedDate.getTimezoneOffset(),
  );
  return adjustedDate;
};
export default adjustForTimezone;
