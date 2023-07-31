export function convertDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);
  const options = { month: "long", day: "numeric", year: "numeric" };
  return dateTime.toLocaleDateString("en-US", options);
}
