import { CidadesEstadosService, EstadosInterface, CidadesInterface } from './../../../core/services/cidades-estados.service';
import { OngsService } from './../../../core/services/ongs.service';
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
  selector: 'app-minha-ong',
  templateUrl: './minha-ong.component.html',
  styleUrls: ['./minha-ong.component.scss']
})
export class MinhaOngComponent implements OnInit {
  public formulario: FormGroup;
  public ong$: Observable<OngInterface>
  public send: boolean = false;
  public estados: EstadosInterface[];
  public cidades: CidadesInterface[];
  private file: File = null;
  public temImagem: boolean = false;
  public imagem: string;

  constructor
  (
    private fb: FormBuilder,
    private ongsService: OngsService,
    private animaisService: AnimaisService,
    private cidadesEstadosService: CidadesEstadosService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cidadesEstadosService.getEstados().subscribe(HttpResponse => this.estados = HttpResponse);

    this.formulario = this.fb.group({
      _id: [''],
      cnpj: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      facebook: ['', [Validators.maxLength(50)]],
      instagram: ['', Validators.maxLength(50)],
      cidade: ['', Validators.maxLength(100)],
      estado: ['', Validators.maxLength(20)],
      imagem: [],
    });

    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.ongsService.getOng(usuarioLogado.ong).subscribe((httpResponse) => {
        this.cidadesEstadosService.getCidades(httpResponse.estado).subscribe(HttpResponse => this.cidades = HttpResponse);
        this.formulario.get('_id').setValue(httpResponse._id);
        this.formulario.get('cnpj').setValue(httpResponse.cnpj);
        this.formulario.get('nome').setValue(httpResponse.nome);
        this.formulario.get('telefone').setValue(httpResponse.telefone);
        this.formulario.get('email').setValue(httpResponse.email);
        this.formulario.get('facebook').setValue(httpResponse.facebook);
        this.formulario.get('instagram').setValue(httpResponse.instagram);
        this.formulario.get('cidade').setValue(httpResponse.cidade);
        this.formulario.get('estado').setValue(httpResponse.estado);

        if(httpResponse.imagem !== null && httpResponse.imagem !== undefined) {
          this.temImagem = true;
          this.imagem = httpResponse.imagem;
        }
      });
    }
  }

  public selectEstado() {
    this.cidadesEstadosService.getCidades(this.formulario.get('estado').value).subscribe(httpResponse => this.cidades = httpResponse);
  }

  public salvar() {
    if(this.formulario.valid) {
      const formData: FormData = new FormData();
      formData.append('nome', this.formulario.get('nome').value);
      formData.append('telefone', this.formulario.get('telefone').value);
      formData.append('email', this.formulario.get('email').value);
      formData.append('facebook', this.formulario.get('facebook').value);
      formData.append('instagram', this.formulario.get('instagram').value);
      formData.append('cidade', this.formulario.get('cidade').value);
      formData.append('estado', this.formulario.get('estado').value);

      if(this.file) {
        formData.append('imagem', this.file, this.file.name);
      }
      const ong: OngInterface = {
        nome: this.formulario.get('nome').value,
        telefone: this.formulario.get('telefone').value,
        email: this.formulario.get('email').value,
        facebook: this.formulario.get('facebook').value,
        instagram: this.formulario.get('instagram').value,
        cidade: this.formulario.get('cidade').value,
        estado: this.formulario.get('estado').value,
      }

      this.ongsService.alterarOng(this.formulario.get('_id').value, formData).subscribe(httpResponse => {
        this.toastr.success('Informa????es alteradas com sucesso');
      },
      error => {
        this.toastr.error('N??o foi poss??vel alterar os dados da ong');
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

  public upload($event) {
    this.file = $event.target.files[0];
  }

  public alterarImagem() {
    this.temImagem = false;
  }
}
