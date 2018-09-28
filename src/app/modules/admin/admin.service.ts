import { Injectable } from '@angular/core';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Observable } from 'rxjs';

@Injectable()
export class AdminService {

  constructor(
    private _angularFireFunctions: AngularFireFunctions
  ) { }

  public setUserRole(data: any): Observable<any> {
    const callable = this._angularFireFunctions.httpsCallable('setUserRole');
    return callable(data);
  }
}
