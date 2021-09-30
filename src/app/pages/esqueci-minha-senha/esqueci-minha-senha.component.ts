
import { FormControl } from '@angular/forms';
import { CriptografarSenhas } from '../../core/functions/criptografar-senhas';
import { Validacoes } from '../../core/functions/validacoes';
import { UsuarioInterface } from '../../core/interfaces/usuarios.interface';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from '../../core/services/usuarios.service';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-esqueci-minha-senha',
  templateUrl: './esqueci-minha-senha.component.html',
  styleUrls: ['./esqueci-minha-senha.component.scss']
})
export class EsqueciMinhaSenhaComponent implements OnInit {
  public form: FormGroup;
  public send: boolean = false;
  public isAdmin: boolean = false;

  constructor
  (
    private usuariosService: UsuariosService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(params => {
        if(params.conta === "admin") {
          this.isAdmin = true;
        }
      }
    );
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]]
    });
  }

  public enviarEmail() {
    if(this.form.valid) {
      this.send = true;

      if(this.isAdmin) {
        this.usuariosService.enviarEmailUsuarioAdmin(this.form.get('email').value).subscribe(() => {
          this.toastr.success(`Recuperação de senha. Verifique seu e-mail`);
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível enviar o e-mail');
          this.send = false;
        });
      } else {
        this.usuariosService.enviarEmailUsuario(this.form.get('email').value).subscribe(() => {
          this.toastr.success(`Recuperação de senha. Verifique seu e-mail`);
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível enviar o e-mail');
          this.send = false;
        });
      }


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
