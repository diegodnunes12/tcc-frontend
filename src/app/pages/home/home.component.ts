import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioLoginInterface } from './../../core/interfaces/usuario-login.interface';
import { UsuariosService } from './../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public form: FormGroup;
  socialUser: SocialUser;
  isLoggedin: boolean;

  constructor
  (
    private usuariosSevice: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private socialAuthService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);
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

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => this.router.navigate(['adotar']));;
  }

}
