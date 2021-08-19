import { UsuarioInterface } from './../../../core/interfaces/usuarios.interface';
import { TipoUsuarioInterface } from './../../../core/interfaces/tipo-usuario.interface';
import { UsuariosService } from './../../../core/services/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { EspeciesService } from '../../../core/services/especies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecieInterface } from 'src/app/core/interfaces/especie.interface';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-cadastro-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.scss']
})
export class CadastroUsuarioComponent implements OnInit {
  public formulario: FormGroup;
  public tipoUsuarios$: Observable<TipoUsuarioInterface[]>

  constructor
  (
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.tipoUsuarios$ = this.usuariosService.getTiposUsuarios();

    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);

    this.formulario = this.fb.group({
      _id: [],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      cpf: ['', [Validators.maxLength(15)]],
      telefone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      senha: ['', [Validators.required, Validators.maxLength(50)]],
      tipoUsuario: ['', [Validators.required]],
      ong: [usuarioLogado.ong],
      data_cadastro: [new Date()],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      let usuarioId = params.get("usuarioId");
      if(usuarioId) {
        this.usuariosService.getUsuariosOngPeloId(usuarioId).subscribe(httpResponse => {
          this.formulario.get('_id').setValue(httpResponse._id);
          this.formulario.get('nome').setValue(httpResponse.nome);
          this.formulario.get('cpf').setValue(httpResponse.cpf);
          this.formulario.get('telefone').setValue(httpResponse.telefone);
          this.formulario.get('email').setValue(httpResponse.email);
          this.formulario.get('senha').setValue(httpResponse.senha);
          this.formulario.get('tipoUsuario').setValue(httpResponse.tipo_usuario._id);
        });
      }
    });
  }

  public salvar() {
    if(this.formulario.valid) {
      let usuario: UsuarioInterface = {
        nome: this.formulario.get('nome').value,
        cpf: this.formulario.get('cpf').value,
        email: this.formulario.get('email').value,
        senha: this.formulario.get('senha').value,
        telefone: this.formulario.get('telefone').value,
        tipo_usuario: this.formulario.get('tipoUsuario').value,
        ong: this.formulario.get('ong').value,
        data_cadastro: this.formulario.get('data_cadastro').value,
      };

      this.usuariosService.cadastrarUsuarioAdmin(usuario).subscribe((httpResponse) => {
        this.toastr.success(`Cadastro efetuado com sucesso!`);
        this.formulario.reset();
      },
      error => {
        this.toastr.error('Não foi possível realizar o cadastro');
      });

    }
  }
}
