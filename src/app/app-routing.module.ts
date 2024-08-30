import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'favoritos',
    loadChildren: () => import('./favoritos/favoritos.module').then( m => m.FavoritosPageModule)
  },
  {
    path: 'jeans',
    loadChildren: () => import('./jeans/jeans.module').then( m => m.JeansPageModule)
  },
  {
    path: 'chaquetas',
    loadChildren: () => import('./chaquetas/chaquetas.module').then( m => m.ChaquetasPageModule)
  },
  {
    path: 'zapatillas',
    loadChildren: () => import('./zapatillas/zapatillas.module').then( m => m.ZapatillasPageModule)
  },
  {
    path: 'poleras',
    loadChildren: () => import('./poleras/poleras.module').then( m => m.PolerasPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
