import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: AppComponent,
    children: [
      {
          path: "admin",
          loadChildren: () => import("./admin/admin.module").then((module) => module.AdminModule),
      },
      {
          path: "cliente",
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
