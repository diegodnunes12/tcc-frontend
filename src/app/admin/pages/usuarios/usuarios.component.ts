import { ModalConfirmaExclusaoComponent } from './../../../core/componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
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
    private bsModalService: BsModalService,
    private toastr: ToastrService,
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

  public cadastrar() {
    this.router.navigate(['admin', 'usuarios', 'novo']);
  }

  public editar(id: string) {
    this.router.navigate(['admin', 'usuarios', 'editar', id]);
  }

  public remover(id: string) {
    let modalRef: BsModalRef = this.bsModalService.show(ModalConfirmaExclusaoComponent, { class: "modal-dialog-centered" });

    modalRef.content.confirmed.subscribe((isConfirmed) => {
      if(isConfirmed) {
        const token = localStorage.getItem('token');
        var usuarioLogado: any = jwt_decode(token);
        this.usuariosService.deleteUsuarioOng(id).subscribe(httpResponse => {
          this.usuarios$ = this.usuariosService.getUsuariosOng(usuarioLogado.ong);
          this.toastr.success('Usuário excluído com sucesso');
        },
        error => {
          this.toastr.error('Não foi possível excluir o usuário');
        });
      }
    });
  }
}
