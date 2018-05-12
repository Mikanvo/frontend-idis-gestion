import {TypeFacture} from '../type-facture/type-facture';
import {LigneFacture} from './ligne-facture';
import {Mouvement} from '../mouvement/mouvement';
import {Tva} from '../tva/tva';
import {Devise} from '../devise/devise';

export class Facture extends Mouvement{
  numeroFacture: string;
  tva: Tva;
  devise: Devise;
  dateEcheance: Date;
  montantFacture: number;
  typeFacture: TypeFacture;
  ligneFactures: Array<LigneFacture>;
  createAt: Date;
  updateAt: Date;
  enable: number;
}
