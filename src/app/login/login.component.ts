import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthService } from "src/app/shared/services/auth.service";

@Component({
  selector: 'id-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  hide: boolean = true;

  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit() {
    this.authForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  signIn(): void {
    this.auth.signIn(this.email.value, this.password.value);
  }

  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }

}
