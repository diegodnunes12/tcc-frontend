import { CampanhasInterface } from './../../../core/interfaces/campanhas.interface';
import { CampanhasService } from './../../../core/services/campanhas.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-cadastro-campanha',
  templateUrl: './cadastro-campanha.component.html',
  styleUrls: ['./cadastro-campanha.component.scss']
})
export class CadastroCampanhaComponent implements OnInit {
  public formulario: FormGroup;
  public send: boolean = false;
  public isEditing: boolean = false;

  constructor
  (
    private fb: FormBuilder,
    private campanhasService: CampanhasService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);

    this.formulario = this.fb.group({
      _id: [],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      descricao: ['', [Validators.maxLength(500)]],
      valor: ['', [Validators.required]],
      chave_pix: ['', [Validators.required, Validators.maxLength(50)]],
      ativo: [true],
      ong: [usuarioLogado.ong]
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      let campanhaId = params.get("campanhaId");
      if(campanhaId) {
        this.isEditing = true;
        this.campanhasService.getById(campanhaId).subscribe(httpResponse => {
          this.formulario.get('_id').setValue(httpResponse._id);
          this.formulario.get('nome').setValue(httpResponse.nome);
          this.formulario.get('valor').setValue(httpResponse.valor);
          this.formulario.get('descricao').setValue(httpResponse.descricao);
          this.formulario.get('ativo').setValue(httpResponse.ativo);
          this.formulario.get('chave_pix').setValue(httpResponse.chave_pix);
          this.formulario.get('ong').setValue(httpResponse.ong);
        });
      }
    });
  }

  public salvar() {
    if(this.formulario.valid) {
      this.send = true;
      if(this.isEditing) {
        let campanha: CampanhasInterface = {
          nome: this.formulario.get('nome').value,
          valor: this.formulario.get('valor').value,
          descricao: this.formulario.get('descricao').value,
          ativo: this.formulario.get('ativo').value,
          chave_pix: this.formulario.get('chave_pix').value,
        };

        this.campanhasService.alterar(this.formulario.get('_id').value, campanha).subscribe(() => {
          this.toastr.success(`Campanha alterada com sucesso!`);
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível alterar a campanha');
          this.send = false;
        });
      } else {
        let campanha: CampanhasInterface = {
          nome: this.formulario.get('nome').value,
          valor: this.formulario.get('valor').value,
          descricao: this.formulario.get('descricao').value,
          ativo: this.formulario.get('ativo').value,
          chave_pix: this.formulario.get('chave_pix').value,
          ong: this.formulario.get('ong').value
        };

        this.campanhasService.cadastrar(campanha).subscribe(() => {
          this.toastr.success(`Cadastro efetuado com sucesso!`);
          this.formulario.reset();
          this.send = false;
        },
        () => {
          this.toastr.error('Não foi possível realizar o cadastro');
          this.send = false;
        });
      }
    }
    else {
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
