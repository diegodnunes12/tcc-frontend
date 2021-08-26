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

  constructor
  (
    private animaisService: AnimaisService,
    private router: Router,
    private especiesService: EspeciesService,
    private cidadesEstadosService: CidadesEstadosService
  ) { }

  ngOnInit(): void {
    this.animais$ = this.animaisService.getAll();
    this.especies$ = this.especiesService.getAll();
    this.cidadesEstadosService.getEstados().subscribe(HttpResponse => this.estados = HttpResponse);
  }

  public detalhes(animalId: string) {
    this.router.navigate(['adotar', 'detalhes', animalId]);
  }

  public selectEstado() {
    this.cidadesEstadosService.getCidades('mg').subscribe(httpResponse => this.cidades = httpResponse);
  }

}
