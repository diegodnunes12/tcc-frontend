import { ModalConfirmaExclusaoComponent } from './componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';


@NgModule({
  declarations: [ModalConfirmaExclusaoComponent, FooterComponent,],
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 5000, closeButton: true }),
    TabsModule.forRoot(),
  ],
  providers: [BsModalService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    TabsModule
  ]
})
export class CoreModule {
  constructor() { }
}
