import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {LoginComponent} from './backend/login/login.component';
import {FullLayoutComponent} from './containers';
import {AdminGuard} from './guards/admin.guard';
import {AdminOrUserOrClientGuard} from './guards/admin-or-user-or-client.guard';
import {AdminOrUserGuard} from './guards/admin-or-user.guard';
import {ClientGuard} from './guards/client.guard';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Accueil'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './frontend/dashboard/dashboard.module#DashboardModule',
        canActivate:[AdminOrUserOrClientGuard]
      },
      {
        path: 'client',
        loadChildren: './frontend/client/client.module#ClientModule',
        canActivate:[AdminOrUserGuard]
      },
      {
        path: 'employe',
        loadChildren: './frontend/employe/employe.module#EmployeModule',
        canActivate:[AdminOrUserGuard]
      },
      {
        path: 'colis',
        loadChildren: './frontend/colis/colis.module#ColisModule',
        canActivate:[AdminOrUserGuard]
      },
      {
        path: 'colis-client',
        loadChildren: './frontend/colis-client/colis-client.module#ColisClientModule',
        canActivate:[ClientGuard]
      },
      {
        path: 'finances/facture',
        loadChildren: './frontend/facture/facture.module#FactureModule',
        canActivate:[AdminOrUserGuard]
      },
      {
        path: 'parametres/role',
        loadChildren: './frontend/role/role.module#RoleModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/utilisateur',
        loadChildren: './frontend/utilisateur/utilisateur.module#UtilisateurModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/site',
        loadChildren: './frontend/site/site.module#SiteModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/pays',
        loadChildren: './frontend/pays/pays.module#PaysModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/fonction',
        loadChildren: './frontend/fonction/fonction.module#FonctionModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/type-facture',
        loadChildren: './frontend/type-facture/type-facture.module#TypeFactureModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/type-reglement',
        loadChildren: './frontend/type-reglement/type-reglement.module#TypeReglementModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/devise',
        loadChildren: './frontend/devise/devise.module#DeviseModule',
        canActivate:[AdminGuard]
      },
      {
        path: 'parametres/tva',
        loadChildren: './frontend/tva/tva.module#TvaModule',
        canActivate:[AdminGuard]
      }

    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
