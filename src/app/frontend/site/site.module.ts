import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SiteRoutingModule} from './site-routing.module';
import {SitesComponent} from './sites.component';

@NgModule({
  imports: [
    SiteRoutingModule
  ],
  declarations: [SitesComponent]
})
export class SiteModule { }
