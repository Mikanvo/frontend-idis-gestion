import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ClientRoutingModule} from './client-routing.module';
import {ClientsComponent} from './clients.component';

@NgModule({
  imports: [
    ClientRoutingModule
  ],
  declarations: [ClientsComponent]
})
export class ClientModule { }
