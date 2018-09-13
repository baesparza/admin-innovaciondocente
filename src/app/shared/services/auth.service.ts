import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: firebase.User = null;

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
    afAuth.authState.subscribe((auth) => {
      this.authState = auth;
      console.log(this.authState);
    });
  }

  /**
   * whether user is authenticated or not
   */
  public isAuthenticated(): boolean {
    return this.authState !== null;
  }

  /**
   * get all user with info
   */
  public get currentUser(): firebase.User {
    return this.isAuthenticated ? this.authState : null;
  }

  /**
   * get user unique id
   */
  public get currentUserId(): string {
    return this.isAuthenticated ? this.authState.uid : '';
  }

  /**
   * Login user
   * @param email of user
   * @param password of account
   */
  public signIn(email: string, password: string): Promise<void> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then(function () {
        this.router.navigate(['/']);
      })
      .catch(error => console.log(error));
  }

  /**
   * Sign out
   */
  public signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }

  /**
   * TODO: add docs
   */
  public get currentUserObservable(): any {
    return this.afAuth.authState;
  }
}
