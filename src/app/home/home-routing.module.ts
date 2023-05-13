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

      // {
      //   path: "ops",
      //   loadChildren: () =>
      //     import("../pages/ops/ops.module").then((m) => m.OpsPageModule),
      // },

      {
        path: 'operaciones',
        loadChildren: () => 
        import('../pages/notas/notas.module').then( m => m.NotasPageModule)
      },
      {
        path: 'operaciones/create',
        loadChildren: () => 
        import('../pages/create/create.module').then( m => m.CreatePageModule)
      },
      {
        path: 'operaciones/detail/:id',
        loadChildren: () => import('../pages/details/details.module').then( m => m.DetailsPageModule)
      },

      {
        path: 'operaciones/edit/:id',
        loadChildren: () => 
        import('../pages/edit/edit.module').then( m => m.EditPageModule)
      },



      {
        path: "",
        redirectTo: "/home/operaciones",
        pathMatch: "full",
      },
    ],
  },

  {
    path: "",
    redirectTo: "/home/operaciones",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
