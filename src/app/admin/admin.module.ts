import { ReactiveFormsModule } from '@angular/forms';
import { CadastroCampanhaComponent } from './pages/cadastro-campanha/cadastro-campanha.component';
import { CampanhasComponent } from './pages/campanhas/campanhas.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MinhaOngComponent } from './pages/minha-ong/minha-ong.component';
import { AdminComponent } from './admin.component';
import { MensagensAdminComponent } from './pages/mensagens/mensagens.component';
import { ContatosAdminComponent } from './pages/contatos/contatos.component';
import { CoreModule } from './../core/core.module';
import { HeaderComponentAdmin } from './componentes/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import localePt from '@angular/common/locales/pt';

import { AdminRoutingModule } from './admin-routing.module';
import { CadastroAnimalComponent } from './pages/cadastro-animal/cadastro-animal.component';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { ChartsModule } from 'ng2-charts';
import { AnimaisComponent } from './pages/animais/animais.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponentAdmin,
    CadastroAnimalComponent,
    ContatosAdminComponent,
    MensagensAdminComponent,
    AdminComponent,
    MinhaOngComponent,
    UsuariosComponent,
    PerfilComponent,
    CadastroUsuarioComponent,
    RelatoriosComponent,
    AnimaisComponent,
    CampanhasComponent,
    CadastroCampanhaComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    ChartsModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' }
  ]
})
export class AdminModule { }
