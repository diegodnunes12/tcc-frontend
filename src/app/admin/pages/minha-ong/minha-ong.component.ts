import { OngsService } from './../../../core/services/ongs.service';
import { ToastrService } from 'ngx-toastr';
import { AnimaisService } from '../../../core/services/animais.service';
import { Observable } from 'rxjs';
import { EspeciesService } from '../../../core/services/especies.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EspecieInterface } from 'src/app/core/interfaces/especie.interface';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { OngInterface } from 'src/app/core/interfaces/ong.interface';

@Component({
  selector: 'app-minha-ong',
  templateUrl: './minha-ong.component.html',
  styleUrls: ['./minha-ong.component.scss']
})
export class MinhaOngComponent implements OnInit {
  public formulario: FormGroup;
  public ong$: Observable<OngInterface>

  constructor
  (
    private fb: FormBuilder,
    private ongsService: OngsService,
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      _id: [''],
      cnpj: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      telefone: ['', [Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.maxLength(50)]],
      facebook: ['', [Validators.maxLength(50)]],
      instagram: ['', Validators.maxLength(50)],
      cidade: ['', Validators.maxLength(100)],
      estado: ['', Validators.maxLength(20)],
    });

    const token = localStorage.getItem('token');

    if(token === null || token === '') {
      this.router.navigate(['']);
    }
    else {
      var usuarioLogado: any = jwt_decode(token);
      this.ongsService.getOng(usuarioLogado.ong).subscribe((httpResponse) => {
        this.formulario.get('_id').setValue(httpResponse._id);
        this.formulario.get('cnpj').setValue(httpResponse.cnpj);
        this.formulario.get('nome').setValue(httpResponse.nome);
        this.formulario.get('telefone').setValue(httpResponse.telefone);
        this.formulario.get('email').setValue(httpResponse.email);
        this.formulario.get('facebook').setValue(httpResponse.facebook);
        this.formulario.get('instagram').setValue(httpResponse.instagram);
        this.formulario.get('cidade').setValue(httpResponse.cidade);
        this.formulario.get('estado').setValue(httpResponse.estado);
      });
    }
  }

  public salvar() {
    if(this.formulario.valid) {
      const ong: OngInterface = {
        nome: this.formulario.get('nome').value,
        telefone: this.formulario.get('telefone').value,
        email: this.formulario.get('email').value,
        facebook: this.formulario.get('facebook').value,
        instagram: this.formulario.get('instagram').value,
        cidade: this.formulario.get('cidade').value,
        estado: this.formulario.get('estado').value,
      }

      this.ongsService.alterarOng(this.formulario.get('_id').value, ong).subscribe(httpResponse => {
        this.toastr.success('Informações alteradas com sucesso');
      },
      error => {
        this.toastr.error('Não foi possível alterar os dados da ong');
      });
    }
  }
}
