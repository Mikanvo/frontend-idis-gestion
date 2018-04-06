import { NgModule } from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ChartsModule} from 'ng2-charts';
import {BsDropdownModule, ButtonsModule} from 'ngx-bootstrap';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
