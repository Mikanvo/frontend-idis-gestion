import {Site} from '../site/site';

export class Personne{
  type: string;
  id: number;
  matricule: string;
  codeClient: string;
  raisonSociale: string;
  contact: string;
  email: string;
  adresse: string;
  createAt: Date;
  updateAt: Date;
  enable: number;
  site: Site;
}
