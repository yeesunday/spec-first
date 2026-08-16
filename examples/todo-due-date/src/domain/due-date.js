const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

export function isIsoDate(value) {
  if (typeof value !== "string") return false;
  const match = ISO_DATE.exec(value);
  if (!match) return false;
  const [, yearText, monthText, dayText] = match;
  const year = Number(yearText);
  const month = Number(monthText);
  const day = Number(dayText);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  return parsed.getUTCFullYear() === year && parsed.getUTCMonth() === month - 1 && parsed.getUTCDate() === day;
}

export function applyDueDate(todo, dueDate) {
  if (dueDate !== null && !isIsoDate(dueDate)) throw new TypeError("dueDate must be null or YYYY-MM-DD");
  return { ...todo, dueDate };
}

export function sortByDueDate(todos) {
  return [...todos].sort((left, right) => {
    if (left.dueDate === right.dueDate) return 0;
    if (left.dueDate === null || left.dueDate === undefined) return 1;
    if (right.dueDate === null || right.dueDate === undefined) return -1;
    return left.dueDate.localeCompare(right.dueDate);
  });
}
