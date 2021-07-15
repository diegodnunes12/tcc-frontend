import { ToastrService } from 'ngx-toastr';
import { AnimaisInterface } from './../../../core/interfaces/animais.interface';
import { AnimaisService } from './../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { EspeciesService } from './../../../core/services/especies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecieInterface } from 'src/app/core/interfaces/especie.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro-animal',
  templateUrl: './cadastro-animal.component.html',
  styleUrls: ['./cadastro-animal.component.scss']
})
export class CadastroAnimalComponent implements OnInit {
  public formulario: FormGroup;
  public especies$: Observable<EspecieInterface[]>

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

    this.formulario = this.fb.group({
      _id: [],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pelagem: ['', [Validators.maxLength(20)]],
      sexo: [''],
      raca: ['', [Validators.maxLength(30)]],
      idade: ['', Validators.maxLength(10)],
      historia: ['', Validators.maxLength(500)],
      vacinado: [false],
      castrado: [false],
      vermifugado: [false],
      ong: ['60e8d3a839eb36680582b783'],
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
          this.formulario.get('historia').setValue(httpResponse.historia);
          this.formulario.get('vacinado').setValue(httpResponse.vacinado);
          this.formulario.get('castrado').setValue(httpResponse.castrado);
          this.formulario.get('vermifugado').setValue(httpResponse.vermifugado);
          this.formulario.get('especie').setValue(httpResponse.especie._id);
          this.formulario.get('porte').setValue(httpResponse.porte._id);
        });
      }
    });
  }

  salvar() {
    if(this.formulario.valid) {
      let animalId = this.formulario.get('_id').value;
      if(animalId !== null && animalId !== '' ) {
        let animal: AnimaisInterface = {
          nome: this.formulario.get('nome').value,
          pelagem: this.formulario.get('pelagem').value,
          sexo: this.formulario.get('sexo').value,
          raca: this.formulario.get('raca').value,
          idade: this.formulario.get('idade').value,
          historia: this.formulario.get('historia').value,
          vacinado: this.formulario.get('vacinado').value,
          castrado: this.formulario.get('castrado').value,
          vermifugado: this.formulario.get('vermifugado').value,
          especie: this.formulario.get('especie').value,
          porte: this.formulario.get('porte').value,
        }
        this.animaisService.alterar(animal, animalId).subscribe(httpResponse => {
          this.toastr.success('Animal alterado com sucesso');
        },
        error => {
          this.toastr.error('Não foi possível alterar o animal');
        });
      }else {
        this.animaisService.cadastrar(this.formulario.value).subscribe(httpResponse => {
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
