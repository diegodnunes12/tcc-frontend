import { UsuarioLoginInterface } from './../../core/interfaces/usuario-login.interface';
import { UsuariosService } from './../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  constructor(private usuariosSevice: UsuariosService) { }

  ngOnInit(): void {
  }

  public loginSistema() {
    let usuario: UsuarioLoginInterface = {
      email: 'mariabenedita@gmail.com',
      senha: 'jX990JkResIgsaA'
    };
    this.usuariosSevice.loginSistema(usuario).subscribe((a) => {
      console.log(a)
    },
    error => console.log(error))
  }

  public loginAdmin() {
    let usuario: UsuarioLoginInterface = {
      email: 'mariabenedita@gmail.com',
      senha: 'jX990JkResIgsaA'
    };
    this.usuariosSevice.loginAdmin(usuario).subscribe((a) => {
      console.log(a)
    },
    error => console.log(error))
  }

}
