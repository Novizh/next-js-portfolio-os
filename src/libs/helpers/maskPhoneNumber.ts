export function maskPhoneNumber(number: string) {
  const masked = number.slice(0, -4).replace(/./g, "*") + number.slice(-4);

  return masked;
}
