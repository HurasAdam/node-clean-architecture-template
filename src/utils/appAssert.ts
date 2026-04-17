import AppErrorCode from "@/constants/appErrorCode";
import { HttpStatusCode } from "@/constants/http";
import assert from "node:assert";
import AppError from "./appError";

type AppAssert = (
  condition: any,
  httpStatusCode: HttpStatusCode,
  message: string,
  appErrorCode?: AppErrorCode,
) => asserts condition;

/**
 * Asserts that a given condition is truthy.
 * Throws an AppError if the condition evaluates to a falsy value.
 *
 * This utility is useful for validating data and ensuring required values exist.
 * It also improves TypeScript type narrowing via the `asserts` keyword.
 *
 * @param condition - The value or expression to evaluate.
 * @param httpStatusCode - HTTP status code to include in the error (e.g. 401, 403).
 * @param message - Human-readable error message.
 * @param appErrorCode - Optional application-specific error code.
 *
 * @throws {AppError} When the condition is falsy.
 *
 * @example
 * const user = await userRepository.findByEmail(email);
 * appAssert(user, 401, "Invalid email or password");
 *
 */

const appAssert: AppAssert = (
  condition,
  httpStatusCode,
  message,
  appErrorCode,
) => assert(condition, new AppError(httpStatusCode, message, appErrorCode));

export default appAssert;
