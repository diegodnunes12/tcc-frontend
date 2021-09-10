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

  public chartColors: any[] = [{backgroundColor:["#6FC8CE", "#FF7360", "#21855b", "#6c2185", "#b01e82", "#de3c3f"]}];
  public pieChartType: string = 'pie';
  public chartSexoLabel: string[] = [];
  public chartEspecieLabel: string[] = [];
  public chartPorteLabel: string[] = [];
  public chartSexoData: number[] = [];
  public chartEspecieData: number[] = [];
  public chartPorteData: number[] = [];

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
        console.log(httpResponse)

        this.chartSexoLabel.push(`Macho - ${httpResponse.filter(item => item.animal.sexo === "Macho").length}`);
        this.chartSexoData.push((100 * httpResponse.filter(item => item.animal.sexo === "Macho").length) / total)

        this.chartSexoLabel.push(`Fêmea - ${httpResponse.filter(item => item.animal.sexo === "Fêmea").length}`);
        this.chartSexoData.push((100 * httpResponse.filter(item => item.animal.sexo === "Fêmea").length) / total)

        let especieDistinct = [...new Set(httpResponse.map(item => item.animal.especie.nome))];
        especieDistinct.forEach(especie => {
          this.chartEspecieLabel.push(`${especie} - ${httpResponse.filter(item => item.animal.especie.nome === especie).length}`);
          this.chartEspecieData.push((100 * httpResponse.filter(item => item.animal.especie.nome === especie).length) / total)
        });

        let porteDistinct = [...new Set(httpResponse.map(item => item.animal.porte.nome))];
        porteDistinct.forEach(porte => {
          this.chartPorteLabel.push(`${porte} - ${httpResponse.filter(item => item.animal.porte.nome === porte).length}`);
          this.chartPorteData.push((100 * httpResponse.filter(item => item.animal.porte.nome === porte).length) / total)
        })


      });
    }
  }
}
