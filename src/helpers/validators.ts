// ──────────────────────────────────────────────
// Regex
// ──────────────────────────────────────────────

/** French phone: 10 digits */
export const FRENCH_PHONE_REGEX = /^\d{10}$/;

// ──────────────────────────────────────────────
// Validators
// ──────────────────────────────────────────────

/** Luhn checksum — used by SIRET to validate the control key */
export const isValidLuhn = (value: string): boolean => {
  let sum = 0;
  for (let i = 0; i < value.length; i++) {
    let digit = Number(value[value.length - 1 - i]);
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};
