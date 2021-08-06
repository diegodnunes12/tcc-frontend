import { HeaderAdotarComponent } from './componentes/header/header.component';
import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';
import { HomeComponent } from './home/home.component';
import { DetalhesComponent } from './detalhes/detalhes.component';


@NgModule({
  declarations: [HomeComponent, HeaderAdotarComponent, DetalhesComponent],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    CoreModule
  ]
})
export class ClienteModule { }
