import { MensagensService } from './../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

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
    const usuario = localStorage.getItem('usuario');

    if(usuario === null || usuario === '') {
      this.router.navigate(['']);
    }
    else {
      this.contatos$ = this.contatosService.getContatosOng(usuario);
    }
  }

  public mensagens(id: string) {
    this.router.navigate(['adotar','contatos', id]);
  }
}
