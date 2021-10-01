import { CriptografarSenhas } from './../../../core/functions/criptografar-senhas';
import { Validacoes } from './../../../core/functions/validacoes';
import { UsuarioInterface } from '../../../core/interfaces/usuarios.interface';
import { UsuariosService } from '../../../core/services/usuarios.service';
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
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.scss']
})
export class AlterarSenhaComponent implements OnInit {
  public formulario: FormGroup;
  public send: boolean = false;

  constructor
  (
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['', [Validators.required, Validators.maxLength(50), Validacoes.isEqualTo('senha')]],
    });
  }

  public salvar() {
    if(this.formulario.valid) {
      this.send = true;

      const token = localStorage.getItem('token');
      var usuarioLogado: any = jwt_decode(token);

      let senhaAtual = CriptografarSenhas.criptografarSenhas(this.formulario.get('senhaAtual').value);
      this.usuarioService.verificarSenhaAdmin(usuarioLogado.email, senhaAtual).subscribe((httpResponse: any) => {
        if(httpResponse.valido) {
          let usuario: UsuarioInterface = {
            senha: CriptografarSenhas.criptografarSenhas(this.formulario.get('senha').value),
          };

          this.usuarioService.alterarUsuarioOng(usuarioLogado.sub, usuario).subscribe(() => {
            this.toastr.success(`Senha alterada com sucesso!`);
            this.formulario.reset();
            this.send = false;
          },
          () => {
            this.toastr.error('Não foi possível alterar a senha');
            this.send = false;
          });
        }
        else {
          this.toastr.error('A senha atual não corresponde');
          this.send = false;
        }
      });
    } else {
      Object.keys(this.formulario.controls).forEach(item => {
        this.formulario.get(item).markAsTouched();
      });
    }
  }

  public verficaErro(input: string) {
    if(this.formulario.get(input).hasError && this.formulario.get(input).touched) {
      if(this.formulario.get(input).errors?.required) {
        return "required";
      }

      if(this.formulario.get(input).errors?.minlength) {
        return "min";
      }

      if(this.formulario.get(input).errors?.maxlength) {
        return "max";
      }

      if(this.formulario.get(input).errors?.email) {
        return "email";
      }

      if(this.formulario.get(input).errors?.pattern) {
        return "regex";
      }

      if(this.formulario.get(input).errors?.equalsTo) {
        return "senha";
      }

      if(this.formulario.get(input).errors?.jaExistente) {
        return "jaExistente";
      }
    }
  }
}
