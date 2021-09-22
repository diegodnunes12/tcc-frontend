import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdminService implements CanActivate {

  constructor(private router: Router) { }

  canActivate() {
    const token = localStorage.getItem('token');

    var usuario: any = jwt_decode(token);
    if(usuario.tipo === "Administrador") {
      return true;
    }

    this.router.navigate(['/admin']);
    return false;
  }
}
