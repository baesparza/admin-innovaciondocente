import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RoleService } from './role.service';


@Injectable()
export class AdminGuard implements CanActivate {

  constructor(private _roleService: RoleService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this._roleService.isAdmin)
      return true;

    this.router.navigate(['/']);
  }
}
