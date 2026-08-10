export function inputPINRules(code: string) {
  // 1. All digits in your PIN can’t be identical
  const sample = code[0];
  let count = 0;

  for (const char of code) {
    if (char === sample) {
      count++;
    }
  }
  if (count === code.length) {
    return {
      error: true,
      message: "pin_code_identical",
    };
  }

  return {
    error: false,
    message: "",
  };
}
