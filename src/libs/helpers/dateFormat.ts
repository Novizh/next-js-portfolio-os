import moment from "moment";

export function dateFormat(
  value?: Date | string | null,
  format = "DD/MM/YYYY",
) {
  moment.locale("id");
  if (!value) return moment().format(format);

  return moment(value).format(format);
}

export function formatCutOffDate(date: Date): string {
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatTransactionDate(date: Date): string {
  return date.toLocaleString("id-ID", {
    month: "long",
    year: "numeric",
  });
}

export function formatTransactionDateShort(date: Date): string {
  return date.toLocaleString("id-ID", {
    month: "short",
    year: "numeric",
  });
}

export function formatTransactionDateTime(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const formatted = parsedDate.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formatted} WIB`;
}

export function formatTransactionDetailsDate(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const formatted = parsedDate.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return `${formatted}`;
}

export function formatTransactionDetailsDateTime(date: Date | string): string {
  const parsedDate = typeof date === "string" ? new Date(date) : date;
  const formatted = parsedDate.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${formatted} WIB`;
}

export function getCutOffDate(cutOffDay: number): Date {
  const now = new Date();

  return new Date(now.getFullYear(), now.getMonth(), cutOffDay);
}
