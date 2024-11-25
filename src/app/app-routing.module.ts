import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductFromComponent } from './product-from/product-from.component';
import { AllProductScrComponent } from './all-product-scr/all-product-scr.component';


const routes: Routes = [
  { path: 'addproduct', component: ProductFromComponent },
  { path: '', component: AllProductScrComponent },
  {path:'edit/:id',component:ProductFromComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
