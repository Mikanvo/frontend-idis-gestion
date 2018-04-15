import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrService} from 'ngx-toastr';
import {Fonction} from '../../models/fonction/fonction';
import {FonctionService} from '../../services/fonction/fonction.service';

@Component({
  selector: 'app-modal-remove-fonction',
  templateUrl: './modal-remove-fonction.component.html',
  styleUrls: ['./modal-remove-fonction.component.scss']
})
export class ModalRemoveFonctionComponent implements OnInit {

  public fonction: Fonction = new Fonction();
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private fonctionService: FonctionService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, fonction: Fonction): void {
    this.type = type;
    this.fonction =  fonction;
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.fonctionService.disableFonction(this.fonction)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            fonction: this.fonction
          };
          this.showDisable("Fonction désactivée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.fonctionService.removeFonction(this.fonction)
        .subscribe((resp) =>{
          let data = {
            type: this.type,
            fonction: this.fonction
          };
          this.showRemove("Fonction supprimée avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.fonctionService.enableFonction(this.fonction)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            fonction: this.fonction
          };
          this.showEnable("Fonction activée avec succès");
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
