import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
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
    path: 'subirpubli',
    loadChildren: () => import('./subirpubli/subirpubli.module').then( m => m.SubirpubliPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'metodopago',
    loadChildren: () => import('./metodopago/metodopago.module').then( m => m.MetodopagoPageModule)
  },
  {
    path: 'ayudasoporte',
    loadChildren: () => import('./ayudasoporte/ayudasoporte.module').then( m => m.AyudasoportePageModule)
  },
  {
    path: 'bandejaentrada',
    loadChildren: () => import('./bandejaentrada/bandejaentrada.module').then( m => m.BandejaentradaPageModule)
  },
  {
    path: 'editar-perfil',
    loadChildren: () => import('./editar-perfil/editar-perfil.module').then( m => m.EditarPerfilPageModule)
  },
  {
    path: 'modificarcontrasena',
    loadChildren: () => import('./modificarcontrasena/modificarcontrasena.module').then( m => m.ModificarcontrasenaPageModule)
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  {
    path: 'admin-usuarios',
    loadChildren: () => import('./admin-usuarios/admin-usuarios.module').then( m => m.AdminUsuariosPageModule)
  },
  {
    path: 'admin-publicaciones',
    loadChildren: () => import('./admin-publicaciones/admin-publicaciones.module').then( m => m.AdminPublicacionesPageModule)
  },
  {
    path: 'admin-editarusuarios',
    loadChildren: () => import('./admin-editarusuarios/admin-editarusuarios.module').then( m => m.AdminEditarusuariosPageModule)
  },
  {
    path: 'admin-editarpublicaciones',
    loadChildren: () => import('./admin-editarpublicaciones/admin-editarpublicaciones.module').then( m => m.AdminEditarpublicacionesPageModule)
  },
  {
    path: 'admin-filtrarpubli',
    loadChildren: () => import('./admin-filtrarpubli/admin-filtrarpubli.module').then( m => m.AdminFiltrarpubliPageModule)
  },
  {
    path: 'detalle-publicacion/:producto_id',
    loadChildren: () => import('./detalle-publicacion/detalle-publicacion.module').then( m => m.DetallePublicacionPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'check',
    loadChildren: () => import('./check/check.module').then( m => m.CheckPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  {
    path: 'miscompras',
    loadChildren: () => import('./miscompras/miscompras.module').then( m => m.MiscomprasPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
