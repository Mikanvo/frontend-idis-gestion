import {Component, OnInit, ViewChild} from '@angular/core';
import {ColisService} from '../../services/colis/colis.service';
import {ListeColis} from '../../models/colis/liste-colis';
import {Subscription} from 'rxjs/Subscription';
import {TokenService} from '../../services/token/token.service';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { TabsetComponent } from 'ngx-bootstrap';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Colis} from '../../models/colis/colis';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrService} from 'ngx-toastr';
import {Client} from '../../models/client/client';
import {ClientService} from '../../services/client/client.service';
import {SiteService} from '../../services/site/site.service';
import {Site} from '../../models/site/site';

@Component({
  selector: 'app-colis-send',
  templateUrl: './colis-send.component.html',
  styleUrls: ['./colis-send.component.scss']
})
export class ColisSendComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  //---------------------------- START COLIS FORM -------------------------------

  public type: string = 'i';
  colis: Colis = new Colis();
  colisForm: FormGroup;
  //detailsColis: FormArray = new FormArray([]);
  public onClose: Subject<any>;
  isLoading: boolean = false;
  allClients: Array<Client> = new Array<Client>();
  allSites: Array<Site> = new Array<Site>();

  //---------------------------- END COLIS FORM -------------------------------


  allColis: ListeColis;
  colisSubscription: Subscription = null;

  reference: string = '';
  nomClient: string = '';
  nomDestinataire: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(
    private colisService: ColisService,
    private clientService: ClientService,
    private siteService: SiteService,
    private tokenService: TokenService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.sendSearchClients();
    this.getAllClients();
    this.getAllSites();
    this.createColis();
    console.log(this.colisForm);
  }

  onSelect(data: TabDirective): void {
    console.log(data);
  }

  selectTab(tab_id: number) {
    this.staticTabs.tabs[tab_id].active = true;
  }

  searchReference() {
    this.sendSearchClients();
  }

  searchNomClient() {
    this.sendSearchClients();
  }

  searchNomDestinataire() {
    this.sendSearchClients();
  }

  searchStatut() {
    this.sendSearchClients();
  }

  // ---------------------------------- START API REQUEST-----------------------------------------------------
  sendSearchClients() {
    this.colisSubscription = this.colisService.sendSearchColis(this.reference, this.nomClient, this.nomDestinataire, this.enable, this.currentPage, this.size)
      .subscribe((colis) => {
        this.allColis = colis;
        this.pages = new Array(colis.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  getAllClients(){
    this.clientService.getAllClients()
      .subscribe((clients) => {
        this.allClients = clients;
      })
  }

  getAllSites(){
    this.siteService.getAllSites().subscribe((sites) => {
      this.allSites = sites;
    });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.sendSearchClients();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.sendSearchClients();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.sendSearchClients();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.sendSearchClients();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.sendSearchClients();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.sendSearchClients();
  }

  reload() {
    this.currentPage = 0;
    this.sendSearchClients();
  }

  // ---------------------------- START FORM COLIS --------------------------------------------

  createColis(){
    this.colisForm = this.fb.group({
      id: [this.colis.id],
      reference: [this.colis.reference],
      qrCode: [this.colis.qrCode],
      valeurColis: [this.colis.valeurColis, Validators.required],
      description: [this.colis.description, Validators.required],
      nomDestinataire: [this.colis.nomDestinataire, Validators.required],
      contactDestinataire: [this.colis.contactDestinataire, Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern('[0-9 ]*')])],
      adresseDestinataire: [this.colis.adresseDestinataire, Validators.required],
      client: [this.colis.client, Validators.required],
      siteDestinataire: [this.colis.siteDestinataire, Validators.required],
      detaisColis: this.fb.array([this.createDetailsColis()])
    });
  }

  createDetailsColis(): FormGroup {
    return this.fb.group({
      id: [''],
      quantite: ['', Validators.required],
      poids: ['', Validators.required],
      designation: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  addDetailsColis(): void {
    //this.detailsColis = this.colisForm.get('detaisColis') as FormArray;
    console.log(this.detailsColis);
    this.detailsColis.push(this.createDetailsColis());
  }

  get detailsColis(): FormArray {
    return this.colisForm.get('detaisColis') as FormArray;
  };

  deleteDetail(index){
    this.detailsColis.controls.splice(index, 1);
  }

  // ---------------------------- END FORM COLIS --------------------------------------------

  ngOnDestroy(){
    this.colisSubscription !== null ? this.colisSubscription.unsubscribe() : null;
  }
}
