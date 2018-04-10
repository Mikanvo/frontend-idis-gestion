import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilisateursComponent} from './utilisateurs.component';
import {UtilisateurRoutingModule} from './utilisateur-routing.module';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {DataTableModule} from "ng2-data-table";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AlertModule,
  BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {SelectModule} from 'ng2-select';
import {RoleService} from '../../services/role/role.service';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {LaddaModule} from 'angular2-ladda';
import { NgxSelectModule } from 'ngx-select-ex';
import { ModalUtilisateurComponent } from './modal-utilisateur.component';
import {ToastrModule} from 'ngx-toastr';
@NgModule({
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SelectModule,
    NgxSelectModule,
    DataTableModule,
    LaddaModule.forRoot({
      style: "expand-left",
      spinnerSize: 40,
      spinnerColor: "white",
      spinnerLines: 12
    }),
    BsDropdownModule.forRoot(),
    TabsModule,
    ToastrModule.forRoot(), // ToastrModule added
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot()
  ],
  declarations: [
    UtilisateursComponent,
    PaginationComponent,
    ModalUtilisateurComponent],
  entryComponents: [ModalUtilisateurComponent],
  providers: [UtilisateurService, RoleService]
})
export class UtilisateurModule { }
