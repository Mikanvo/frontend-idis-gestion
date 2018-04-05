import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FacturesComponent} from './factures.component';

const routes: Routes = [
  {
    path: '',
    component: FacturesComponent,
    data: {
      title: 'Facture'
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class FactureRoutingModule {
}
