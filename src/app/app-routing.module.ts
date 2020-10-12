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
  {
    path: 'perfil',
    loadChildren: () => import('./pages/application/profile/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'datosgenerales',
    loadChildren: () => import('./pages/application/profile/datosgenerales/datosgenerales.module').then( m => m.DatosgeneralesPageModule)
  },
  {
    path: 'alergias',
    loadChildren: () => import('./pages/application/profile/alergias/alergias.module').then( m => m.AlergiasPageModule)
  },
  {
    path: 'historialmedico',
    loadChildren: () => import('./pages/application/profile/historialmedico/historialmedico.module').then( m => m.HistorialmedicoPageModule)
  },
  {
    path: 'familiares',
    loadChildren: () => import('./pages/application/profile/familiares/familiares.module').then( m => m.FamiliaresPageModule)
  },
  {
    path: 'metodopago',
    loadChildren: () => import('./pages/application/profile/metodopago/metodopago.module').then( m => m.MetodopagoPageModule)
  },
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
