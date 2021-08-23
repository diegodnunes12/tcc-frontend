import { CriptografarSenhas } from './../../core/functions/criptografar-senhas';
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
  public socialUser: SocialUser;
  public isLoggedin: boolean;
  public send: boolean = false;

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
      if(this.socialUser !== null) {
        localStorage.setItem('token', this.socialUser.idToken);
      }
    });
  }

  public login(sistema: string) {
    if(this.form.valid) {
      this.send = true;
      let usuario: UsuarioLoginInterface = {
        email: this.form.get('email').value,
        senha: CriptografarSenhas.criptografarSenhas(this.form.get('senha').value)
      };

      if(sistema === 'admin') {
        this.usuariosSevice.loginAdmin(usuario).subscribe((httpResponse) => {
          localStorage.setItem('token', httpResponse.token);
          this.router.navigate(['admin']);
          this.send = false;
        },
        error => {
          this.toastr.error('Usuário ou senha inválido');
          this.send = false;
        });
      } else {
        this.usuariosSevice.loginSistema(usuario).subscribe((httpResponse) => {
          localStorage.setItem('token', httpResponse.token);
          this.router.navigate(['adotar']);
          this.send = false;
        },
        error => {
          this.toastr.error('Usuário ou senha inválido');
          this.send = false;
        });
      }
    } else {
      Object.keys(this.form.controls).forEach(item => {
        this.form.get(item).markAsTouched();
      });
    }
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(() => {
      this.router.navigate(['adotar'])
    });
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
    }
  }

}
