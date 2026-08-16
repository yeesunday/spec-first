// 标题自动识别截止日期（REQ-due-date#R6~R8）
// 规则：取第一个匹配；歧义或无匹配返回 null；纯函数，不修改任何输入。
const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"];

function addDays(date, days) {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function iso(date) {
  return date.toISOString().slice(0, 10);
}

function parseIso(value) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const date = new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
  const ok = date.getUTCFullYear() === Number(match[1])
    && date.getUTCMonth() === Number(match[2]) - 1
    && date.getUTCDate() === Number(match[3]);
  return ok ? date : null;
}

function monthDayToDate(today, month, day) {
  const date = new Date(Date.UTC(today.getUTCFullYear(), month - 1, day));
  if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) return null; // 如 2月30日
  if (date < today) date.setUTCFullYear(date.getUTCFullYear() + 1);
  return date;
}

// 每条规则返回 { index, date, matched } 或 null；全部规则取 index 最小者。
function rules(today) {
  return [
    (text) => {
      const m = /(\d{4})-(\d{2})-(\d{2})/.exec(text);
      const date = m ? parseIso(m[0]) : null;
      return m && date ? { index: m.index, date, matched: m[0] } : null;
    },
    (text) => {
      const m = /(\d{1,2})月(\d{1,2})日/.exec(text);
      const date = m ? monthDayToDate(today, Number(m[1]), Number(m[2])) : null;
      return m && date ? { index: m.index, date, matched: m[0] } : null;
    },
    (text) => {
      const m = /(\d{1,2})-(\d{1,2})/.exec(text);
      const date = m ? monthDayToDate(today, Number(m[1]), Number(m[2])) : null;
      return m && date ? { index: m.index, date, matched: m[0] } : null;
    },
    (text) => {
      const m = /(下周|周|星期)([一二三四五六日天])/.exec(text);
      if (!m) return null;
      const isNext = m[1] === "下周";
      const weekday = m[2] === "天" ? 0 : WEEKDAYS.indexOf(m[2]);
      let offset = (weekday - today.getUTCDay() + 7) % 7;
      if (offset === 0) offset = 7; // 今天不算
      if (isNext) offset += 7;
      return { index: m.index, date: addDays(today, offset), matched: m[0] };
    },
    (text) => {
      const m = /(\d{1,2})天后/.exec(text);
      const days = m ? Number(m[1]) : 0;
      return m && days >= 1 && days <= 90
        ? { index: m.index, date: addDays(today, days), matched: m[0] } : null;
    },
    (text) => {
      const m = /(今天|明天|后天)/.exec(text);
      const offsets = { 今天: 0, 明天: 1, 后天: 2 };
      return m ? { index: m.index, date: addDays(today, offsets[m[1]]), matched: m[0] } : null;
    },
  ];
}

export function detectDueDate(title, today) {
  if (typeof title !== "string" || title.length === 0) return null;
  const base = parseIso(today);
  if (!base) throw new TypeError("today must be YYYY-MM-DD");
  const candidates = rules(base).map((rule) => rule(title)).filter(Boolean);
  if (candidates.length === 0) return null;
  const best = candidates.reduce((left, right) => (left.index <= right.index ? left : right));
  return { date: iso(best.date), matched: best.matched };
}
