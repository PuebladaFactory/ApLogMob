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
