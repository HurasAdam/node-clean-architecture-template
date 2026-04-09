export interface IUSER {
  id: number;
  name: string;
  surname: string;
}

export class userRepository {
  private users: IUSER[] = [
    { id: 1, name: "Jurek", surname: "Owsiak" },
    { id: 2, name: "Romek", surname: "Kowalski" },
    { id: 3, name: "Czesław", surname: "Nowak" },
  ];

  constructor() {}

  findAll() {
    return this.users;
  }

  findById(id: number) {
    return this.users.find((u) => u.id === id);
  }

  create(user) {
    const newUser = { id: this.users.length + 1, ...user };
    this.users.push(newUser);
    return newUser;
  }

  deleteOne() {
    console.log("USUWAMY");
  }
}
