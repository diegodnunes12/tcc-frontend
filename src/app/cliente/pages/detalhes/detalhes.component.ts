import { MensagensService } from './../../../core/services/mensagens.service';
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

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.scss']
})
export class DetalhesComponent implements OnInit {
  public animal$: Observable<AnimaisInterface>;
  public form: FormGroup;
  public desabilitarBotao: boolean = false;

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
    this.activatedRoute.paramMap.subscribe((params) => {
      let animalId = params.get("id");
      this.animal$ = this.animaisService.getById(animalId);
    });

    this.form = this.fb.group({
      mensagem: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(1)]]
    });
  }

  public onSubmit(animal: AnimaisInterface) {
    this.desabilitarBotao = true;
    if(this.form.valid) {
      const usuario = localStorage.getItem('usuario');
      if(usuario === null || usuario === '') {
        this.router.navigate[''];
      }
      else {
        const contato: ContatosInterface = {
          data_contato: new Date(),
          animal: animal._id,
          usuario: usuario,
          ong: animal.ong._id
        }

        this.contatosService.cadastrar(contato).subscribe((httpResponse) => {
          const mensagem: MensagemInterface = {
            texto: this.form.get('mensagem').value,
            data_mensagem: new Date(),
            usuario: usuario,
            contato: httpResponse._id
          }

          this.mensagensService.cadastrar(mensagem).subscribe(() => {
            this.form.reset();
            this.toastr.success(`Mensagem envia com sucesso`);
          },
          () => {
            this.toastr.error(`Não foi possível enviar a mensagem`);
            this.desabilitarBotao = false;
          });
        },
        () => {
          this.toastr.error(`Não foi possível enviar a mensagem`);
          this.desabilitarBotao = false;
        });
      }
    }
  }
}
