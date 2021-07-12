import { CoreModule } from './../core/core.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClienteRoutingModule } from './cliente-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClienteRoutingModule,
    CoreModule
  ]
})
export class ClienteModule { }
