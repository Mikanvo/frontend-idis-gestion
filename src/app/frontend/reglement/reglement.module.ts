import { NgModule } from '@angular/core';
import {ReglementRoutingModule} from './reglement-routing.module';
import {ReglementsComponent} from './reglements.component';
import {CommonModule} from '@angular/common';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LaddaModule} from 'angular2-ladda';
import {
  AlertModule, BsDatepickerModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule,
  TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {DataTableModule} from 'ng2-data-table';
import {TextMaskModule} from 'angular2-text-mask';
import {NgxQRCodeModule} from 'ngx-qrcode2';
import {ToastrModule} from 'ngx-toastr';
import {QRCodeModule} from 'angularx-qrcode';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {ColisService} from '../../services/colis/colis.service';
import {ReglementService} from '../../services/reglement/reglement.service';
import {TypeReglementService} from '../../services/type-reglement/type-reglement.service';
import {DeviseService} from '../../services/devise/devise.service';
import {UtilisateurService} from '../../services/utilisateur/utilisateur.service';
import {ModalRemoveReglementComponent} from './modal-remove-reglement.component';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { frLocale } from 'ngx-bootstrap/locale';
import {FactureService} from '../../services/facture/facture.service';
import {TvaService} from '../../services/tva/tva.service';
defineLocale('fr', frLocale);

@NgModule({
  imports: [
    CommonModule,
    ReglementRoutingModule,
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
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    QRCodeModule,
    NgxQRCodeModule,
    TextMaskModule,
    PaginationModule
  ],
  declarations: [
    ReglementsComponent,
    ModalRemoveReglementComponent
  ],
  entryComponents: [
    ModalRemoveReglementComponent
  ],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Aucune donnée trouvée'
      }
    },
    FactureService,
    ReglementService,
    TypeReglementService,
    TvaService,
    DeviseService,
    UtilisateurService
  ]
})
export class ReglementModule { }
