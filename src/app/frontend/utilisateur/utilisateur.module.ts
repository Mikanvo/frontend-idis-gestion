import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilisateursComponent} from './utilisateurs.component';
import {UtilisateurRoutingModule} from './utilisateur-routing.module';

@NgModule({
  imports: [
    UtilisateurRoutingModule
  ],
  declarations: [UtilisateursComponent]
})
export class UtilisateurModule { }
