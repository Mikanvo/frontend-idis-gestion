import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleRoutingModule} from './role-routing.module';
import {RolesComponent} from './roles.component';

@NgModule({
  imports: [
    RoleRoutingModule
  ],
  declarations: [RolesComponent]
})
export class RoleModule { }
