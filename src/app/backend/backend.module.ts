import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationService} from '../services/auth/authentication.service';

// Alert Component
import { AlertModule } from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    AlertModule.forRoot(),
    ReactiveFormsModule
  ],
  declarations: [LoginComponent],
  providers: [AuthenticationService]
})
export class BackendModule { }
