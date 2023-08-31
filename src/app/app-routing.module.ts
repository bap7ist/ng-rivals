import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rivals', 
    pathMatch: 'full'
  },
  {
    path: 'ug',
    loadChildren: () => import('./unkind/unkind.module').then(m => m.UnkindModule),
    data: {showNavBar: false}
  },
  {
    path: 'rivals',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
    data: {showNavBar: true}
  },
  {
    path: 'ashaks',
    loadChildren: () => import('./ashak/ashak.module').then(m => m.AshakModule),
    data: {showNavBar: true}
  },
  {
    path: 'gameplay',
    loadChildren: () => import('./boardgame/boardgame.module').then(m => m.BoardgameModule),
    data: {showNavBar: true}
  },
  {
    path: 'medias',
    loadChildren: () => import('./lore/lore.module').then(m => m.LoreModule),
    data: {showNavBar: true}
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
