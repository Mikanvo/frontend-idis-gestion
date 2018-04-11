import {Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {CustomRole} from '../../models/role/custom-role';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {RoleService} from '../../services/role/role.service';
import {Role} from '../../models/role/role';
import {Subject} from 'rxjs/Subject';
import {RegisterForm} from '../../models/utilisateur/register-form';
import {PasswordValidator} from '../../directives/validators/password-validator';

@Component({
  selector: 'app-modal-utilisateur',
  templateUrl: './modal-utilisateur.component.html',
  styleUrls: ['./modal-utilisateur.component.scss']
})
export class ModalUtilisateurComponent implements OnInit {
  public user: RegisterForm = new RegisterForm();
  public type: string;
  userForm: FormGroup;
  allRoles: Array<CustomRole> = new Array<CustomRole>();
  formRoles: Array<CustomRole> = new Array<CustomRole>();
  public onClose: Subject<any>;

  isLoading: boolean = false;

  constructor(private utilisateurService: UtilisateurService,
              private roleService: RoleService,
              private fb: FormBuilder,
              public modalRef: BsModalRef,
              private toastr: ToastrService
  ) {

  }

  ngOnInit() {
    this.onClose = new Subject();
    this.getAllRoles();
    this.createForm();
  }

  public showUserModal(type: string, user: Utilisateur): void {
    this.type = type;

    if(user !== null){
      this.user.username =  user.username;
      this.user.roles =  user.roles;
      this.userForm.setValue({
        id: user.id || '',
        username: user.username || '',
        password: '',
        repassword: ''
      });
      if (user.roles) {
        this.user.roles.forEach((role) => {
          this.formRoles.push({
            'id': role.id,
            'text': role.roleName
          });
        });
        console.log(this.formRoles);
      }
    }

    let id = this.userForm.get('id');
    let username = this.userForm.get('username');
    let password = this.userForm.get('password');
    let repassword = this.userForm.get('repassword');

    (this.type) ? id.disable() : id.enable();
    ((this.type === 's') || (this.type === 'u')) ? username.disable() : username.enable();
    (this.type === 's') ? password.disable() : password.enable();
    (this.type === 's') ? repassword.disable() : repassword.enable();

  }

  createForm() {

    this.userForm = this.fb.group({
      id: new FormControl(''),
      username: new FormControl(this.user.username, [Validators.required, Validators.minLength(4)]),
      password: new FormControl(this.user.password, [Validators.required, Validators.minLength(4)]),
      repassword: new FormControl(this.user.repassword, [Validators.required]),
    }, {
      validator: PasswordValidator.matchPassword// your validation method
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

  public onCancel(): void {
    this.modalRef.hide();
  }

  enterPress(){
    if(this.type === "i"){
      this.saveUser();
    }
    if(this.type === "u"){
      this.updateUser();
    }
  }

  rolesValue(event) {
    this.formRoles = event;
  }

  showSave(msg: string) {
    this.toastr.success(msg, "Enregistrer", {
      closeButton: true,
      timeOut: 3000,
    });
  }
  showUpdate(msg: string) {
    this.toastr.warning(msg, "Modification", {
      closeButton: true,
      timeOut: 3000,
    });
  }

  saveUser() {
    this.isLoading = true;
    this.user.username = this.userForm.value.username;
    this.user.password = this.userForm.value.password;
    this.user.repassword = this.userForm.value.repassword;
    this.user.roles = new Array<Role>();
    if (this.formRoles.length > 0) {
      this.formRoles.forEach((role) => {
        this.user.roles.push({
          'id': role.id,
          'roleName': role.text,
          'createAt': null,
          'updateAt': null,
          'enable': 1
        })
      })
    }

    this.utilisateurService.addUser(this.user)
      .subscribe((user: Utilisateur) => {
        let data = {
          type: this.type,
          user: user
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showSave("Utilisateur enregistré avec succès");
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      });

  }

  updateUser() {
    this.isLoading = true;
    this.user.id = this.userForm.getRawValue().id;
    this.user.username = this.userForm.getRawValue().username;
    this.user.password = this.userForm.getRawValue().password;
    this.user.roles = new Array<Role>();
    if (this.formRoles.length > 0) {
      this.formRoles.forEach((role) => {
        this.user.roles.push({
          'id': role.id,
          'roleName': role.text,
          'createAt': null,
          'updateAt': null,
          'enable': 1
        })
      })
    }

    this.utilisateurService.updateUser(this.user)
      .subscribe((user: Utilisateur) => {
        let data = {
          type: this.type,
          user: user
        };
        this.isLoading = false;
        this.onClose.next(data);
        this.showUpdate("Utilisateur modifié");
        this.modalRef.hide();
      }, (err) => {
        console.log(err);
        this.isLoading = false;
      });

  }

}
