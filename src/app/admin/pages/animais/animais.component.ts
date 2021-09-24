import { AnimaisExcelInterface } from './../../../core/interfaces/animais-excel.interface';
import { ToastrService } from 'ngx-toastr';
import { ModalConfirmaExclusaoComponent } from './../../../core/componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { AnimaisInterface } from './../../../core/interfaces/animais.interface';
import { Observable } from 'rxjs';
import { AnimaisService } from './../../../core/services/animais.service';
import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import * as fileSaver from 'file-saver';
import * as xlsx from 'xlsx';


@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.scss']
})
export class AnimaisComponent implements OnInit {
  public animais$: Observable<AnimaisInterface[]>;

  constructor
  (
    private animaisService: AnimaisService,
    private bsModalService: BsModalService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);
    this.animais$ = this.animaisService.getAllAnimaisDaOng(usuarioLogado.ong);
  }

  public cadastrar() {
    this.router.navigate(['admin', 'animais', 'novo']);
  }

  public editar(id: string) {
    this.router.navigate(['admin', 'animais', 'editar', id]);
  }

  public remover(id: string) {
    let modalRef: BsModalRef = this.bsModalService.show(ModalConfirmaExclusaoComponent, { class: "modal-dialog-centered" });

    modalRef.content.confirmed.subscribe((isConfirmed) => {
      if(isConfirmed) {
        this.animaisService.delete(id).subscribe(httpResponse => {
          const token = localStorage.getItem('token');
          var usuarioLogado: any = jwt_decode(token);
          this.animais$ = this.animaisService.getAllAnimaisDaOng(usuarioLogado.ong);
          this.toastr.success('Animal excluído com sucesso');
        },
        () => {
          this.toastr.error('Não foi possível excluir o animal');
        });
      }
    });
  }

  public exportar(animais) {
    const dadosAnimais = this.getDados(animais);
    const worksheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(dadosAnimais);
    const workbook: xlsx.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });

    const data: Blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });
    fileSaver.saveAs(data, "animais_cadastrados.xlsx");
  }

  private getDados(animais: AnimaisInterface[]): AnimaisExcelInterface[] {
    let dadosAnimais: AnimaisExcelInterface[] = [];
    animais.forEach(item =>  {
      let animal: AnimaisExcelInterface = {
        nome: item.nome,
        pelagem: item.pelagem,
        sexo:  item.sexo,
        raca:  item.raca,
        idade:  item.idade,
        castrado: item.castrado,
        vacinado: item.vacinado,
        vermifugado: item.vermifugado,
        especie:  item.especie.nome,
        porte:  item.porte.nome,
        historia:  item.historia,
      }
      dadosAnimais.push(animal);
    });

    return dadosAnimais;
  }

  public print() {
    window.print();
  }

}
