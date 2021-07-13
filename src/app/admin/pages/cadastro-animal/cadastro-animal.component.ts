import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro-animal',
  templateUrl: './cadastro-animal.component.html',
  styleUrls: ['./cadastro-animal.component.scss']
})
export class CadastroAnimalComponent implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      pelagem: ['', [Validators.maxLength(20)]],
      sexo: [''],
      raca: ['', [Validators.maxLength(30)]],
      historia: ['', Validators.maxLength(500)],
      vacinado: [false],
      castrado: [false],
      vermifugado: [false],
      ong: ['60e8d3a839eb36680582b783'],
      especie: ['', Validators.required],
      porte: ['', Validators.required],
      data_cadastro: [new Date()],
    });
  }
}
