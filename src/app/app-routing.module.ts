import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { HomeComponent } from './shared/components/home/home.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { CartsComponent } from './carts/components/carts/carts.component';
import { ContactUsComponent } from './contact-us/contact-us/contact-us.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes=[
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'products', component:AllProductsComponent},
  {path:'details/:id', component:ProductsDetailsComponent},
  {path:'cart', component:CartsComponent},
  {path:'contact', component:ContactUsComponent},
  {path:'**',component:HomeComponent},
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule {}
