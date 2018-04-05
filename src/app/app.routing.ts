import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './backend/login/login.component';
import {FullLayoutComponent} from './containers';
import {AdminGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';
import {ClientGuard} from './guards/client.guard';
import {AdminOrUserOrClientGuard} from './guards/admin-or-user-or-client.guard';
import {AdminOrUserGuard} from './guards/admin-or-user.guard';

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
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
        path: 'facture',
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
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}