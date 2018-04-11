import { Component, OnInit } from '@angular/core';
import {CustomRole} from '../../models/role/custom-role';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs/Subject';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-modal-remove',
  templateUrl: './modal-remove.component.html',
  styleUrls: ['./modal-remove.component.scss']
})
export class ModalRemoveComponent implements OnInit {

  public user: Utilisateur = new Utilisateur();
  public type: string;
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(
    private utilisateurService: UtilisateurService,
    public modalRef: BsModalRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  public showRemoveModal(type: string, user: Utilisateur): void {
    this.type = type;
    this.user =  user;
    console.log(type, user);
  }

  confirm(){
    this.isLoading = true;
    if(this.type === 'd'){
      this.utilisateurService.disableUser(this.user)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            user: this.user
          };
          this.showDisable("Utilisateur désactivé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'r'){
      this.utilisateurService.removeUser(this.user)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            user: this.user
          };
          this.showRemove("Utilisateur supprimé avec succès");
          this.onClose.next(data);
          this.isLoading = false;
          this.modalRef.hide();
        }, (err) =>{
          console.log(err);
          this.isLoading = false;
        })
    }

    if(this.type === 'e'){
      this.utilisateurService.enableUser(this.user)
        .subscribe((resp) =>{
          console.log(resp);
          let data = {
            type: this.type,
            user: this.user
          };
          this.showEnable("Utilisateur activé avec succès");
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
