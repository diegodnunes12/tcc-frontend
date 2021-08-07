import { ToastrService } from 'ngx-toastr';
import { MenasgensService } from '../../../core/services/mensagens.service';
import { MensagemInterface } from '../../../core/interfaces/mensagem.interface';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { AnimaisInterface } from '../../../core/interfaces/animais.interface';
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
    private mensagensSercice: MenasgensService,
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
      this.contatos$ = this.contatosService.getContatos(usuario);
    }
  }
}
