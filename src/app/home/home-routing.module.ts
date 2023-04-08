import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomePage } from "./home.page";

const routes: Routes = [
  {
    path: "",
    component: HomePage,
    children: [
      {
        path: "perfil",
        loadChildren: () =>
          import("../pages/perfil/perfil.module").then(
            (m) => m.PerfilPageModule
          ),
      },
      {
        path: "legajo",
        loadChildren: () =>
          import("../pages/legajo/legajo.module").then(
            (m) => m.LegajoPageModule
          ),
      },

      {
        path: "ops",
        loadChildren: () =>
          import("../pages/ops/ops.module").then((m) => m.OpsPageModule),
      },

      {
        path: 'notas',
        loadChildren: () => 
        import('../pages/notas/notas.module').then( m => m.NotasPageModule)
      },
      {
        path: 'notas/create',
        loadChildren: () => 
        import('../pages/create/create.module').then( m => m.CreatePageModule)
      },
      {
        path: 'notas/detail/:id',
        loadChildren: () => import('../pages/details/details.module').then( m => m.DetailsPageModule)
      },

      {
        path: 'notas/edit/:id',
        loadChildren: () => 
        import('../pages/edit/edit.module').then( m => m.EditPageModule)
      },



      {
        path: "",
        redirectTo: "/home/ops",
        pathMatch: "full",
      },
    ],
  },

  {
    path: "",
    redirectTo: "/home/ops",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
