import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './Guard/auth.guard';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'product', component: ProductComponent, canActivate: [AuthGuard] },
  

];

@NgModule({
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
