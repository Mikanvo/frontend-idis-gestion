import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeRoutingModule} from './employe-routing.module';
import {EmployesComponent} from './employes.component';
import {NG_SELECT_DEFAULT_CONFIG, NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LaddaModule} from 'angular2-ladda';
import {
  AlertModule, BsDropdownModule, CarouselModule, CollapseModule, ModalModule, PopoverModule, ProgressbarModule, TabsModule,
  TooltipModule
} from 'ngx-bootstrap';
import {DataTableModule} from 'ng2-data-table';
import {TextMaskModule} from 'angular2-text-mask';
import {ToastrModule} from 'ngx-toastr';
import {PaginationModule} from '../../components/pagination/pagination.module';
import {EmployeService} from '../../services/employe/employe.service';
import {SiteService} from '../../services/site/site.service';
import {ModalEmployeComponent} from './modal-employe.component';
import {ModalRemoveEmployeComponent} from './modal-remove-employe.component';
import {FonctionService} from '../../services/fonction/fonction.service';

@NgModule({
  imports: [
    CommonModule,
    EmployeRoutingModule,
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
    TextMaskModule,
    PaginationModule
  ],
  declarations: [
    EmployesComponent,
    ModalEmployeComponent,
    ModalRemoveEmployeComponent
  ],
  entryComponents: [
    ModalEmployeComponent,
    ModalRemoveEmployeComponent
  ],
  providers: [
    {
      provide: NG_SELECT_DEFAULT_CONFIG,
      useValue: {
        notFoundText: 'Aucun employé trouvé'
      }
    },
    EmployeService,
    SiteService,
    FonctionService
  ]
})
export class EmployeModule { }
