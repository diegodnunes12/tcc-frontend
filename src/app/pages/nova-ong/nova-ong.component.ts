import { CriptografarSenhas } from './../../core/functions/criptografar-senhas';
import { Validacoes } from './../../core/functions/validacoes';
import { CidadesEstadosService, EstadosInterface, CidadesInterface } from './../../core/services/cidades-estados.service';
import { OngsService } from './../../core/services/ongs.service';
import { OngInterface } from './../../core/interfaces/ong.interface';
import { UsuarioInterface } from '../../core/interfaces/usuarios.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

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
  public send: boolean = false;

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
      cnpj: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/[0-9]{14}/)], [this.validarCnpj.bind(this)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      telefone: ['', [Validators.required, Validators.maxLength(20), Validators.pattern(/[0-9]{10,11}/)]],
      facebook: ['', [Validators.maxLength(50)]],
      instagram: ['', [Validators.maxLength(50)]],
      cidade: ['', [Validators.required, Validators.maxLength(100)]],
      estado: ['', [Validators.required, Validators.maxLength(20)]],
    });

    this.formUsuario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email], [this.validarEmail.bind(this)]],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['', [Validators.required, Validators.maxLength(50), Validacoes.isEqualTo('senha')]],
      telefone: ['', [Validators.maxLength(20), Validators.pattern(/[0-9]{10,11}/)]]
    });
  }

  public selectEstado() {
    this.cidadesEstadosService.getCidades(this.form.get('estado').value).subscribe(httpResponse => this.cidades = httpResponse);
  }

  public cadastrar() {
    console.log(this.form)
    if(this.form.valid) {
      this.send = true;
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
        this.send = false;
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
        this.send = false;
      });
    } else {
      Object.keys(this.form.controls).forEach(item => {
        this.form.get(item).markAsTouched();
      });
    }
  }

  public cadastrarUsuarioAdminsitrador() {
    if(this.formUsuario.valid) {
      this.send = true;
      let usuario: UsuarioInterface = {
        nome: this.formUsuario.get('nome').value,
        email: this.formUsuario.get('email').value,
        senha: CriptografarSenhas.criptografarSenhas(this.formUsuario.get('senha').value),
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
        this.send = false;
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
        this.send = false;
      });
    } else {
      Object.keys(this.formUsuario.controls).forEach(item => {
        this.formUsuario.get(item).markAsTouched();
      });
    }
  }

  public verficaErro(form: FormGroup, input: string) {
    if(form.get(input).hasError && form.get(input).touched) {
      if(form.get(input).errors?.required) {
        return "required";
      }

      if(form.get(input).errors?.minlength) {
        return "min";
      }

      if(form.get(input).errors?.maxlength) {
        return "max";
      }

      if(form.get(input).errors?.email) {
        return "email";
      }

      if(form.get(input).errors?.pattern) {
        return "regex";
      }

      if(form.get(input).errors?.equalsTo) {
        return "senha";
      }

      if(form.get(input).errors?.jaExistente) {
        return "jaExistente";
      }
    }
  }

  private validarEmail(formControl: FormControl) {
    return this.usuariosSevice.getUsuarioOngPorEmail(formControl.value).pipe(
      map( httpResponse =>  httpResponse ? {'jaExistente': true} : null )
    );
  }

  private validarCnpj(formControl: FormControl) {
    return this.ongsService.getOngPorCnpj(formControl.value).pipe(
      map( httpResponse =>  httpResponse ? {'jaExistente': true} : null )
    );
  }
}
