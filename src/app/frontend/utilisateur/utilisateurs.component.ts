import {Component, OnInit, TemplateRef} from '@angular/core';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ListeUtilisateurs} from '../../models/utilisateur/liste-utilisateurs';
import {TokenService} from '../../services/token/token.service';
import {RoleService} from '../../services/role/role.service';
import {CustomRole} from '../../models/role/custom-role';
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {ModalUtilisateurComponent} from './modal-utilisateur.component';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {

  //------------- START MODALS ---------------------------
  modalRef: BsModalRef;

  //------------- END FORMS -----------------------------

  allUsers: ListeUtilisateurs;
  allRoles: Array<CustomRole> = new Array<CustomRole>();
  username: string = '';
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;

  constructor(private utilisateurService: UtilisateurService,
              private roleService: RoleService,
              private tokenService: TokenService,
              private fb: FormBuilder,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getAllRoles();
    this.getAllUsers();
  }

  searchPseudo(username: string){
    this.getAllUsers();
  }

  searchStatut(){
    this.getAllUsers();
  }

  getAllUsers() {
    this.utilisateurService.searchUsers(this.username, this.enable, this.currentPage, this.size)
      .subscribe((users) => {
        this.allUsers = users;
        this.pages = new Array(users.totalPages);
        this.page = this.currentPage + 1;
      }, (err) => {
        console.log(err);
      });
  }

  getAllRoles() {
    this.roleService.getAllRoles().subscribe((roles) => {
      roles.forEach((role) => {
        this.allRoles.push({
          'id': role.id,
          'text': role.roleName
        });
      });
      console.log(this.allRoles)
    });
  }

  searchPage(page: number) {
    this.currentPage = page;
    this.getAllUsers();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.getAllUsers();
  }

  refreshValue(event) {
    console.log(event);
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.getAllUsers();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.getAllUsers();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.getAllUsers();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.getAllUsers();
  }

  reload() {
    this.currentPage = 0;
    this.getAllUsers();
  }

  //---------------------------------- MODAL FORMS -------------------------------
  openModal(user: Utilisateur, type: string) {
    if (type === 'i') {
      this.modalRef = this.modalService.show(ModalUtilisateurComponent, {class: 'modal-md modal-primary'});
    }
    if (type === 'u') {
      this.modalRef = this.modalService.show(ModalUtilisateurComponent, {class: 'modal-md modal-warning'});
    }
    if (type === 's') {
      this.modalRef = this.modalService.show(ModalUtilisateurComponent, {class: 'modal-md modal-default'});
    }

    (<ModalUtilisateurComponent>this.modalRef.content).showUserModal(
      type,
      user
    );

    (<ModalUtilisateurComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if(result.type === 'i'){
        this.allUsers.utilisateurs.unshift(result.user);
      }
      if(result.type === 'u'){
        /*let index = this.allUsers.utilisateurs.findIndex((user) => result.user.id);
        console.log("Before update: ", this.allUsers.utilisateurs[index]);
        this.allUsers.utilisateurs[index] = result.user;
        console.log("After update: ", this.allUsers.utilisateurs[index]);*/
        this.getAllUsers();
      }
    });

  }

}
