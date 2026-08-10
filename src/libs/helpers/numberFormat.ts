export function numberFormat(value: number) {
  return new Intl.NumberFormat(["ban", "id"]).format(value);
}

export function currencyFormat(value: number, shorten?: boolean): string {
  const prefix = "Rp";
  const numericValue = Number(value) || 0;

  if (!shorten) {
    return `${prefix} ${new Intl.NumberFormat(["ban", "id"]).format(numericValue)}`;
  }

  const lookup = [
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "B" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "K" },
    { value: 1, symbol: "" },
  ];

  const absoluteValue = Math.abs(numericValue);

  const item = lookup.find((unit) => absoluteValue >= unit.value) || lookup[lookup.length - 1];
  const shortened = absoluteValue / item.value;
  const decimal = item.value === 1 ? 0 : shortened >= 100 ? 0 : 1;
  const compact = Number(shortened.toFixed(decimal));
  const compactValue = new Intl.NumberFormat(["ban", "id"], {
    maximumFractionDigits: decimal,
    minimumFractionDigits: 0,
  }).format(compact);
  const result = `${compactValue}${item.symbol}`;

  return numericValue < 0 ? `-${prefix} ${result}` : `${prefix} ${result}`;
}

export function maskSalary(formatted: string): string {
  const prefix = "Rp";

  if (!formatted.startsWith(prefix)) return formatted;

  const masked = formatted.slice(prefix.length).replace(/[0-9]/g, "●");

  return `${prefix}${masked}`;
}

export function currencyDeformat(formatted: string): number {
  if (!formatted) return 0;

  const cleaned = formatted
    .replace(/Rp\s?/, "") // Remove "Rp " or "Rp"
    .replace(/\./g, "") // Remove thousand separators
    .replace(",", ".") // Replace decimal comma with dot
    .trim();

  const match = cleaned.match(/^(-?\d+(\.\d+)?)([MT])?$/);

  if (!match) return 0;

  const [, numberStr, , symbol] = match;

  let multiplier = 1;

  if (symbol === "M")
    multiplier = 1e9; // M for 1e9 (as per your formatter)
  else if (symbol === "T") multiplier = 1e12;

  const numeric = parseFloat(numberStr) * multiplier;

  return isNaN(numeric) ? 0 : numeric;
}
