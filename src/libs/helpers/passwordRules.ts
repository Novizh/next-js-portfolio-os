export function passwordRules(data: string, confirm?: string) {
  if (confirm) {
    if (data !== confirm) {
      return "password_not_match";
    }
  }

  if (!data) {
    return "password_required";
  }

  if (data.length < 8) {
    return "password_must_be_long";
  }

  if (
    !new RegExp(
      `^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z\\d]).{${8},}$`,
    ).test(data)
  ) {
    return "password_invalid";
  }

  return "";
}
