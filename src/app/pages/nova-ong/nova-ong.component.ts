import { OngsService } from './../../core/services/ongs.service';
import { OngInterface } from './../../core/interfaces/ong.interface';
import { UsuarioInterface } from '../../core/interfaces/usuarios.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioLoginInterface } from '../../core/interfaces/usuario-login.interface';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nova-ong',
  templateUrl: './nova-ong.component.html',
  styleUrls: ['./nova-ong.component.scss']
})
export class NovaOngComponent implements OnInit {

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cnpj: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      telefone: ['', [Validators.required, Validators.maxLength(20)]],
      facebook: ['', [Validators.maxLength(50)]],
      instagram: ['', [Validators.maxLength(50)]],
      endereco: ['', [Validators.required, Validators.maxLength(100)]],
    });

    this.formUsuario = this.fb.group({
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.maxLength(20)]]
    });
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
        endereco: this.form.get('endereco').value,
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

      this.usuariosSevice.cadastrar(usuario).subscribe((httpResponse) => {
        localStorage.setItem('usuario', httpResponse._id);
        this.router.navigate(['admin']);
        this.toastr.success(`Bem vindo ${usuario.nome}`);
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
      });

    }
  }

}
