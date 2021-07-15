import { ToastrService } from 'ngx-toastr';
import { ModalConfirmaExclusaoComponent } from './../../../core/componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { AnimaisInterface } from './../../../core/interfaces/animais.interface';
import { Observable } from 'rxjs';
import { AnimaisService } from './../../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public animais$: Observable<AnimaisInterface[]>;

  constructor
  (
    private animaisService: AnimaisService,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.animais$ = this.animaisService.getAll();
  }

  public cadastrar() {
    this.router.navigate(['admin', 'novo']);
  }

  public editar(id: string) {
    this.router.navigate(['admin', 'editar', id]);
  }

  public remover(id: string) {
    let modalRef: BsModalRef = this.bsModalService.show(ModalConfirmaExclusaoComponent, { class: "modal-dialog-centered" });

    modalRef.content.confirmed.subscribe((isConfirmed) => {
      if(isConfirmed) {
        this.animaisService.delete(id).subscribe(httpResponse => {
          this.animais$ = this.animaisService.getAll();
          this.toastr.success('Animal excluído com sucesso');
        },
        error => {
          this.toastr.error('Não foi possível excluir o animal');
        });
      }
    });
  }

}
