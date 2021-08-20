import { Validacoes } from './../../core/functions/validacoes';
import { UsuarioInterface } from './../../core/interfaces/usuarios.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioLoginInterface } from '../../core/interfaces/usuario-login.interface';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent implements OnInit {

  public form: FormGroup;

  constructor
  (
    private usuariosSevice: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cpf: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['', [Validators.required, Validators.maxLength(50), Validacoes.isEqualTo('senha')]],
      telefone: ['', [Validators.maxLength(20)]]
    });
  }

  public cadastrar() {
    if(this.form.valid) {
      let usuario: UsuarioInterface = {
        nome: this.form.get('nome').value,
        cpf: this.form.get('cpf').value,
        email: this.form.get('email').value,
        senha: this.form.get('senha').value,
        telefone: this.form.get('telefone').value,
        data_cadastro: new Date()
      };

      this.usuariosSevice.cadastrarUsuarioSistema(usuario).subscribe((httpResponse) => {
        this.router.navigate(['']);
        this.toastr.success(`Cadastro efetuado com sucesso!`);
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
      });
    }else {
      console.log(this.form)
      Object.keys(this.form.controls).forEach(item => {
        this.form.get(item).markAsTouched();
      })
    }
  }

  public verficaErro(input: string) {
    if(this.form.get(input).hasError && this.form.get(input).touched) {
      if(this.form.get(input).errors?.required) {
        return "required";
      }

      if(this.form.get(input).errors?.minlength) {
        return "min";
      }

      if(this.form.get(input).errors?.maxlength) {
        return "max";
      }

      if(this.form.get(input).errors?.email) {
        return "email";
      }

      if(this.form.get(input).errors?.equalsTo) {
        return "senha";
      }

    }
  }

}
