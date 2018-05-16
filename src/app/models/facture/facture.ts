import {TypeFacture} from '../type-facture/type-facture';
import {LigneFacture} from './ligne-facture';
import {Mouvement} from '../mouvement/mouvement';
import {Tva} from '../tva/tva';

export class Facture extends Mouvement{
  numeroFacture: string;
  tva: Tva;
  dateEcheance: string;
  typeFacture: TypeFacture;
  ligneFactures: Array<LigneFacture>;
  createAt: Date;
  updateAt: Date;
  enable: number;
}
