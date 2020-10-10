import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  // Publicas
  {
    path: '',
    loadChildren: () => import('./pages/auth/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/auth/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then( m => m.LoginPageModule)
  },
  // Privadas
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/application/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'consultas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/application/consultas/consultas.module').then( m => m.ConsultasPageModule)
  },
  {
    path: 'resacas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/application/resacas/resacas.module').then( m => m.ResacasPageModule)
  },
  {
    path: 'labs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/application/labs/labs.module').then( m => m.LabsPageModule)
  },
  {
    path: 'farmacia',
    canActivate: [AuthGuard],
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
