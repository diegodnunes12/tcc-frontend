import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanLoad {

  constructor(private router: Router) { }

  canLoad() {
    const token = localStorage.getItem('token');
    if(!token) {
      this.router.navigate(['']);
      return false;
    }

    var usuario: any = jwt_decode(token);
    if(!usuario.ong) {
      this.router.navigate(['']);
      return false;
    }

    return true;
  }
}
