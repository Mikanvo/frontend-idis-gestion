import { NgModule } from '@angular/core';
import {FactureRoutingModule} from './facture-routing.module';
import {FacturesComponent} from './factures.component';

@NgModule({
  imports: [
    FactureRoutingModule
  ],
  declarations: [FacturesComponent]
})
export class FactureModule { }
