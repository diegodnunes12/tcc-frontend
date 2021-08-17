import { MinhaOngComponent } from './pages/minha-ong/minha-ong.component';
import { AdminComponent } from './admin.component';
import { MensagensAdminComponent } from './pages/mensagens/mensagens.component';
import { ContatosAdminComponent } from './pages/contatos/contatos.component';
import { CoreModule } from './../core/core.module';
import { HeaderComponentAdmin } from './componentes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CadastroAnimalComponent } from './pages/cadastro-animal/cadastro-animal.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponentAdmin,
    CadastroAnimalComponent,
    ContatosAdminComponent,
    MensagensAdminComponent,
    AdminComponent,
    MinhaOngComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
