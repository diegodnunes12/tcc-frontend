import { ToastrService } from 'ngx-toastr';
import { AnimaisService } from './../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { EspeciesService } from './../../../core/services/especies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecieInterface } from 'src/app/core/interfaces/especie.interface';
import { ActivatedRoute } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-cadastro-animal',
  templateUrl: './cadastro-animal.component.html',
  styleUrls: ['./cadastro-animal.component.scss']
})
export class CadastroAnimalComponent implements OnInit {
  public formulario: FormGroup;
  public especies$: Observable<EspecieInterface[]>
  private file: File = null;
  public temImagem: boolean = false;
  public imagem: string;

  constructor
  (
    private fb: FormBuilder,
    private especiesService: EspeciesService,
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.especies$ = this.especiesService.getAll();

    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);

    this.formulario = this.fb.group({
      _id: [],
      imagem: [],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pelagem: ['', [Validators.maxLength(20)]],
      sexo: ['', [Validators.required]],
      raca: ['', [Validators.maxLength(30)]],
      idade: ['', Validators.maxLength(10)],
      historia: ['', Validators.maxLength(500)],
      vacinado: [false],
      castrado: [false],
      vermifugado: [false],
      ong: [usuarioLogado.ong],
      especie: ['', Validators.required],
      porte: ['', Validators.required],
      data_cadastro: [new Date()],
    });

    this.activatedRoute.paramMap.subscribe((params) => {
      let animalId = params.get("animalId");
      if(animalId) {
        this.animaisService.getById(animalId).subscribe(httpResponse => {
          this.formulario.get('_id').setValue(httpResponse._id);
          this.formulario.get('nome').setValue(httpResponse.nome);
          this.formulario.get('pelagem').setValue(httpResponse.pelagem);
          this.formulario.get('sexo').setValue(httpResponse.sexo);
          this.formulario.get('raca').setValue(httpResponse.raca);
          this.formulario.get('idade').setValue(httpResponse.idade);
          this.formulario.get('ong').setValue(httpResponse.ong);
          this.formulario.get('historia').setValue(httpResponse.historia);
          this.formulario.get('vacinado').setValue(httpResponse.vacinado);
          this.formulario.get('castrado').setValue(httpResponse.castrado);
          this.formulario.get('vermifugado').setValue(httpResponse.vermifugado);
          this.formulario.get('especie').setValue(httpResponse.especie._id);
          this.formulario.get('porte').setValue(httpResponse.porte._id);

          if(httpResponse.imagem !== null && httpResponse.imagem !== undefined) {
            this.temImagem = true;
            this.imagem = httpResponse.imagem;
          }
        });
      }
    });
  }

  public upload($event) {
    this.file = $event.target.files[0];
  }

  public alterarImagem() {
    this.temImagem = false;
  }

  public salvar() {
    if(this.formulario.valid) {
      const formData: FormData = new FormData();
      formData.append('nome', this.formulario.get('nome').value);
      formData.append('pelagem', this.formulario.get('pelagem').value);
      formData.append('sexo', this.formulario.get('sexo').value);
      formData.append('raca', this.formulario.get('raca').value);
      formData.append('idade', this.formulario.get('idade').value);
      formData.append('historia', this.formulario.get('historia').value);
      formData.append('vacinado', this.formulario.get('vacinado').value);
      formData.append('castrado', this.formulario.get('castrado').value);
      formData.append('vermifugado', this.formulario.get('vermifugado').value);
      formData.append('especie', this.formulario.get('especie').value);
      formData.append('porte', this.formulario.get('porte').value);

      if(this.file) {
        formData.append('imagem', this.file, this.file.name);
      }

      let animalId = this.formulario.get('_id').value;
      if(animalId !== null && animalId !== '' ) {
        this.animaisService.alterar(formData, animalId).subscribe(() => {
          this.toastr.success('Animal alterado com sucesso');
        },
        error => {
          this.toastr.error('Não foi possível alterar o animal');
        });
      }else {
        const token = localStorage.getItem('token');
        var usuarioLogado: any = jwt_decode(token);
        formData.append('ong', usuarioLogado.ong);
        formData.append('data_cadastro', new Date().toString());

        this.animaisService.cadastrar(formData).subscribe(() => {
          this.formulario.reset();
          this.toastr.success('Animal cadastrado com sucesso');
        },
        error => {
          this.toastr.error('Não foi possível cadastrar o animal');
        });
      }
    } else {
      Object.keys(this.formulario.controls).forEach(field => {
        this.formulario.get(field).markAsTouched();
      });
    }
  }
}
