import {Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {TabDirective} from 'ngx-bootstrap/tabs';
import {Subject} from 'rxjs/Subject';
import {TokenService} from '../../services/token/token.service';
import {FactureService} from '../../services/facture/facture.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {Facture} from '../../models/facture/facture';
import {ColisService} from '../../services/colis/colis.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Colis} from '../../models/colis/colis';
import {BsDatepickerConfig, BsLocaleService, TabsetComponent} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {ListeFactures} from '../../models/facture/liste-factures';
import {LigneFacture} from '../../models/facture/ligne-facture';
import {TypeFactureService} from '../../services/type-facture/type-facture.service';
import {TypeFacture} from '../../models/type-facture/type-facture';
import {DetailsColis} from '../../models/colis/details-colis';
import {Tva} from '../../models/tva/tva';
import {Devise} from '../../models/devise/devise';
import {TvaService} from '../../services/tva/tva.service';
import {DeviseService} from '../../services/devise/devise.service';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ModalRemoveFactureComponent} from './modal-remove-facture.component';

@Component({
  selector: 'app-factures',
  templateUrl: './factures.component.html',
  styleUrls: ['./factures.component.scss']
})
export class FacturesComponent implements OnInit {
  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  modalRef: BsModalRef;

  //---------------------------- START COLIS FORM -------------------------------

  public type: string;
  facture: Facture = new Facture();
  factureForm: FormGroup;
  public onClose: Subject<any>;
  isLoading: boolean = false;
  allColis: Array<Colis> = new Array<Colis>();
  allTvas: Array<Tva> = new Array<Tva>();
  allDevises: Array<Devise> = new Array<Devise>();
  colis: Colis = null;
  montantHT: number = 0;
  montantTTC: number = 0;
  tva: number = 0;
  inputTva: string = '';
  //---------------------------- END COLIS FORM -------------------------------

  bsConfig: Partial<BsDatepickerConfig>;
  colorTheme = 'theme-blue';
  locale = 'fr';

  allFactures: ListeFactures;
  allTypesFactures: Array<TypeFacture>;
  user: Utilisateur = new Utilisateur();
  factureSubscription: Subscription = null;

  numeroFacture: string = '';
  referenceColis: string = '';
  nomTypeFacture: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;
  showBtn: boolean = false;

  constructor(private factureService: FactureService,
              private colisService: ColisService,
              private typeFactureService: TypeFactureService,
              private tvaService: TvaService,
              private deviseService: DeviseService,
              private userService: UtilisateurService,
              private tokenService: TokenService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private modalService: BsModalService,
              private localeService: BsLocaleService) {
  }

  ngOnInit() {
    this.type = 'i';
    this.bsConfig = Object.assign({}, { containerClass: this.colorTheme });
    this.applyLocale();
    this.searchFactures();
    this.getProfile();
    this.getAllColis();
    this.getAllTvas();
    this.getAllDevises();
    this.getTypesFactures();
    this.createFacture();
    this.clearFormArray(this.ligneFactures);
  }

  onValueChange(value: Date): void {
    console.log(value);
  }

  applyLocale() {
    this.localeService.use(this.locale);
  }

  onSelect(tab: TabDirective): void {
    if (tab.id === 'liste-facture') {
      this.type = 'i';
      this.factureForm.enable();
      this.clearFactureForm();
      this.showBtn = false;
    }
  }

