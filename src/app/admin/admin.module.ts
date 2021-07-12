import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [ HomeComponent, HeaderComponent ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
