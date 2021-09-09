import { MensagensService } from '../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit} from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
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

  public chartSexoLabel: string[] = [];
  public chartSexoData: number[] = [];
  public chartColors: any[] = [{backgroundColor:["#6FC8CE", "#FF7360", "#FAFFF2", "#FFFCC4", "#B9E8E0"]}];
  public pieChartType: string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.contatosService.getContatosRelatorios(usuarioLogado.ong).subscribe(httpResponse => {
        let total = httpResponse.length;

        this.chartSexoLabel.push('Macho');
        this.chartSexoData.push((100 * httpResponse.filter(item => item.animal.sexo === "Macho").length) / total)

        this.chartSexoLabel.push('Fêmea');
        this.chartSexoData.push((100 * httpResponse.filter(item => item.animal.sexo === "Fêmea").length) / total)

      });
    }
  }
}
