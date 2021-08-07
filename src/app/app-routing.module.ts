import { NovaOngComponent } from './pages/nova-ong/nova-ong.component';
import { NovoUsuarioComponent } from './pages/novo-usuario/novo-usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
        path: "",
        component: HomeComponent,
      },
      {
        path: "novo-usuario",
        component: NovoUsuarioComponent,
      },
      {
        path: "nova-ong",
        component: NovaOngComponent
      },
      {
        path: "admin",
        loadChildren: () => import("./admin/admin.module").then((module) => module.AdminModule),
      },
      {
        path: "adotar",
        loadChildren: () => import("./cliente/cliente.module").then((module) => module.ClienteModule),
      },
  ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
