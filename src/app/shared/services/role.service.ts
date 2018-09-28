import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  public role;

  constructor(
    public _authService: AuthService
  ) {
    console.log('created')
    this.setRole();
  }

  async setRole(): Promise<string> {
    try {
      const claims = await this._authService.getCustomClaims();
      if (claims === null)
        return;
      this.role = claims.role;
    } catch (error) { }
  }

  get isAdmin(): boolean { return this.role === "admin"; }
  get isModerator(): boolean { return this.role === "moderator"; }
  get isEditor(): boolean { return this.role === "editor"; }

  get canEdit(): boolean { return this.isAdmin || this.isModerator || this.isEditor; }
  get canCreate(): boolean { return this.isAdmin || this.isModerator; }
  get canDelete(): boolean { return this.isAdmin || this.isModerator; }
}
