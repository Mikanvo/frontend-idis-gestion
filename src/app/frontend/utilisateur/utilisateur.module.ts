import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UtilisateursComponent} from './utilisateurs.component';
import {UtilisateurRoutingModule} from './utilisateur-routing.module';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {DataTableModule} from "ng2-data-table";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  AlertModule,
  BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {RoleService} from '../../services/role/role.service';
import {LaddaModule} from 'angular2-ladda';
import { ModalUtilisateurComponent } from './modal-utilisateur.component';
import {ToastrModule} from 'ngx-toastr';
import {ModalRemoveUtilisateurComponent} from './modal-remove-utilisateur.component';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
@NgModule({
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule ,
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
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    TooltipModule.forRoot(),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule
  ],
  declarations: [
    UtilisateursComponent,
    ModalUtilisateurComponent,
    ModalRemoveUtilisateurComponent],
  entryComponents: [ModalUtilisateurComponent, ModalRemoveUtilisateurComponent],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Aucun utilisateur trouvé'
      }
    },
    UtilisateurService,
    RoleService
  ]
})
export class UtilisateurModule { }
