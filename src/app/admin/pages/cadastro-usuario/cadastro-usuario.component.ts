import { UsuarioInterface } from './../../../core/interfaces/usuarios.interface';
import { TipoUsuarioInterface } from './../../../core/interfaces/tipo-usuario.interface';
import { UsuariosService } from './../../../core/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  public formulario: FormGroup;
  public tipoUsuarios$: Observable<TipoUsuarioInterface[]>
  public send: boolean = false;
  public isEditing: boolean = false;

  constructor
  (
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.tipoUsuarios$ = this.usuariosService.getTiposUsuarios();

    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);

    this.formulario = this.fb.group({
      _id: [],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      tipoUsuario: ['', [Validators.required]],
      ong: [usuarioLogado.ong],
      data_cadastro: [new Date()],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      let usuarioId = params.get("usuarioId");
      if(usuarioId) {
        this.isEditing = true;
        this.usuariosService.getUsuariosOngPeloId(usuarioId).subscribe(httpResponse => {
          this.formulario.get('_id').setValue(httpResponse._id);
          this.formulario.get('nome').setValue(httpResponse.nome);
          this.formulario.get('telefone').setValue(httpResponse.telefone);
          this.formulario.get('email').setValue(httpResponse.email);
          this.formulario.get('senha').setValue(httpResponse.senha);
          this.formulario.get('tipoUsuario').setValue(httpResponse.tipo_usuario._id);
        });
      } else {
        this.formulario.get('email').setAsyncValidators(this.validarEmail.bind(this));
      }
    });
  }

  public salvar() {
    if(this.formulario.valid) {
      this.send = true;
      if(this.isEditing) {
        let usuario: UsuarioInterface = {
          nome: this.formulario.get('nome').value,
          telefone: this.formulario.get('telefone').value,
          tipo_usuario: this.formulario.get('tipoUsuario').value,
        };

        this.usuariosService.alterarUsuarioOng(this.formulario.get('_id').value, usuario).subscribe(() => {
          this.toastr.success(`Usuário alterado com sucesso!`);
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível alterar o usuário');
          this.send = false;
        });
      } else {
        let usuario: UsuarioInterface = {
          nome: this.formulario.get('nome').value,
          email: this.formulario.get('email').value,
          senha: this.formulario.get('senha').value,
          telefone: this.formulario.get('telefone').value,
          tipo_usuario: this.formulario.get('tipoUsuario').value,
          ong: this.formulario.get('ong').value,
          data_cadastro: this.formulario.get('data_cadastro').value,
        };

        this.usuariosService.cadastrarUsuarioAdmin(usuario).subscribe(() => {
          this.toastr.success(`Cadastro efetuado com sucesso!`);
          this.formulario.reset();
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível realizar o cadastro');
          this.send = false;
        });
      }
    }
    else {
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

  private validarEmail(formControl: FormControl) {
    return this.usuariosService.getUsuarioOngPorEmail(formControl.value).pipe(
      map( httpResponse =>  httpResponse ? {'jaExistente': true} : null )
    )
  }
}
