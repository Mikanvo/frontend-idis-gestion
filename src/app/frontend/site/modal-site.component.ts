import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Site} from '../../models/site/site';
import {SiteService} from '../../services/site/site.service';
import {PaysService} from '../../services/pays/pays.service';
import {Pays} from '../../models/pays/pays';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-modal-site',
  templateUrl: './modal-site.component.html',
  styleUrls: ['./modal-site.component.scss']
})
export class ModalSiteComponent implements OnInit, OnDestroy {
  public site: Site = new Site();
  siteSubscription: Subscription = null;
  allPays: Array<Pays> = new Array<Pays>();
  paysSubscription: Subscription = null;
  public type: string;
  siteForm: FormGroup;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  error: string = '';
  alert: any = {
    type: 'danger',
    dismissible: true
  };

  constructor(private siteService: SiteService,
              private paysService: PaysService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getAllPays();
    this.createForm();
  }

  getAllPays() {
    this.paysSubscription = this.paysService.getAllPays().subscribe((pays) => {
      this.allPays = pays;
    });
  }

  public showSiteModal(type: string, site: Site): void {
    this.type = type;
    if (site !== null) {

      this.siteForm.setValue({
        id: site.id || '',
        nomSite: site.nomSite || '',
        codeSite: site.codeSite || '',
        contact: site.contact || '',
        adresse: site.adresse || '',
        description: site.description || '',
        pays: site.pays || {}
      });

      let id = this.siteForm.get('id');
      let nomSite = this.siteForm.get('nomSite');
      let codeSite = this.siteForm.get('codeSite');
      let contact = this.siteForm.get('contact');
      let adresse = this.siteForm.get('adresse');
      let description = this.siteForm.get('description');
      let pays = this.siteForm.get('pays');

      (this.type) ? id.disable() : id.enable();
      (this.type === 's') ? nomSite.disable() : nomSite.enable();
      (this.type === 's') ? codeSite.disable() : codeSite.enable();
      (this.type === 's') ? contact.disable() : contact.enable();
      (this.type === 's') ? adresse.disable() : adresse.enable();
      (this.type === 's') ? description.disable() : description.enable();
      (this.type === 's') ? pays.disable() : pays.enable();

    }

  }

  createForm() {

    this.siteForm = this.fb.group({
      id: new FormControl(this.site.id),
      nomSite: new FormControl(this.site.nomSite, [Validators.required, Validators.minLength(4)]),
      codeSite: new FormControl(this.site.codeSite, [Validators.required, Validators.minLength(3)]),
      contact: new FormControl(this.site.contact, [Validators.required, Validators.minLength(8), Validators.pattern('[0-9 ]*')]),
      adresse: new FormControl(this.site.adresse),
      description: new FormControl(this.site.description),
      pays: new FormControl(this.site.pays, [Validators.required])
    });

  }

  paysValue(event) {

  }

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress() {
    if (this.type === 'i') {
      this.saveSite();
    }
    if (this.type === 'u') {
      this.updateSite();
    }
  }

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

  saveSite() {
    this.isLoading = true;
    this.site.nomSite = this.siteForm.value.nomSite;
    this.site.codeSite = this.siteForm.value.codeSite;
    this.site.contact = this.siteForm.value.contact;
    this.site.adresse = this.siteForm.value.adresse;
    this.site.description = this.siteForm.value.description;
    this.site.pays = this.siteForm.value.pays;

    this.siteSubscription = this.siteService.addSite(this.site)
      .subscribe((site: Site) => {
        let data = {
          type: this.type,
          site: site
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave('Site enregistré avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  updateSite() {
    this.isLoading = true;
    this.site.id = this.siteForm.getRawValue().id;
    this.site.nomSite = this.siteForm.getRawValue().nomSite;
    this.site.codeSite = this.siteForm.getRawValue().codeSite;
    this.site.contact = this.siteForm.getRawValue().contact;
    this.site.adresse = this.siteForm.getRawValue().adresse;
    this.site.description = this.siteForm.getRawValue().description;
    this.site.pays = this.siteForm.getRawValue().pays;

    this.siteSubscription = this.siteService.updateSite(this.site)
      .subscribe((site: Site) => {
        let data = {
          type: this.type,
          site: site
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate('Site modifié avec succès');
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.error = err;
        this.isLoading = false;
      });

  }

  dismiss() {
    this.error = '';
  }

  ngOnDestroy(){
    this.siteSubscription !== null ? this.siteSubscription.unsubscribe() : null;
    this.paysSubscription !== null ? this.paysSubscription.unsubscribe() : null;
  }

}
