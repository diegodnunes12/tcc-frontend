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

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'novo', component: CadastroAnimalComponent },
      { path: 'editar/:animalId', component: CadastroAnimalComponent },
      { path: 'admin/contatos', component: ContatosAdminComponent },
      { path: 'admin/contatos/:id', component: MensagensAdminComponent },
      { path: 'admin/minha-ong', component: MinhaOngComponent },
      { path: 'admin/usuarios', component: UsuariosComponent },
      { path: 'admin/perfil', component: PerfilComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
