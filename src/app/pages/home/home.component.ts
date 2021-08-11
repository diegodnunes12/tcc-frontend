import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioLoginInterface } from './../../core/interfaces/usuario-login.interface';
import { UsuariosService } from './../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  public login(sistema: string) {
    if(this.form.valid) {
      let usuario: UsuarioLoginInterface = {
        email: this.form.get('email').value,
        senha: this.form.get('senha').value
      };

      if(sistema === 'admin') {
        this.usuariosSevice.loginAdmin(usuario).subscribe((httpResponse) => {
          console.log(httpResponse)
          localStorage.setItem('token', httpResponse.token);
          this.router.navigate(['admin'])
        },
        error => {
          this.toastr.error('Usuário ou senha inválido');
        });
      } else {
        this.usuariosSevice.loginSistema(usuario).subscribe((httpResponse) => {
          localStorage.setItem('usuario', httpResponse._id);
          this.router.navigate(['adotar']);
        },
        error => {
          this.toastr.error('Usuário ou senha inválido');
        });
      }

    }
  }

}
