import { UsuarioInterface } from './../../../core/interfaces/usuarios.interface';
import { UsuariosService } from './../../../core/services/usuarios.service';
import { OngsService } from '../../../core/services/ongs.service';
import { ToastrService } from 'ngx-toastr';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { EspeciesService } from '../../../core/services/especies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecieInterface } from 'src/app/core/interfaces/especie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { OngInterface } from 'src/app/core/interfaces/ong.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  public formulario: FormGroup;
  public send: boolean = false;

  constructor
  (
    private fb: FormBuilder,
    private usuarioService: UsuariosService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      _id: [''],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
    });

    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.usuarioService.getUsuariosOngPeloId(usuarioLogado.sub).subscribe((httpResponse) => {
        this.formulario.get('_id').setValue(httpResponse._id);
        this.formulario.get('nome').setValue(httpResponse.nome);
        this.formulario.get('telefone').setValue(httpResponse.telefone);
        this.formulario.get('email').setValue(httpResponse.email);
      });
    }
  }

  public salvar() {
    if(this.formulario.valid) {
      this.send = true;
      const usuariOng: UsuarioInterface = {
        nome: this.formulario.get('nome').value,
        telefone: this.formulario.get('telefone').value,
      }

      this.usuarioService.alterarUsuarioOng(this.formulario.get('_id').value, usuariOng).subscribe(() => {
        this.toastr.success('Informações alteradas com sucesso');
        this.send = false;
      },
      () => {
        this.toastr.error('Não foi possível alterar os dados');
        this.send = false;
      });
    } else {
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
}
