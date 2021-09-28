import { CampanhasService } from './../../../core/services/campanhas.service';
import { CampanhasInterface } from './../../../core/interfaces/campanhas.interface';
import { OngsService } from './../../../core/services/ongs.service';
import { OngInterface } from './../../../core/interfaces/ong.interface';
import { MensagensService } from '../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { MensagemInterface } from '../../../core/interfaces/mensagem.interface';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { AnimaisInterface } from '../../../core/interfaces/animais.interface';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.scss']
})
export class CampanhasComponent implements OnInit {
  public ong$: Observable<OngInterface>;
  public campanhas$: Observable<CampanhasInterface[]>;
  public animais$: Observable<AnimaisInterface[]>;

  constructor
  (
    private mensagensService: MensagensService,
    private animaisService: AnimaisService,
    private ongsService: OngsService,
    private campanhasService: CampanhasService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let ongId = params.get("id");
      this.ong$ = this.ongsService.getOng(ongId);
      this.campanhas$ = this.campanhasService.getAll(ongId);
      this.animais$ = this.animaisService.getAllAnimaisDaOng(ongId);
    });
  }

  public detalhes(animalId: string) {
    this.router.navigate(['adotar', 'detalhes', animalId]);
  }
}
