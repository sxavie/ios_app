import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/application/home/home.module').then( m => m.HomePageModule )
  },
  // Publicas
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  // Privadas
  {
    path: 'resacas',
    loadChildren: () => import('./pages/application/resacas/resacas.module').then( m => m.ResacasPageModule)
  },
  {
    path: 'labs',
    loadChildren: () => import('./pages/application/labs/labs.module').then( m => m.LabsPageModule)
  },
  {
    path: 'consultas',
    loadChildren: () => import('./pages/application/consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'farmacia',
    loadChildren: () => import('./pages/application/farmacia/farmacia.module').then( m => m.FarmaciaPageModule)
  },
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
