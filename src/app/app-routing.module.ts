import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'ashak',
    loadChildren: () => import('./ashak/ashak.module').then(m => m.AshakModule)
  },
  {
    path: 'boardgame',
    loadChildren: () => import('./boardgame/boardgame.module').then(m => m.BoardgameModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
