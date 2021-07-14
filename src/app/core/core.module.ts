import { ModalConfirmaExclusaoComponent } from './componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';


@NgModule({
  declarations: [ModalConfirmaExclusaoComponent, FooterComponent,],
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [BsModalService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent
  ]
})
export class CoreModule {
  constructor() { }
}
