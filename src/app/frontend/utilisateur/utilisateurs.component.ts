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
import {isArray} from 'util';
import {ModalRemoveUtilisateurComponent} from './modal-remove-utilisateur.component';
import {Role} from '../../models/role/role';

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
  allRoles: Array<Role> = new Array<Role>();
  role: Role = null;
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
    this.searchUsers();
  }

  searchPseudo() {
    this.searchUsers();
  }

  searchStatut() {
    this.searchUsers();
  }

// ---------------------------------- START API REQUEST-----------------------------------------------------
  searchUsers() {
    let roleName = "";
    if(this.role !== null){
      roleName = this.role.roleName;
    }
    this.utilisateurService.searchUsers(this.username, roleName, this.enable, this.currentPage, this.size)
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
      this.allRoles = roles;
    });
  }

  // ---------------------------------- END API REQUEST-----------------------------------------------------

  searchPage(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  searchLimit(limit: number) {
    this.size = limit;
    this.searchUsers();
  }

  searchRole(event) {
    this.searchUsers();
  }

  hasRole(role: string) {
    return this.tokenService.hasRole(role);
  }

  nextPage(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  previousPage(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  firstPage(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  lastPage(page: number) {
    this.currentPage = page;
    this.searchUsers();
  }

  reload() {
    this.currentPage = 0;
    this.searchUsers();
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
      if (result.type === 'i') {
        /*this.allUsers.utilisateurs.unshift(result.user);
        this.allUsers.nombreUtilisateurs += 1;
        this.allUsers.totalUtilisateurs += 1;*/
        this.searchUsers();
      }
      if (result.type === 'u') {
        /*let index = this.allUsers.utilisateurs.findIndex((user) => result.user.id);
        console.log("Before update: ", this.allUsers.utilisateurs[index]);
        this.allUsers.utilisateurs[index] = result.user;
        console.log("After update: ", this.allUsers.utilisateurs[index]);*/
        this.searchUsers();
      }
    });

  }

  openRemoveModal(user: Utilisateur, type: string, index: number) {
    this.modalRef = this.modalService.show(ModalRemoveUtilisateurComponent, {class: 'modal-sm'});

    (<ModalRemoveUtilisateurComponent>this.modalRef.content).showRemoveModal(
      type,
      user
    );

    (<ModalRemoveUtilisateurComponent>this.modalRef.content).onClose.subscribe(result => {
      console.log(result);
      if (result.type === 'd') {
        this.allUsers.utilisateurs[index].enable = 0;
      }
      if (result.type === 'e') {
        this.allUsers.utilisateurs[index].enable = 1;
      }
      if (result.type === 'r') {
        /*this.allUsers.utilisateurs.splice(index, 1);*/
        this.searchUsers();
      }
    });

  }

}
