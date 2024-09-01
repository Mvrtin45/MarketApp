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
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'zapasblackcat',
    loadChildren: () => import('./zapasblackcat/zapasblackcat.module').then( m => m.ZapasblackcatPageModule)
  },
  {
    path: 'jeansae',
    loadChildren: () => import('./jeansae/jeansae.module').then( m => m.JeansaePageModule)
  },
  {
    path: 'chaquetaamiri',
    loadChildren: () => import('./chaquetaamiri/chaquetaamiri.module').then( m => m.ChaquetaamiriPageModule)
  },
  {
    path: 'polerabasicasf',
    loadChildren: () => import('./polerabasicasf/polerabasicasf.module').then( m => m.PolerabasicasfPageModule)
  },
  {
    path: 'subirpubli',
    loadChildren: () => import('./subirpubli/subirpubli.module').then( m => m.SubirpubliPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'cargocorteiz',
    loadChildren: () => import('./cargocorteiz/cargocorteiz.module').then( m => m.CargocorteizPageModule)
  },
  {
    path: 'zapasretro1',
    loadChildren: () => import('./zapasretro1/zapasretro1.module').then( m => m.Zapasretro1PageModule)
  },
  {
    path: 'poleracolocolo',
    loadChildren: () => import('./poleracolocolo/poleracolocolo.module').then( m => m.PoleracolocoloPageModule)
  },
  {
    path: 'polerapalm',
    loadChildren: () => import('./polerapalm/polerapalm.module').then( m => m.PolerapalmPageModule)
  },
  {
    path: 'poleraudechile',
    loadChildren: () => import('./poleraudechile/poleraudechile.module').then( m => m.PoleraudechilePageModule)
  },
  {
    path: 'zapasvapormax',
    loadChildren: () => import('./zapasvapormax/zapasvapormax.module').then( m => m.ZapasvapormaxPageModule)
  },
  {
    path: 'zapasairforceonce',
    loadChildren: () => import('./zapasairforceonce/zapasairforceonce.module').then( m => m.ZapasairforceoncePageModule)
  },
  {
    path: 'zapasjordanretro3',
    loadChildren: () => import('./zapasjordanretro3/zapasjordanretro3.module').then( m => m.Zapasjordanretro3PageModule)
  },
  {
    path: 'zapasadidascampus',
    loadChildren: () => import('./zapasadidascampus/zapasadidascampus.module').then( m => m.ZapasadidascampusPageModule)
  },
  {
    path: 'jeanfn',
    loadChildren: () => import('./jeanfn/jeanfn.module').then( m => m.JeanfnPageModule)
  },
  {
    path: 'jeanamiri',
    loadChildren: () => import('./jeanamiri/jeanamiri.module').then( m => m.JeanamiriPageModule)
  },
  {
    path: 'jeanskinny',
    loadChildren: () => import('./jeanskinny/jeanskinny.module').then( m => m.JeanskinnyPageModule)
  },
  {
    path: 'jeanlevis',
    loadChildren: () => import('./jeanlevis/jeanlevis.module').then( m => m.JeanlevisPageModule)
  },
  {
    path: 'zapatosvestir',
    loadChildren: () => import('./zapatosvestir/zapatosvestir.module').then( m => m.ZapatosvestirPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
