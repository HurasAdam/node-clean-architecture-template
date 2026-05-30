/**
 * @copyright 2026 Adam Huras
 * @license Apache-2.0
 */

export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public surname: string,
    public email: string,
    public role: string,
    public isActive: boolean,
  ) {}
}
