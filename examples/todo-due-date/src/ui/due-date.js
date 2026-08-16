import { isIsoDate } from "../domain/due-date.js";

export function dueBadge(todo, today) {
  if (!isIsoDate(today)) throw new TypeError("today must be YYYY-MM-DD");
  if (todo.completed || todo.dueDate === null || todo.dueDate === undefined) return null;
  if (!isIsoDate(todo.dueDate)) throw new TypeError("todo.dueDate is invalid");
  if (todo.dueDate < today) return "overdue";
  if (todo.dueDate === today) return "due-today";
  return null;
}

export function quickDate(choice, today) {
  if (!isIsoDate(today)) throw new TypeError("today must be YYYY-MM-DD");
  const [year, month, day] = today.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  let offset;
  if (choice === "today") offset = 0;
  else if (choice === "tomorrow") offset = 1;
  else if (choice === "next-monday") {
    offset = (8 - date.getUTCDay()) % 7;
    if (offset === 0) offset = 7;
  } else throw new TypeError("unknown shortcut");
  date.setUTCDate(date.getUTCDate() + offset);
  return date.toISOString().slice(0, 10);
}
