import { Role } from './Role';

export class User {
  id: number = 0;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: Role = Role.USER;

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
  }
}
