import { ClienteComponent } from './cliente.component';
import { DetalhesComponent } from './pages/detalhes/detalhes.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: ClienteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'detalhes/:id', component: DetalhesComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClienteRoutingModule { }
