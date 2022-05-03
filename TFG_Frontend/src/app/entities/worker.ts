export class Worker {
  id: string = "";
  name: string = "";
  surname: string = "";
  spec: string = "";
  available: boolean = true;
  role: string = "";
  email: string = "";

  constructor(
    id: string,
    name: string,
    surname: string,
    spec: string,
    available: boolean,
    role: string,
    email: string,
  ) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.spec = spec;
    this.available = available;
    this.role = role;
    this.email = email;
  }
}
