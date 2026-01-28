// ──────────────────────────────────────────────
// Sanitizers (used in mutations before API calls)
// ──────────────────────────────────────────────

/** Strip spaces, dots and dashes from phone number (preserves +33 prefix) */
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

/**
 * Format French phone:
 * - 06 12 34 56 78 (2-2-2-2-2) for national format
 * - +33 6 12 34 56 78 (1-2-2-2-2) for international format
 */
export const formatPhone = (value: string): string => {
  // Check if it starts with +33
  if (value.startsWith("+33")) {
    const digits = value.slice(3).replace(/\D/g, "").slice(0, 9);

    // Format progressively: +33 X XX XX XX XX (1-2-2-2-2)
    if (digits.length === 0) return "+33 ";
    if (digits.length <= 1) return `+33 ${digits}`;
    if (digits.length <= 3) return `+33 ${digits[0]} ${digits.slice(1)}`;
    if (digits.length <= 5)
      return `+33 ${digits[0]} ${digits.slice(1, 3)} ${digits.slice(3)}`;
    if (digits.length <= 7)
      return `+33 ${digits[0]} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
    return `+33 ${digits[0]} ${digits.slice(1, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
  }

  // National format: 10 digits (2-2-2-2-2)
  const digits = value.replace(/\D/g, "").slice(0, 10);
  return digits.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
};
