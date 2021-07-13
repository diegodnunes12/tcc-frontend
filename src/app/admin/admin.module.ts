import { CoreModule } from './../core/core.module';
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CadastroAnimalComponent } from './pages/cadastro-animal/cadastro-animal.component';


@NgModule({
  declarations: [ HomeComponent, HeaderComponent, CadastroAnimalComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
