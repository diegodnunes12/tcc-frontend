import { Observable } from 'rxjs';
import { CidadesEstadosService, EstadosInterface, CidadesInterface } from './../../core/services/cidades-estados.service';
import { OngsService } from './../../core/services/ongs.service';
import { OngInterface } from './../../core/interfaces/ong.interface';
import { UsuarioInterface } from '../../core/interfaces/usuarios.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuarioLoginInterface } from '../../core/interfaces/usuario-login.interface';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-nova-ong',
  templateUrl: './nova-ong.component.html',
  styleUrls: ['./nova-ong.component.scss']
})
export class NovaOngComponent implements OnInit {
  public estados: EstadosInterface[];
  public cidades: CidadesInterface[];
  public form: FormGroup;
  public formUsuario: FormGroup;
  public cadastrarOng: boolean = true;
  public cadastrarUsuario: boolean = false;
  private ong: string;

  constructor
  (
    private usuariosSevice: UsuariosService,
    private ongsService: OngsService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private cidadesEstadosService: CidadesEstadosService
  ) { }

  ngOnInit(): void {

    this.cidadesEstadosService.getEstados().subscribe(HttpResponse => this.estados = HttpResponse);

    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cnpj: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/[0-9]{15}/)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      telefone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/[0-9]{10-11}/)]],
      facebook: ['', [Validators.maxLength(50)]],
      instagram: ['', [Validators.maxLength(50)]],
      cidade: ['', [Validators.required, Validators.maxLength(100)]],
      estado: ['', [Validators.required, Validators.maxLength(20)]],
    });

    this.formUsuario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      telefone: ['', [Validators.maxLength(20)]]
    });
  }

  public selectEstado() {
    this.cidadesEstadosService.getCidades(this.form.get('estado').value).subscribe(httpResponse => this.cidades = httpResponse);
  }

  public cadastrar() {
    if(this.form.valid) {
      let ong: OngInterface = {
        nome: this.form.get('nome').value,
        cnpj: this.form.get('cnpj').value,
        email: this.form.get('email').value,
        telefone: this.form.get('telefone').value,
        facebook: this.form.get('facebook').value,
        instagram: this.form.get('instagram').value,
        cidade: this.form.get('cidade').value,
        estado: this.form.get('estado').value,
        data_cadastro: new Date()
      };

      this.ongsService.cadastrar(ong).subscribe((httpResponse) => {
        this.cadastrarOng = false;
        this.cadastrarUsuario = true;
        this.ong = httpResponse._id;
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
      });
    } else {
      Object.keys(this.form.controls).forEach(item => {
        this.form.get(item).markAsTouched();
      });
    }
  }

  public cadastrarUsuarioAdminsitrador() {
    if(this.formUsuario.valid) {
      let usuario: UsuarioInterface = {
        nome: this.formUsuario.get('nome').value,
        cpf: this.formUsuario.get('cpf').value,
        email: this.formUsuario.get('email').value,
        senha: this.formUsuario.get('senha').value,
        telefone: this.formUsuario.get('telefone').value,
        tipo_usuario: {
          _id: '610320bf03c9373594f28683',
          nome: 'Administrador'
        },
        ong: this.ong,
        data_cadastro: new Date()
      };

      this.usuariosSevice.cadastrarUsuarioAdmin(usuario).subscribe((httpResponse) => {
        this.router.navigate(['']);
        this.toastr.success(`Cadastro efetuado com sucesso!`);
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
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
    /* return this.usuariosService.getUsuarioSistemaPorEmail(formControl.value).pipe(
      map( httpResponse =>  httpResponse ? {'jaExistente': true} : null )
    ) */
  }

}
