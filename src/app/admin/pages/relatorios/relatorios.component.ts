import { BsLocaleService } from 'ngx-bootstrap/datepicker';
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
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';

defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  public contatos$: Observable<ContatosInterface[]>;
  public bsInlineRangeValue: Date[];

  constructor
  (
    private mensagensService: MensagensService,
    private contatosService: ContatosService,
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private fb: FormBuilder,
    private router: Router,
    private localeService: BsLocaleService
  ) { localeService.use('pt-br'); }

  public chartColors: any[] = [{backgroundColor:["#6FC8CE", "#FF7360", "#21855b", "#6c2185", "#b01e82", "#de3c3f"]}];
  public barChartColors: Color[] = [{ backgroundColor: "#6FC8CE" }];
  public pieChartType: string = 'pie';
  public barChartType: string = 'bar';
  public chartSexoLabel: string[] = [];
  public chartEspecieLabel: string[] = [];
  public chartPorteLabel: string[] = [];
  public chartAnimalLabel: string[] = [];
  public chartSexoData: number[] = [];
  public chartEspecieData: number[] = [];
  public chartPorteData: number[] = [];
  public chartAnimalData: number[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
      stepSize : 1,
      min: 0
    }}] },
  };
  public barChartLabels: Label[] = [];
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Número total de contatos por dia' }
  ];


  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      let dataInicial = new Date();
      let dataFinal = new Date();
      dataInicial.setDate(dataInicial.getDate() - 30);
      this.bsInlineRangeValue = [dataInicial, dataFinal];

      this.gerarRelatorio(dataInicial, dataFinal);
    }
  }

  private gerarRelatorio(dataInicial: Date, dataFinal: Date) {
    this.limparRelatorios();
    const token = localStorage.getItem('token');
    var usuarioLogado: any = jwt_decode(token);
    this.contatosService.getContatosRelatorios(usuarioLogado.ong, dataInicial, dataFinal).subscribe(httpResponse => {
      let total = httpResponse.length;

      let dataDistinct = [...new Set(httpResponse.map(item => this.formatData(item.data_contato.toString())))];
      dataDistinct.forEach(data => {
        this.barChartLabels.push(`${data}`);
        this.barChartData[0].data.push(httpResponse.filter(item => this.formatData(item.data_contato.toString()) === data).length);
      })

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
      });

      let animalDistinct = [...new Set(httpResponse.map(item => item.animal.nome))];
      animalDistinct.forEach(animal => {
        this.chartAnimalLabel.push(`${animal} - ${httpResponse.filter(item => item.animal.nome === animal).length}`);
        this.chartAnimalData.push((100 * httpResponse.filter(item => item.animal.nome === animal).length) / total)
      });
    });
  }

  private limparRelatorios() {
    this.chartSexoLabel = [];
    this.chartEspecieLabel = [];
    this.chartPorteLabel = [];
    this.chartAnimalLabel = [];
    this.chartSexoData = [];
    this.chartEspecieData = [];
    this.chartPorteData = [];
    this.chartAnimalData = [];
    this.barChartLabels = []
    this.barChartData = [
      { data: [], label: 'Número total de contatos por dia' }
    ]
  }

  private formatData(dataContato: string) {
    const data: Date = new Date(dataContato)
    return `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`;
  }

  public buscar() {
    this.gerarRelatorio(this.bsInlineRangeValue[0], this.bsInlineRangeValue[1]);
  }

  public print() {
    window.print();
  }
}
