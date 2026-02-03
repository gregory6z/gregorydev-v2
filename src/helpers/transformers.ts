/**
 * Converts a camelCase string to snake_case
 */
export const toSnakeCase = (str: string): string =>
  str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

/**
 * Converts a snake_case string to camelCase
 */
export const toCamelCase = (str: string): string =>
  str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());

/**
 * Recursively transforms object keys from camelCase to snake_case
 */
export const toSnakeCaseKeys = <T>(obj: T): unknown => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(toSnakeCaseKeys);
  if (typeof obj !== "object") return obj;

  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
      toSnakeCase(key),
      toSnakeCaseKeys(value),
    ]),
  );
};

/**
 * Recursively transforms object keys from snake_case to camelCase
 */
export const toCamelCaseKeys = <T>(obj: T): unknown => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) return obj.map(toCamelCaseKeys);
  if (typeof obj !== "object") return obj;

  return Object.fromEntries(
    Object.entries(obj as Record<string, unknown>).map(([key, value]) => [
      toCamelCase(key),
      toCamelCaseKeys(value),
    ]),
  );
};
