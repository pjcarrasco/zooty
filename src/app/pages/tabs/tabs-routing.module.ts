import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'lugares',
        loadChildren: () => import('../lugares/lugares.module').then(m => m.LugaresPageModule)
      },
      {
        path: 'alertas',
        loadChildren: () => import('../alertas/alertas.module').then(m => m.AlertasPageModule)
      },
      {
        path: 'eventos',
        loadChildren: () => import('../eventos/eventos.module').then(m => m.EventosPageModule)
      },
      {
        path: '',
        redirectTo: '/home/lugares',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home/lugares',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
