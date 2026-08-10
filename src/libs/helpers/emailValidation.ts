export function emailValidation(data: string | null) {
  if (!data) {
    return "Please enter a valid email address";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if (!emailRegex.test(data)) {
    return "Please enter a valid email address";
  }

  return "";
}
