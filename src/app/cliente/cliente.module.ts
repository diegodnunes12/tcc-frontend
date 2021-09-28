import { CampanhasComponent } from './pages/campanhas/campanhas.component';
import { OngsComponent } from './pages/ongs/ongscomponent';
import { PerfilUsuarioComponent } from './pages/perfil/perfil.component';
import { MensagensComponent } from './pages/mensagens/mensagens.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { ClienteComponent } from './cliente.component';
import { HeaderAdotarComponent } from './componentes/header/header.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderAdotarComponent,
    DetalhesComponent,
    ClienteComponent,
    ContatosComponent,
    MensagensComponent,
    PerfilUsuarioComponent,
    OngsComponent,
    CampanhasComponent
  ],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    CoreModule,
    NgxPaginationModule,
  ]
})
export class ClienteModule { }
