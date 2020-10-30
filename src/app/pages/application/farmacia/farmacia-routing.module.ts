import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FarmaciaPage } from './farmacia.page';

const routes: Routes = [
  // {
  //   path: '',
  //   component: FarmaciaPage,
  // },
  {
    path: '',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },{
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },{
    path: 'product-detail/:name',
    loadChildren: () => import('./product-detail/product-detail.module').then( m => m.ProductDetailPageModule)
  },{
    path: 'cart-checkout',
    loadChildren: () => import('./cart-checkout/cart-checkout.module').then( m => m.CartCheckoutPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FarmaciaPageRoutingModule {}
