import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import { AlertConfig } from 'ngx-bootstrap/alert';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Utilisateur} from '../../models/utilisateur';

export function getAlertConfig(): AlertConfig {
  return Object.assign(new AlertConfig(), { type: 'success' });
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{ provide: AlertConfig, useFactory: getAlertConfig }]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  alert: any = {
    type: "danger",
    dismissible: true
  };
  error: string = "";

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    let username = this.loginForm.value.username;
    let password = this.loginForm.value.password;

    this.auth.login(username, password).subscribe(
      (response) => {
        this.router.navigate(['dashboard']);
      },
      (error) =>{
        console.log(JSON.stringify(error));
        this.error = "erreur";
      });
  }

  createForm() {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  dismiss(){
    this.error = "";
  }
}
