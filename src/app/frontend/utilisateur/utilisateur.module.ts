import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilisateursComponent} from './utilisateurs.component';
import {UtilisateurRoutingModule} from './utilisateur-routing.module';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {DataTableModule} from "ng2-data-table";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BsDropdownModule, CarouselModule, CollapseModule, PopoverModule, ProgressbarModule, TabsModule, TooltipModule} from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    BsDropdownModule.forRoot(),
    TabsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot()
  ],
  declarations: [UtilisateursComponent],
  providers: [UtilisateurService]
})
export class UtilisateurModule { }
