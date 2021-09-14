import { ModalConfirmaExclusaoComponent } from './../../../core/componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { MensagensService } from './../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { MensagemInterface } from '../../../core/interfaces/mensagem.interface';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisInterface } from '../../../core/interfaces/animais.interface';
import { Observable } from 'rxjs';
import { Component, OnInit, TemplateRef } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.scss']
})
export class MensagensAdminComponent implements OnInit {
  public mensagens$: Observable<MensagemInterface[]>;
  public contato$: Observable<ContatosInterface>;
  public form: FormGroup;
  public desabilitarBotao: boolean = false;
  private modalRef: BsModalRef;
  private contatoId: string;

  constructor
  (
    private mensagensService: MensagensService,
    private contatosService: ContatosService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private bsModalService: BsModalService,
    private fb: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.contatoId = params.get("id");
      this.contato$ = this.contatosService.getContato(this.contatoId);
      this.mensagens$ = this.mensagensService.getByContato(this.contatoId);
    });

    this.form = this.fb.group({
      mensagem: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(1)]]
    });
  }

  isMensagemDoUsuario(usuarioContato: string, usuarioMensagem: string): boolean {
    if(usuarioContato === usuarioMensagem) {
      return true;
    }else {
      return false;
    }
  }

  public onSubmit(contato: ContatosInterface) {
    if(this.form.valid) {
      this.desabilitarBotao = true;
      const token = localStorage.getItem('token');
      if(token === null || token === '') {
        this.router.navigate[''];
      }
      else {
        var usuario: any = jwt_decode(token);
        const mensagem: MensagemInterface = {
          texto: this.form.get('mensagem').value,
          data_mensagem: new Date(),
          usuario: {
            _id: usuario.sub,
            nome: usuario.name
          },
          contato: contato._id
        }

        this.mensagensService.cadastrar(mensagem).subscribe(() => {
          this.form.reset();
          this.toastr.success(`Mensagem enviada com sucesso`);
          this.mensagens$ = this.mensagensService.getByContato(contato._id);
        },
        () => {
          this.toastr.error(`Não foi possível enviar a mensagem`);
          this.desabilitarBotao = false;
        });
      }
    }
  }

  public editarMensagem(template: TemplateRef<any>) {
    this.modalRef = this.bsModalService.show(template);
  }

  public remover(id: string) {
    let modalRef: BsModalRef = this.bsModalService.show(ModalConfirmaExclusaoComponent, { class: "modal-dialog-centered" });

    modalRef.content.confirmed.subscribe((isConfirmed) => {
      if(isConfirmed) {
        this.mensagensService.delete(id).subscribe(httpResponse => {
          this.mensagens$ = this.mensagensService.getByContato(this.contatoId);
          this.toastr.success('Mensagem excluída com sucesso');
        },
        () => {
          this.toastr.error('Não foi possível excluir a mensagem');
        });
      }
    });
  }
}
