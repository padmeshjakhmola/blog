// lib/utils/timeAgo.ts

export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals: [number, string][] = [
    [60, "second"],
    [60, "minute"],
    [24, "hour"],
    [7, "day"],
    [4.34524, "week"],
    [12, "month"],
    [Number.POSITIVE_INFINITY, "year"],
  ];

  let unit = "second";
  let value = seconds;

  for (let i = 0; i < intervals.length && value >= intervals[i][0]; i++) {
    value = value / intervals[i][0];
    unit = intervals[i][1];
  }

  const rounded = Math.floor(value);
  return `${rounded} ${unit}${rounded !== 1 ? "s" : ""} ago`;
}
