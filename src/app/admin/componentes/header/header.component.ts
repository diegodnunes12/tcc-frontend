import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header-admin',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponentAdmin implements OnInit {
  public iniciaisUsuario: string;

  constructor(private router: Router) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);
    const nomeSplit = usuarioLogado.name.split(" ");
    let iniciais = nomeSplit[0].slice(0, 2);

    if (nomeSplit.length >= 2) {
      iniciais = nomeSplit.shift().charAt(0) + nomeSplit.pop().charAt(0);
    }
    this.iniciaisUsuario = iniciais.toUpperCase();
  }

  get isAdministrador() {
    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);

    if(usuarioLogado.tipo === "Administrador") {
      return true;
    }

    return false;
  }

  public sair() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['']);
  }
}
