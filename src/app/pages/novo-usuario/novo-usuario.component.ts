import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { CriptografarSenhas } from './../../core/functions/criptografar-senhas';
import { Validacoes } from './../../core/functions/validacoes';
import { UsuarioInterface } from './../../core/interfaces/usuarios.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.scss']
})
export class NovoUsuarioComponent implements OnInit {
  public form: FormGroup;
  public send: boolean = false;

  constructor
  (
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)], [this.validarEmail.bind(this)]],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['', [Validators.required, Validators.maxLength(50), Validacoes.isEqualTo('senha')]],
      telefone: ['', [Validators.maxLength(20)]]
    });
  }

  public cadastrar() {
    if(this.form.valid) {
      this.send = true;
      let usuario: UsuarioInterface = {
        nome: this.form.get('nome').value,
        email: this.form.get('email').value,
        senha: CriptografarSenhas.criptografarSenhas(this.form.get('senha').value),
        telefone: this.form.get('telefone').value,
        data_cadastro: new Date()
      };

      this.usuariosService.cadastrarUsuarioSistema(usuario).subscribe(() => {
        this.router.navigate(['']);
        this.toastr.success(`Cadastro efetuado com sucesso!`);
        this.send = false;
      },
      () => {
        this.toastr.error('Não foi possível realizar o cadastro');
        this.send = false;
      });
    } else {
      Object.keys(this.form.controls).forEach(item => {
        this.form.get(item).markAsTouched();
      });
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

      if(this.form.get(input).errors?.pattern) {
        return "regex";
      }

      if(this.form.get(input).errors?.equalsTo) {
        return "senha";
      }

      if(this.form.get(input).errors?.jaExistente) {
        return "jaExistente";
      }
    }
  }

  private validarEmail(formControl: FormControl) {
    return this.usuariosService.getUsuarioSistemaPorEmail(formControl.value).pipe(
      map( httpResponse =>  httpResponse ? {'jaExistente': true} : null )
    )
  }

}
