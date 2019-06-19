import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './backend/login/login.component';
import {FullLayoutComponent} from './containers';
import {RoleGuard} from "./guards/role.guard";

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
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER', 'CLIENT']}
      },
      {
        path: 'client',
        loadChildren: './frontend/client/client.module#ClientModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'employe',
        loadChildren: './frontend/employe/employe.module#EmployeModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'colis',
        loadChildren: './frontend/colis/colis.module#ColisModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'colis-client',
        loadChildren: './frontend/colis-client/colis-client.module#ColisClientModule',
        canActivate:[RoleGuard],
        data: {roles: ['CLIENT']}
      },
      {
        path: 'finances/facture',
        loadChildren: './frontend/facture/facture.module#FactureModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'finances/reglement',
        loadChildren: './frontend/reglement/reglement.module#ReglementModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/role',
        loadChildren: './frontend/role/role.module#RoleModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/utilisateur',
        loadChildren: './frontend/utilisateur/utilisateur.module#UtilisateurModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/site',
        loadChildren: './frontend/site/site.module#SiteModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/pays',
        loadChildren: './frontend/pays/pays.module#PaysModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/fonction',
        loadChildren: './frontend/fonction/fonction.module#FonctionModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/type-facture',
        loadChildren: './frontend/type-facture/type-facture.module#TypeFactureModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/type-reglement',
        loadChildren: './frontend/type-reglement/type-reglement.module#TypeReglementModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/devise',
        loadChildren: './frontend/devise/devise.module#DeviseModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      },
      {
        path: 'parametres/tva',
        loadChildren: './frontend/tva/tva.module#TvaModule',
        canActivate:[RoleGuard],
        data: {roles: ['ADMIN', 'USER']}
      }

    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
