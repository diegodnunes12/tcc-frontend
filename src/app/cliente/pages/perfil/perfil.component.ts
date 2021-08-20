import { UsuarioInterface } from './../../../core/interfaces/usuarios.interface';
import { UsuariosService } from './../../../core/services/usuarios.service';
import { OngsService } from '../../../core/services/ongs.service';
import { ToastrService } from 'ngx-toastr';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { EspeciesService } from '../../../core/services/especies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecieInterface } from 'src/app/core/interfaces/especie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { OngInterface } from 'src/app/core/interfaces/ong.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilUsuarioComponent implements OnInit {
  public formulario: FormGroup;

  constructor
  (
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      _id: [''],
      cpf: ['', [Validators.maxLength(20)]],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
    });

    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.usuarioService.getUsuariosSistemaPeloId(usuarioLogado.sub).subscribe((httpResponse) => {
        this.formulario.get('_id').setValue(httpResponse._id);
        this.formulario.get('cpf').setValue(httpResponse.cpf);
        this.formulario.get('nome').setValue(httpResponse.nome);
        this.formulario.get('telefone').setValue(httpResponse.telefone);
        this.formulario.get('email').setValue(httpResponse.email);
      });
    }
  }

  public salvar() {
    if(this.formulario.valid) {
      const usuariSistema: UsuarioInterface = {
        nome: this.formulario.get('nome').value,
        telefone: this.formulario.get('telefone').value,
        cpf: this.formulario.get('cpf').value
      }

      this.usuarioService.alterarUsuarioSistema(this.formulario.get('_id').value, usuariSistema).subscribe(() => {
        this.toastr.success('Informações alteradas com sucesso');
      },
      () => {
        this.toastr.error('Não foi possível alterar os dados');
      });
    }
  }
}
