import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EmployeRoutingModule} from './employe-routing.module';
import {EmployesComponent} from './employes.component';

@NgModule({
  imports: [
    EmployeRoutingModule
  ],
  declarations: [EmployesComponent]
})
export class EmployeModule { }
