import {Role} from '../role/role';

export class RegisterForm {
  id: number;
  username: string;
  password: string;
  repassword: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  roles: Array<Role>;
}
