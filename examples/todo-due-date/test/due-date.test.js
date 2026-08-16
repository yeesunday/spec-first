import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { applyDueDate, isIsoDate, sortByDueDate } from "../src/domain/due-date.js";
import { dueBadge, quickDate } from "../src/ui/due-date.js";
import { detectDueDate } from "../src/ui/detect.js";

const read = (path) => readFile(new URL(path, import.meta.url), "utf8");

test("all layered Spec sources are present", async () => {
  const files = [
    "../spec/CONVENTIONS.md",
    "../spec/product/REQ-due-date/ACCEPTANCE.md",
    "../spec/design/DES-due-date/tokens.json",
    "../spec/design/DES-due-date/assets/due-date.svg",
    "../spec/api/API-due-date/todo.openapi.json",
    "../spec/domain/DOM-due-date/schema.sql",
    "../spec/test/TEST-due-date/cases.md",
  ];
  for (const file of files) assert.ok((await read(file)).length > 0, file);
});

test("R1 validates, sets, and clears a date", () => {
  assert.equal(isIsoDate("2028-02-29"), true);
  assert.equal(isIsoDate("2027-02-29"), false);
  const todo = { id: "1", completed: false, dueDate: null };
  assert.equal(applyDueDate(todo, "2026-08-16").dueDate, "2026-08-16");
  assert.equal(applyDueDate({ ...todo, dueDate: "2026-08-16" }, null).dueDate, null);
  assert.throws(() => applyDueDate(todo, "2026-02-30"), /dueDate/);
});

test("R2 and R3 derive badges", () => {
  const todo = { id: "1", completed: false, dueDate: "2026-08-15" };
  assert.equal(dueBadge(todo, "2026-08-16"), "overdue");
  assert.equal(dueBadge({ ...todo, dueDate: "2026-08-16" }, "2026-08-16"), "due-today");
  assert.equal(dueBadge({ ...todo, completed: true }, "2026-08-16"), null);
  assert.equal(dueBadge({ ...todo, dueDate: null }, "2026-08-16"), null);
});

test("R4 sorts null last without mutating input", () => {
  const todos = [{ id: "none", dueDate: null }, { id: "later", dueDate: "2026-08-20" }, { id: "first", dueDate: "2026-08-17" }];
  assert.deepEqual(sortByDueDate(todos).map(({ id }) => id), ["first", "later", "none"]);
  assert.deepEqual(todos.map(({ id }) => id), ["none", "later", "first"]);
});

test("R5 computes shortcut dates", () => {
  assert.equal(quickDate("today", "2026-08-16"), "2026-08-16");
  assert.equal(quickDate("tomorrow", "2026-08-16"), "2026-08-17");
  assert.equal(quickDate("next-monday", "2026-08-17"), "2026-08-24");
});

test("R6 detects dates from titles", () => {
  const today = "2026-08-16"; // 周日
  assert.equal(detectDueDate("今天定稿", today).date, "2026-08-16");
  assert.equal(detectDueDate("明天交周报", today).date, "2026-08-17");
  assert.equal(detectDueDate("周五评审", today).date, "2026-08-21");
  assert.equal(detectDueDate("下周三交", today).date, "2026-08-26");
  assert.equal(detectDueDate("3天后交", today).date, "2026-08-19");
  assert.equal(detectDueDate("2026-08-20 前交", today).date, "2026-08-20");
  assert.equal(detectDueDate("08-20 交", today).date, "2026-08-20");
  assert.equal(detectDueDate("8月20日交", today).date, "2026-08-20");
  // 取第一个匹配
  assert.equal(detectDueDate("明天交，后天也行", today).date, "2026-08-17");
});

test("R7 keeps title untouched and reports the matched fragment", () => {
  const title = "明天交周报";
  const result = detectDueDate(title, "2026-08-16");
  assert.equal(title, "明天交周报");
  assert.equal(result.matched, "明天");
});

test("R8 returns null on missing or ambiguous dates", () => {
  const today = "2026-08-16";
  assert.equal(detectDueDate("记得交周报", today), null);
  assert.equal(detectDueDate("月底前交报告", today), null);
  assert.equal(detectDueDate("3天内交", today), null);
  assert.equal(detectDueDate("下周交", today), null);
  assert.equal(detectDueDate("交周报", today), null);
});
