import { Injectable } from '@angular/core';
import { Router } from "@angular/router";

import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: firebase.User = null;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router
  ) {
    afAuth.authState.subscribe((auth) => {
      this.user = auth;
    });
  }

  /**
   * whether user is authenticated or not
   */
  public isAuthenticated(): boolean {
    return this.user !== null;
  }

  /**
   * get user unique id
   */
  public get userId(): string {
    return this.isAuthenticated ? this.user.uid : '';
  }

  /**
   * Login user
   * @param email of user
   * @param password of account
   */
  public signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
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
  public get currentUserObservable(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  async getCustomClaims() {
    try {
      const idToken = await this.user.getIdTokenResult();
      return idToken.claims;
    } catch (error) {
      return null;
    }
  }

  async isAdmin(): Promise<boolean> {
    try {
      const claims = await this.getCustomClaims();
      if (claims === null)
        return false;

      return claims.role === "admin";
    } catch (error) {
      return false
    }
  }
}
