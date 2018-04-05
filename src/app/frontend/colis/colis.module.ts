import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ColisReceiveComponent} from './colis-receive.component';
import {ColisSendComponent} from './colis-send.component';
import {ColisRoutingModule} from './colis-routing.module';

@NgModule({
  imports: [
    ColisRoutingModule
  ],
  declarations: [
    ColisReceiveComponent,
    ColisSendComponent
  ]
})
export class ColisModule { }
