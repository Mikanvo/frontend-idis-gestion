import {LigneFacture} from '../facture/ligne-facture';
import {Colis} from '../colis/colis';
import {Utilisateur} from '../utilisateur/utilisateur';
import {TypeFacture} from '../type-facture/type-facture';

export class Mouvement{
  id: number;
  debit: number;
  credit: number;
  colis: Colis;
  utilisateur: Utilisateur;
  createAt: Date;
  updateAt: Date;
  enable: number;
}
