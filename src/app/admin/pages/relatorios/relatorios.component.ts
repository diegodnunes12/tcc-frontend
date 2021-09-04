import { MensagensService } from '../../../core/services/mensagens.service';
import { ToastrService } from 'ngx-toastr';
import { ContatosService } from '../../../core/services/contatos.service';
import { ContatosInterface } from '../../../core/interfaces/contatos.interface';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import jwt_decode from "jwt-decode";
declare var google: any;

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.scss']
})
export class RelatoriosComponent implements OnInit {
  public contatos$: Observable<ContatosInterface[]>;
  @ViewChild('sexo') sexo: ElementRef;
  drawChart = () => {

    const data = google.visualization.arrayToDataTable([
      ['Sexo', '%'],
      ['Macho', 11],
      ['Fêmea', 2]
    ]);

    const options = {
      title: 'Contatos por sexo',
      legend: {position: 'top'}
    };

    const chart = new google.visualization.PieChart(this.sexo.nativeElement);

    chart.draw(data, options);
  }
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
    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.contatos$ = this.contatosService.getContatosOng(usuarioLogado.ong);
    }
  }

  ngAfterViewInit() {
    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
