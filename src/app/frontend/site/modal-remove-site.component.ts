import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrService} from 'ngx-toastr';
import {Role} from '../../models/role/role';
import {RoleService} from '../../services/role/role.service';
import {SiteService} from '../../services/site/site.service';
import {Site} from '../../models/site/site';

@Component({
  selector: 'app-modal-remove-site',
  templateUrl: './modal-remove-site.component.html',
  styleUrls: ['./modal-remove-site.component.scss']
})
export class ModalRemoveSiteComponent implements OnInit {

  public site: Site = new Site();
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private siteService: SiteService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, site: Site): void {
    this.type = type;
    this.site =  site;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.siteService.disableSite(this.site)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            site: this.site
          };
          this.showDisable("Site désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.siteService.removeSite(this.site)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            site: this.site
          };
          this.showRemove("Site supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.siteService.enableSite(this.site)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            site: this.site
          };
          this.showEnable("Site activé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

  }

  showEnable(msg: string) {
    this.toastr.success(msg, "Activation", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  showDisable(msg: string) {
    this.toastr.error(msg, "Désactivation", {
      closeButton: true,
      timeOut: 3000,
    });
  }
  showRemove(msg: string) {
    this.toastr.error(msg, "Suppression", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  close(){
    this.modalRef.hide();

  }

}
