export function formatDate(dateInput) {
  const date = new Date(dateInput);
  return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}
