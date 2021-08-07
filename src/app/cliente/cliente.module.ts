import { ClienteComponent } from './cliente.component';
import { HeaderAdotarComponent } from './componentes/header/header.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';


@NgModule({
  declarations: [HomeComponent, HeaderAdotarComponent, DetalhesComponent, ClienteComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    CoreModule,
  ]
})
export class ClienteModule { }
