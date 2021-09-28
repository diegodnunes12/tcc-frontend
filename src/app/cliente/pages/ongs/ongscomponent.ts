import { OngsService } from './../../../core/services/ongs.service';
import { OngInterface } from './../../../core/interfaces/ong.interface';
import { MensagensService } from '../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-ongs',
  templateUrl: './ongs.component.html',
  styleUrls: ['./ongs.component.scss']
})
export class OngsComponent implements OnInit {
  public ongs$: Observable<OngInterface[]>;

  constructor
  (
    private mensagensService: MensagensService,
    private ongsService: OngsService,
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token === null || token === '') {
      this.router.navigate(['']);
    }else {
      this.ongs$ = this.ongsService.getAll();
    }
  }

  public campanhas(_id: string) {
    this.router.navigate(['adotar', 'ongs', _id,])
  }
}
