import { Component, OnInit } from '@angular/core';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ListeUtilisateurs} from '../../models/utilisateur/liste-utilisateurs';
import {Utilisateur} from '../../models/utilisateur/utilisateur';
import {TokenService} from '../../services/token/token.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.scss']
})
export class UtilisateursComponent implements OnInit {
  allUsers: ListeUtilisateurs;
  username: string = "";
  enable: number = 2;
  currentPage: number = 0;
  size: number = 10;
  page: number = this.currentPage + 1;
  pages: Array<number>;
  constructor(
    private utilisateurService: UtilisateurService,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers(){
    this.utilisateurService.searchUsers(this.username, this.enable, this.currentPage, this.size)
      .subscribe((users) =>{
        console.log(users);
        this.allUsers = users;
        this.pages = new Array(users.totalPages);
      }, (err) =>{
        console.log(err);
      });
  }

  searchPage(page: number){
    console.log(page);
    if(page < 1) this.page = 1;
    this.currentPage = this.page - 1;
    this.getAllUsers();
  }

  searchLimit(limit: number){
    console.log(limit);
    if(limit < 10) this.size = 10;
    this.getAllUsers();
  }

  hasRole(role: string){
    return this.tokenService.hasRole(role);
  }

  gotoPage(index: number) {
    this.currentPage = index;
    this.getAllUsers();
  }

  nextPage() {
    if (this.currentPage < this.pages.length - 1) {
      this.currentPage += 1;
      this.getAllUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage -= 1;
      this.getAllUsers();
    }
  }

  firstPage() {
    this.currentPage = 0;
    this.getAllUsers();
  }

  lastPage() {
    this.currentPage = this.allUsers.totalPages - 1;
    this.getAllUsers();
  }

}
