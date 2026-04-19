/**
 * Gets environment variable value.
 *
 * Returns value from process.env by key.
 * If variable is missing, uses defaultValue (if provided).
 * Throws error when neither env variable nor defaultValue is available.
 *
 * @param key - Environment variable name
 * @param defaultValue - Optional fallback value if env variable is not set
 * @returns Resolved environment variable value
 *
 * @throws Error when environment variable is missing and no defaultValue is provided
 *
 * @example
 * const mongoUri = getEnv("MONGO_URI");
 *
 * @example
 * const port = getEnv("PORT", "3000");
 */

function getEnv(key: string, defaultValue?: string): string {
  const value = process.env[key] ?? defaultValue;

  if (!value) throw new Error(`Missing environment variable -- ${key}`);
  return value;
}
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const MONGO_URI = getEnv("MONGO_URI");
export const SERVER_PORT = getEnv("SERVER_PORT", "4000");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
