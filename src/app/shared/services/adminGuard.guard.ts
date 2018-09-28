import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this._authService.isAdmin()
      .then(res => {
        if (res)
          return true;
        else
          this.router.navigate(['/']);
      })
      .catch(() => false);
  }
}
