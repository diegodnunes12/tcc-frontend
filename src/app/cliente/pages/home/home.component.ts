import { FiltroInterface } from './../../../core/interfaces/filtro.interface';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CidadesEstadosService, EstadosInterface, CidadesInterface } from './../../../core/services/cidades-estados.service';
import { EspeciesService } from './../../../core/services/especies.service';
import { EspecieInterface } from './../../../core/interfaces/especie.interface';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimaisInterface } from '../../../core/interfaces/animais.interface';
import { AnimaisService } from '../../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public animais$: Observable<AnimaisInterface[]>;
  public especies$: Observable<EspecieInterface[]>
  public estados: EstadosInterface[];
  public cidades: CidadesInterface[];
  public formulario: FormGroup;

  constructor
  (
    private animaisService: AnimaisService,
    private router: Router,
    private especiesService: EspeciesService,
    private cidadesEstadosService: CidadesEstadosService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.animais$ = this.animaisService.getAll(1);
    this.especies$ = this.especiesService.getAll();
    this.cidadesEstadosService.getEstados().subscribe(HttpResponse => this.estados = HttpResponse);

    this.formulario = this.fb.group({
      especie: [''],
      sexo: [''],
      porte: [''],
      castrado: [''],
      vermifugado: [''],
      vacinado: [''],
      estado: [''],
      cidade: [''],
    });
  }

  public detalhes(animalId: string) {
    this.router.navigate(['adotar', 'detalhes', animalId]);
  }

  public selectEstado() {
    this.cidadesEstadosService.getCidades(this.formulario.get('estado').value).subscribe(httpResponse => this.cidades = httpResponse);
  }

  public filtrar($event) {
    $event.preventDefault();
    const filtro: FiltroInterface = {
      especie: this.formulario.get('especie').value,
      sexo: this.formulario.get('sexo').value,
      porte: this.formulario.get('porte').value,
      castrado: this.formulario.get('castrado').value,
      vacinado: this.formulario.get('vacinado').value,
      vermifugado: this.formulario.get('vermifugado').value,
      estado: this.formulario.get('estado').value,
      cidade: this.formulario.get('cidade').value,
    }

    this.animais$ = this.animaisService.getAllByFilter(filtro, 1);
  }

  public limpar() {
    this.formulario.reset();
  }

  pageChanged(page) {
    this.animais$ = this.animaisService.getAll(page);
  }

}
