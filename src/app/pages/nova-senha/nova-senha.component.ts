
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
  selector: 'app-nova-senha',
  templateUrl: './nova-senha.component.html',
  styleUrls: ['./nova-senha.component.scss']
})
export class NovaSenhaComponent implements OnInit {
  public form: FormGroup;
  public send: boolean = false;
  private isAdmin: boolean = false;
  private id: string;

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
        this.id = params.id;
      }
    );
    this.form = this.fb.group({
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      confirmaSenha: ['', [Validators.required, Validators.maxLength(50), Validacoes.isEqualTo('senha')]],
    });
  }

  public alterarSenha() {
    if(this.form.valid) {
      this.send = true;
      let usuario: UsuarioInterface = {
        senha: CriptografarSenhas.criptografarSenhas(this.form.get('senha').value),
      };

      if(this.isAdmin) {
        this.usuariosService.alterarUsuarioOng(this.id, usuario).subscribe(() => {
          this.router.navigate(['']);
          this.toastr.success(`Senha alterada com sucesso!`);
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível alterar a senha');
          this.send = false;
        });
      }
      else {
        this.usuariosService.alterarUsuarioSistema(this.id, usuario).subscribe(() => {
          this.router.navigate(['']);
          this.toastr.success(`Senha alterada com sucesso!`);
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível alterar a senha');
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

}
