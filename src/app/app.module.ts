import { NovaOngComponent } from './pages/nova-ong/nova-ong.component';
import { NovoUsuarioComponent } from './pages/novo-usuario/novo-usuario.component';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClienteModule } from './cliente/cliente.module';
import { AdminModule } from './admin/admin.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './core/componentes/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NovoUsuarioComponent,
    NovaOngComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminModule,
    ClienteModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