  clearFormArray(formArray: FormArray) {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  clearFactureForm() {
    this.clearFormArray(this.ligneFactures);
    this.factureForm.reset({
      id: '',
      numeroFacture: '',
      dateEcheance: null,
      typeFacture: null,
      colis: null,
      ligneFactures: new FormArray([])
    });
    this.facture = new Facture();
    this.colis = null;
  }

  clearSearchFacture() {
    this.numeroFacture = '';
    this.nomTypeFacture = '';
    this.referenceColis = '';
    this.currentPage = 0;
    this.searchFactures();
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  searchNumeroFacture() {
    this.searchFactures();
  }

  searchNomTypeFacture(event: any) {
    console.log(event);
    if(event !== undefined){
      this.nomTypeFacture = event.nomTypeFacture;
    }else{
      this.nomTypeFacture = "";
    }

    this.searchFactures();
  }

  searchReferenceColis() {
    this.searchFactures();
  }

  searchStatut() {
    this.searchFactures();
  }

  // ---------------------------------- START API REQUEST-----------------------------------------------------
  searchFactures() {
    this.factureSubscription = this.factureService.searchFactures(this.numeroFacture, this.referenceColis, this.nomTypeFacture, this.enable, this.currentPage, this.size)
      .subscribe((factures) => {
        this.allFactures = factures;
        this.pages = new Array(factures.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  getAllColis() {
    this.colisService.getAllSendColis()
      .subscribe((colis) => {
        this.allColis = colis;
      })
  }

  getAllTvas(){
    this.tvaService.getAllTvas()
      .subscribe((tvas) => {
        this.allTvas = tvas;
      })
  }

  getAllDevises(){
    this.deviseService.getAllDevises()
      .subscribe((devises) => {
        this.allDevises = devises;
      })
  }

  getTypesFactures() {
    this.typeFactureService.getAllTypeFacture()
      .subscribe((typesFactures) => {
        this.allTypesFactures = typesFactures;
      })
  }

  getProfile() {
    this.userService.getProfile().subscribe((user) => {
      this.user = user;
      this.tva = user.personne.site.tva.valeurTva;
    });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchFactures();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchFactures();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchFactures();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchFactures();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchFactures();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchFactures();
  }

  reload() {
    this.currentPage = 0;
    this.searchFactures();
  }

  getNomTypeFacture(typeFacture: TypeFacture){
    if(typeFacture !== undefined){
      if(typeFacture.nomTypeFacture.toLowerCase() === 'avoir'){
        this.showBtn = true;
      }else{
        this.showBtn = false;
      }
    }else{
      this.showBtn = false;
    }
  }

  searchNomColis(colis: Colis) {
    console.log(colis);
    if(colis !== undefined){
      this.colis = colis;
      if (colis.detailsColis.length > 0) {
        this.setDetailsColisToLigneFactures(colis.detailsColis);
      }
    }else {
      this.colis = null;
      this.clearFormArray(this.ligneFactures);
    }
    this.montantHT = 0;
    this.montantTTC = 0;

  }

  // ---------------------------- START FORM COLIS --------------------------------------------

  createFacture() {
    this.factureForm = this.fb.group({
      id: [this.facture.id],
      numeroFacture: [this.facture.numeroFacture],
      dateEcheance: [this.facture.dateEcheance],
      typeFacture: [this.facture.typeFacture, Validators.required],
      colis: [this.facture.colis, Validators.required],
      ligneFactures: this.fb.array([this.createLigneFactures()])
    });
  }

  createLigneFactures(): FormGroup {
    return this.fb.group({
      id: [{value: '', disabled: true}],
      detailsColis: [null],
      designation: [{value: '', disabled: true}, Validators.required],
      quantite: [{value: '', disabled: true}, Validators.required],
      prixUnitaire: ['', Validators.required],
      prixTotal: [{value: '', disabled: true}, Validators.required],
    });
  }

  addLigneFacture(): void {
    this.ligneFactures.push(this.createLigneFactures());
  }

  get ligneFactures(): FormArray {
    return this.factureForm.get('ligneFactures') as FormArray;
  };

  deleteligneFacture(index) {
    this.ligneFactures.controls.splice(index, 1);
  }

  editForm(facture: Facture) {

    this.type = 'u';
    this.facture = facture;
    this.colis = facture.colis;

    this.clearFormArray(this.ligneFactures);

    this.factureForm.setValue({
      id: facture.id,
      numeroFacture: facture.numeroFacture,
      dateEcheance: facture.dateEcheance !== null ? new Date(facture.dateEcheance): null,
      typeFacture: facture.typeFacture,
      colis: facture.colis,
      ligneFactures: []
    });

    let id = this.factureForm.get('id');
    let numeroFacture = this.factureForm.get('numeroFacture');
    let colis = this.factureForm.get('colis');
    let typeFacture = this.factureForm.get('typeFacture');
    (this.type) ? id.disable() : id.enable();
    (this.type) ? numeroFacture.disable() : numeroFacture.enable();
    (this.type) ? colis.disable() : colis.enable();
    (this.type) ? typeFacture.disable() : typeFacture.enable();


    if (facture.ligneFactures.length > 0) {
      this.setLigneFactures(facture.ligneFactures);
      this.montantHT = 0;
      facture.ligneFactures.forEach((lf) =>{
        this.montantHT += lf.prixTotal;
      });
      this.montantTTC = (1 + this.tva) * this.montantHT;
    }

    this.selectTab(1);
  }

  showForm(facture: Facture) {
    this.type = 's';
    this.facture = facture;
    this.colis = facture.colis;

    this.clearFormArray(this.ligneFactures);

    this.factureForm.setValue({
      id: facture.id,
      numeroFacture: facture.numeroFacture,
      dateEcheance: facture.dateEcheance !== null ? new Date(facture.dateEcheance): null,
      typeFacture: facture.typeFacture,
      colis: facture.colis,
      ligneFactures: []
    });

    let id = this.factureForm.get('id');
    let numeroFacture = this.factureForm.get('numeroFacture');
    let colis = this.factureForm.get('colis');
    let typeFacture = this.factureForm.get('typeFacture');
    let dateEcheance = this.factureForm.get('dateEcheance');
    (this.type) ? id.disable() : id.enable();
    (this.type) ? numeroFacture.disable() : numeroFacture.enable();
    (this.type) ? colis.disable() : colis.enable();
    (this.type) ? typeFacture.disable() : typeFacture.enable();
    (this.type) ? dateEcheance.disable() : dateEcheance.enable();


    if (facture.ligneFactures.length > 0) {
      this.setLigneFactures(facture.ligneFactures);
      this.montantHT = 0;
      facture.ligneFactures.forEach((lf) =>{
        this.montantHT += lf.prixTotal;
      });
      this.montantTTC = (1 + this.tva) * this.montantHT;
    }

    this.selectTab(1);
  }

  setLigneFactures(ligneFactures: LigneFacture[]) {
    const ligneFacturesFGs = ligneFactures.map(lf => this.fb.group({
      id: [{value: lf.id, disabled: true}],
      detailsColis: lf.detailsColis,
      designation: [{value: lf.detailsColis.designation, disabled: true}],
      quantite: [{value: lf.detailsColis.quantite, disabled: true}],
      prixUnitaire: [{value: lf.prixUnitaire, disabled: this.type === 's'}],
      prixTotal: [{value: lf.prixTotal, disabled: true}]
    }));
    console.log(ligneFacturesFGs);
    const lfFormArray = this.fb.array(ligneFacturesFGs);
    this.factureForm.setControl('ligneFactures', lfFormArray);
  }

  setDetailsColisToLigneFactures(detailsColis: DetailsColis[]) {
    const ligneFacturesFGs = detailsColis.map(dc => this.fb.group({
        id: [{value: dc.id, disabled: true}],
        detailsColis: dc,
        designation: [{value: dc.designation, disabled: true}],
        quantite: [{value: dc.quantite, disabled: true}],
        prixUnitaire: 0,
        prixTotal: [{value: 0, disabled: true}]
      }));
    console.log(ligneFacturesFGs);
    const lfFormArray = this.fb.array(ligneFacturesFGs);
    this.factureForm.setControl('ligneFactures', lfFormArray);
  }

  prixUnitaire(event: any, index: number){
    console.log(event.target.value);
    let lf = this.ligneFactures.controls[index];
    if(event.target.value){
      this.ligneFactures.controls[index].reset({
        id: lf.get('id').value,
        detailsColis: lf.get('detailsColis').value,
        designation: lf.get('designation').value,
        quantite: lf.get('quantite').value,
        prixUnitaire: lf.get('prixUnitaire').value,
        prixTotal: parseInt(lf.get('prixUnitaire').value) * parseInt(lf.get('quantite').value)
      });
      this.montantHT = 0;
      this.ligneFactures.controls.forEach((lf) =>{
        this.montantHT += lf.get('prixTotal').value;
      });
      this.montantTTC = (1 + this.tva) * this.montantHT;
    }else{
      this.ligneFactures.controls[index].reset({
        id: lf.get('id').value,
        detailsColis: lf.get('detailsColis').value,
        designation: lf.get('designation').value,
        quantite: lf.get('quantite').value,
        prixUnitaire: 0,
        prixTotal: 0
      });
    }

  }

  saveFacture() {
    this.ligneFactures.controls.forEach((lf) =>{
      lf.get('prixTotal').enable();
    });
    this.isLoading = true;
    this.facture.type = "FACTURE";
    this.facture.typeFacture = this.factureForm.value.typeFacture;
    this.facture.colis = this.factureForm.value.colis;
    if(this.facture.typeFacture.nomTypeFacture.toLowerCase() === 'facture'){
      let dateEcheance = JSON.stringify(this.factureForm.getRawValue().dateEcheance);
      this.facture.dateEcheance = dateEcheance.substr(1, dateEcheance.length - 2);
    }
    this.facture.ligneFactures = this.factureForm.value.ligneFactures;

    this.ligneFactures.controls.forEach((lf) =>{
      lf.get('prixTotal').disable();
    });

    this.factureService.addFacture(this.facture)
      .subscribe((facture) => {
        console.log(facture);
        this.clearSearchFacture();
        this.clearFactureForm();
        this.isLoading = false;
        this.selectTab(0);
        this.showSave('Facture enregistrée avec succès!')
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      })
  }

  updateFacture() {
    //console.log(date);
    this.isLoading = true;
    this.facture.type = "FACTURE";
    this.facture.id = this.factureForm.getRawValue().id;
    this.facture.numeroFacture = this.factureForm.getRawValue().numeroFacture;
    this.facture.typeFacture = this.factureForm.getRawValue().typeFacture;
    this.facture.colis = this.factureForm.getRawValue().colis;
    let dateEcheance = JSON.stringify(this.factureForm.getRawValue().dateEcheance);
    this.facture.dateEcheance = dateEcheance.substr(1, dateEcheance.length - 2);
    this.facture.ligneFactures = this.factureForm.getRawValue().ligneFactures;

    this.factureService.updateFacture(this.facture)
      .subscribe((facture) => {
        console.log(facture);
        this.clearSearchFacture();
        this.clearFactureForm();
        this.isLoading = false;
        this.selectTab(0);
        this.showUpdate('Facture modifiée avec succès!')
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      })
  }

  // ---------------------------- END FORM COLIS --------------------------------------------
  // ------------------------------ START TOAST ---------------------------------------------
  showSave(msg: string) {
    this.toastr.success(msg, 'Enregistrement', {
      closeButton: true,
      timeOut: 3000,
    });
  }

  showUpdate(msg: string) {
    this.toastr.warning(msg, 'Modification', {
      closeButton: true,
      timeOut: 3000,
    });
  }

  // ------------------------------ END TOAST ------------------------------------------

  // ------------------------------- START MODAL REMOVAL -------------------------------------

  openRemoveModal(facture: Facture, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveFactureComponent, {class: 'modal-sm'});

    (<ModalRemoveFactureComponent>this.modalRef.content).showRemoveModal(
      type,
      facture
    );

    (<ModalRemoveFactureComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allFactures.factures[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allFactures.factures[index].enable = 1;
      }
      if (result.type === 'r') {
        this.searchFactures();
      }
    });

  }

  // ------------------------------- END MODAL REMOVAL ---------------------------------------

  ngOnDestroy() {
    this.factureSubscription !== null ? this.factureSubscription.unsubscribe() : null;
  }

}
