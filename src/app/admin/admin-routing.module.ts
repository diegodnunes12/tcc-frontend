import { MensagensComponent } from './pages/mensagens/mensagens.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { CadastroAnimalComponent } from './pages/cadastro-animal/cadastro-animal.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'novo', component: CadastroAnimalComponent },
  { path: 'editar/:animalId', component: CadastroAnimalComponent },
  { path: 'admin/contatos', component: ContatosComponent },
  { path: 'admin/contatos/:id', component: MensagensComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
