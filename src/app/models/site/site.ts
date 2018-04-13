import {Pays} from '../pays/pays';

export class Site {
  id: number;
  nomSite: string;
  codeSite: string;
  contact: string;
  adresse: string;
  description: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  pays: Pays
}
