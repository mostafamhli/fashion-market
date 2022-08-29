import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { CartsComponent } from './carts/components/carts/carts.component';
import { ContactUsComponent } from './contact-us/contact-us/contact-us.component';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { ProductsDetailsComponent } from './products/components/products-details/products-details.component';
import { HomeComponent } from './shared/components/home/home.component';

const routes: Routes=[
  {path:'products', component:AllProductsComponent},
  {path:'home', component:HomeComponent},
  {path:'details/:id', component:ProductsDetailsComponent},
  {path:'cart', component:CartsComponent},
  {path:'contact', component:ContactUsComponent},
  {path:'**', redirectTo:'home', pathMatch:'full'},
];
@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports:[RouterModule]
})

export class AppRoutingModule {}
