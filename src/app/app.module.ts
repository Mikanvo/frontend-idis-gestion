import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';

// Import containers
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';

const APP_CONTAINERS = [
  FullLayoutComponent,
  SimpleLayoutComponent
]

// Import components
import {
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
} from './components';

const APP_COMPONENTS = [
  AppAsideComponent,
  AppBreadcrumbsComponent,
  AppFooterComponent,
  AppHeaderComponent,
  AppSidebarComponent,
  AppSidebarFooterComponent,
  AppSidebarFormComponent,
  AppSidebarHeaderComponent,
  AppSidebarMinimizerComponent,
  APP_SIDEBAR_NAV
]

// Import directives
import {
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
} from './directives';

const APP_DIRECTIVES = [
  AsideToggleDirective,
  NAV_DROPDOWN_DIRECTIVES,
  ReplaceDirective,
  SIDEBAR_TOGGLE_DIRECTIVES
];

// Import routing module
import {AppRoutingModule} from './app.routing';

// Import 3rd party components
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {BackendModule} from './backend/backend.module';
import {HttpClientModule} from '@angular/common/http';
import {JwtModule} from '@auth0/angular-jwt';
import {TokenService} from './services/token/token.service';
import {httpInterceptorProviders} from './http-interceptors';
import {AdminGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';
import {ClientGuard} from './guards/client.guard';
import {AdminOrUserGuard} from './guards/admin-or-user.guard';
import {AdminOrUserOrClientGuard} from './guards/admin-or-user-or-client.guard';
import {HandleErrorService} from './services/error/handle-error.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PaginationModule} from './components/pagination/pagination.module';
import {RoleGuard} from "./guards/role.guard";

export function tokenGetter() {
  return localStorage.getItem('jwt_token');
}

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:4200', '127.0.0.1:4200', 'http://127.0.0.1:4200']
      }
    }),
    ChartsModule,
    BackendModule,
    PaginationModule
  ],
  exports: [BrowserAnimationsModule],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    ...APP_DIRECTIVES,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    TokenService,
    httpInterceptorProviders,
    RoleGuard,
    AdminGuard,
    UserGuard,
    ClientGuard,
    AdminOrUserGuard,
    AdminOrUserOrClientGuard,
    HandleErrorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
