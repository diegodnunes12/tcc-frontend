import { AlterarSenhaSistemaComponent } from './pages/alterar-senha/alterar-senha.component';
import { CampanhasComponent } from './pages/campanhas/campanhas.component';
import { PerfilUsuarioComponent } from './pages/perfil/perfil.component';
import { MensagensComponent } from './pages/mensagens/mensagens.component';
import { ContatosComponent } from './pages/contatos/contatos.component';
import { ClienteComponent } from './cliente.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OngsComponent } from './pages/ongs/ongscomponent';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'ongs', component: OngsComponent },
      { path: 'ongs/:id', component: CampanhasComponent },
      { path: 'detalhes/:id', component: DetalhesComponent },
      { path: 'contatos', component: ContatosComponent },
      { path: 'contatos/:id', component: MensagensComponent },
      { path: 'perfil', component: PerfilUsuarioComponent },
      { path: 'alterar-senha', component: AlterarSenhaSistemaComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
