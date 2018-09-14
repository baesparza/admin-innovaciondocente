import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthService } from "src/app/shared/services/auth.service";
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'id-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  hide: boolean = true;
  isLoading: boolean = false;
  isSignedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit() {
    // get user if already signed in
    this.auth.currentUserObservable.subscribe(user => {
      this.isSignedIn = user !== null;
    });

    // init form
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

  get email() {
    return this.authForm.get('email');
  }
  get password() {
    return this.authForm.get('password');
  }


  /**
   * Sign user in, or show sign in error
   */
  signIn(): void {
    if (this.authForm.invalid)
      return;
    // only valid forms will be submitted
    this.isLoading = true;
    this.auth.signIn(this.email.value, this.password.value)
      // if user is valid navigate to home page
      .then(() => this.router.navigate(['/']))
      // if error show error messages
      .catch(e => {
        this.isLoading = false;
        if (e.code === 'auth/wrong-password')
          this.triggerSnackBar('Contraseña Incorrecta');
        else if (e.code === 'auth/invalid-email')
          this.triggerSnackBar('Correo Electronico Invalido');
        else if (e.code === 'auth/user-not-found')
          this.triggerSnackBar('No se encontró el usuario');
        else
          this.triggerSnackBar(e.code);
      });
  }

  /**
   * Template for snackBar
   * @param message to be show
   * @param action to be clicked
   */
  private triggerSnackBar(message: string, action?: string): void {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  /**
   * Navigate user if already signed in
   */
  gotoHome(): void {
    this.router.navigate(['/']);
  }

}
