// ──────────────────────────────────────────────
// Sanitizers (used in mutations before API calls)
// ──────────────────────────────────────────────

/** Strip spaces, dots and dashes from phone number */
export const cleanPhone = (value: string): string =>
  value.replace(/[\s.-]/g, "");

// ──────────────────────────────────────────────
// Formatters (used in inputs for display)
// ──────────────────────────────────────────────

/** Format SIRET: 123 456 789 01234 (3-3-3-5) */
export const formatSiret = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 14);
  const parts = [
    digits.slice(0, 3),
    digits.slice(3, 6),
    digits.slice(6, 9),
    digits.slice(9, 14),
  ];
  return parts.filter(Boolean).join(" ");
};

/** Format French phone: 06 12 34 56 78 (2-2-2-2-2) */
export const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};
