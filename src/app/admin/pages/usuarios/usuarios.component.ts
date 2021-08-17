import { UsuarioInterface } from './../../../core/interfaces/usuarios.interface';
import { UsuariosService } from './../../../core/services/usuarios.service';
import { MensagensService } from '../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public usuarios$: Observable<UsuarioInterface[]>;

  constructor
  (
    private usuariosService: UsuariosService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.usuarios$ = this.usuariosService.getUsuariosOng(usuarioLogado.ong);
    }
  }
}
