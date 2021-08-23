import { ModalConfirmaExclusaoComponent } from './componentes/modal-confirma-exclusao/modal-confirma-exclusao.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './componentes/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LoadingComponent } from './componentes/loading/loading.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [ModalConfirmaExclusaoComponent, FooterComponent, LoadingComponent,],
  imports: [
    CommonModule,
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ timeOut: 5000, closeButton: true }),
    TabsModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgSelectModule
  ],
  providers: [BsModalService],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FooterComponent,
    TabsModule,
    LoadingComponent,
    NgxMaskModule,
    NgSelectModule
  ]
})
export class CoreModule {
  constructor() { }
}
