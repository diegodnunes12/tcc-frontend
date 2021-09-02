import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header-adotar',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderAdotarComponent implements OnInit {
  public iniciaisUsuario: string;
  public avatar: string;
  public hasPicture: boolean = false;

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
    if(usuarioLogado.iss && usuarioLogado.iss === "accounts.google.com" && usuarioLogado.picture) {
      this.avatar = usuarioLogado.picture;
      this.hasPicture = true;
    }
  }

  public sair() {
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
