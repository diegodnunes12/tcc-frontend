import { MensagensService } from './../../../core/services/mensagens.service';
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
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.scss']
})
export class ContatosComponent implements OnInit {
  public contatos$: Observable<ContatosInterface[]>;

  constructor
  (
    private mensagensService: MensagensService,
    private contatosService: ContatosService,
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
      var usuarioLogado: any = jwt_decode(token);
      this.contatos$ = this.contatosService.getContatos(usuarioLogado.sub);
    }
  }

  public mensagens(id: string) {
    this.router.navigate(['adotar','contatos', id]);
  }
}
