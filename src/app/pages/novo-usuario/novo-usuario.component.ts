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
      nome: ['', [Validators.required, Validators.maxLength(50)]],
      cpf: ['', [Validators.required, Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]],
      telefone: ['', [Validators.required, Validators.maxLength(20)]]
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
        tipo_usuario: {
          _id: '6103211403c9373594f28687',
          nome: 'Usuário do Sistema'
        },
        data_cadastro: new Date()
      };

      this.usuariosSevice.cadastrar(usuario).subscribe((httpResponse) => {
        localStorage.setItem('usuario', httpResponse._id);
        this.router.navigate(['adotar']);
        this.toastr.success(`Bem vindo ${usuario.nome}`);
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
      });

    }
  }

}
