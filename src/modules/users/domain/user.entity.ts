export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public surname: string,
    public email: string,
    public role?: string,
  ) {}
}
