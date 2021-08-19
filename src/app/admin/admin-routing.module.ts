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

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'novo', component: CadastroAnimalComponent },
      { path: 'editar/:animalId', component: CadastroAnimalComponent },
      { path: 'contatos', component: ContatosAdminComponent },
      { path: 'contatos/:id', component: MensagensAdminComponent },
      { path: 'minha-ong', component: MinhaOngComponent },
      { path: 'usuarios', component: UsuariosComponent },
      { path: 'usuarios/novo', component: CadastroUsuarioComponent },
      { path: 'usuarios/editar/:usuarioId', component: CadastroUsuarioComponent },
      { path: 'perfil', component: PerfilComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
