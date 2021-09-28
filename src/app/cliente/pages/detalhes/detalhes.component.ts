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
import jwt_decode from "jwt-decode";

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
    if(this.form.valid) {
      this.desabilitarBotao = true;
      const token = localStorage.getItem('token');
      if(token === null || token === '') {
        this.router.navigate[''];
      }
      else {
        var usuario: any = jwt_decode(token);
        const contato: ContatosInterface = {
          data_contato: new Date(),
          animal: {
            _id: animal._id,
            nome: animal.nome,
            sexo: animal.sexo,
            especie: {
              _id: animal.especie._id,
              nome: animal.especie.nome
            },
            porte: {
              _id: animal.porte._id,
              nome: animal.porte.nome
            }
          },
          usuario: {
            _id: usuario.sub,
            nome: usuario.name
          },
          ong: animal.ong._id
        }

        this.contatosService.cadastrar(contato).subscribe((httpResponse) => {
          const mensagem: MensagemInterface = {
            texto: this.form.get('mensagem').value,
            data_mensagem: new Date(),
            usuario: {
              _id: usuario.sub,
              nome: usuario.name
            },
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

  public paginaOng(_id: string) {
    this.router.navigate(['adotar', 'ongs', _id])
  }
}
