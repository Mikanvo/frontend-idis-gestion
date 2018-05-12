import {DetailsColis} from '../colis/details-colis';

export class LigneFacture{
  id: number;
  prixUnitaire: number;
  prixTotal: number;
  detailsColis: DetailsColis;
  createAt: Date;
  updateAt: Date;
  enable: number;
}
