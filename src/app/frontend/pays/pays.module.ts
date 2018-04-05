import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaysRoutingModule} from './pays-routing.module';
import {PaysComponent} from './pays.component';

@NgModule({
  imports: [
    PaysRoutingModule
  ],
  declarations: [PaysComponent]
})
export class PaysModule { }
