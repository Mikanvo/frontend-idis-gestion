import {Role} from './role';

export class Utilisateur {
  id: number;
  username: string;
  password: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  roles: Array<Role>;
}
