import { CadastroCampanhaComponent } from './pages/cadastro-campanha/cadastro-campanha.component';
import { CampanhasComponent } from './pages/campanhas/campanhas.component';
import { AnimaisComponent } from './pages/animais/animais.component';
import { RelatoriosComponent } from './pages/relatorios/relatorios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { MinhaOngComponent } from './pages/minha-ong/minha-ong.component';
import { AdminComponent } from './admin.component';
import { MensagensAdminComponent } from './pages/mensagens/mensagens.component';
import { ContatosAdminComponent } from './pages/contatos/contatos.component';
import { CadastroAnimalComponent } from './pages/cadastro-animal/cadastro-animal.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUsuarioComponent } from './pages/cadastro-usuario/cadastro-usuario.component';
import { AuthGuardAdminService } from './auth-guard-admin.service';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'animais', component: AnimaisComponent },
      { path: 'animais/novo', component: CadastroAnimalComponent },
      { path: 'animais/editar/:animalId', component: CadastroAnimalComponent },
      { path: 'campanhas', component: CampanhasComponent },
      { path: 'campanhas/novo', component: CadastroCampanhaComponent },
      { path: 'campanhas/editar/:campanhaId', component: CadastroCampanhaComponent },
      { path: 'contatos', component: ContatosAdminComponent },
      { path: 'contatos/:id', component: MensagensAdminComponent },
      { path: 'minha-ong', component: MinhaOngComponent },
      { path: 'usuarios', component: UsuariosComponent, canActivate: [AuthGuardAdminService] },
      { path: 'usuarios/novo', component: CadastroUsuarioComponent, canActivate: [AuthGuardAdminService] },
      { path: 'usuarios/editar/:usuarioId', component: CadastroUsuarioComponent, canActivate: [AuthGuardAdminService] },
      { path: 'perfil', component: PerfilComponent },
      { path: 'relatorios', component: RelatoriosComponent, canActivate: [AuthGuardAdminService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
