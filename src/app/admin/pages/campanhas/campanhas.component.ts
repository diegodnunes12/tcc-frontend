import { CampanhasService } from './../../../core/services/campanhas.service';
import { CampanhasInterface } from './../../../core/interfaces/campanhas.interface';
import { AnimaisExcelInterface } from '../../../core/interfaces/animais-excel.interface';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmaExclusaoComponent } from '../../../core/componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { AnimaisInterface } from '../../../core/interfaces/animais.interface';
import { Observable } from 'rxjs';
import { AnimaisService } from '../../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import * as fileSaver from 'file-saver';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-campanhas',
  templateUrl: './campanhas.component.html',
  styleUrls: ['./campanhas.component.scss']
})
export class CampanhasComponent implements OnInit {
  public campanhas$: Observable<CampanhasInterface[]>;

  constructor
  (
    private campanhasService: CampanhasService,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);
    this.campanhas$ = this.campanhasService.getAll(usuarioLogado.ong);
  }

  public cadastrar() {
    this.router.navigate(['admin', 'campanhas', 'novo']);
  }

  public editar(id: string) {
    this.router.navigate(['admin', 'campanhas', 'editar', id]);
  }

  public remover(id: string) {
    let modalRef: BsModalRef = this.bsModalService.show(ModalConfirmaExclusaoComponent, { class: "modal-dialog-centered" });

    modalRef.content.confirmed.subscribe((isConfirmed) => {
      if(isConfirmed) {
        this.campanhasService.delete(id).subscribe(httpResponse => {
          const token = localStorage.getItem('token');
          var usuarioLogado: any = jwt_decode(token);
          this.campanhas$ = this.campanhasService.getAll(usuarioLogado.ong);
          this.toastr.success('Campanha excluída com sucesso');
        },
        () => {
          this.toastr.error('Não foi possível excluir a campanha');
        });
      }
    });
  }


}
