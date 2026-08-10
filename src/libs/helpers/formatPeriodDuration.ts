const MONTH_INDEX_BY_NAME: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const parsePeriodDate = (value: string, now: Date): Date | null => {
  const trimmed = value.trim();

  if (trimmed.toLowerCase() === "present") {
    return now;
  }

  const [monthRaw, yearRaw] = trimmed.split(/\s+/);

  if (!monthRaw || !yearRaw) {
    return null;
  }

  const monthIndex = MONTH_INDEX_BY_NAME[monthRaw.slice(0, 3).toLowerCase()];
  const year = Number.parseInt(yearRaw, 10);

  if (monthIndex === undefined || Number.isNaN(year)) {
    return null;
  }

  return new Date(year, monthIndex, 1);
};

const formatDurationString = (totalMonths: number): string => {
  const safeMonths = Math.max(0, totalMonths);
  const years = Math.floor(safeMonths / 12);
  const months = safeMonths % 12;
  const parts: string[] = [];

  if (years > 0) {
    parts.push(`${years} ${years === 1 ? "yr" : "yrs"}`);
  }

  if (months > 0) {
    parts.push(`${months} ${months === 1 ? "mo" : "mos"}`);
  }

  if (parts.length === 0) {
    return "Less than a month";
  }

  return parts.join(" ");
};

export interface FormatPeriodDurationOptions {
  now?: Date;
  separator?: string;
}

export default function formatPeriodDuration(
  period: string,
  options: FormatPeriodDurationOptions = {},
): string {
  const { now = new Date(), separator = " - " } = options;
  const [startRaw, endRaw] = period.split(separator);

  if (!startRaw || !endRaw) {
    return "";
  }

  const start = parsePeriodDate(startRaw, now);
  const end = parsePeriodDate(endRaw, now);

  if (!start || !end) {
    return "";
  }

  const totalMonths =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) +
    1;

  return formatDurationString(totalMonths);
}
