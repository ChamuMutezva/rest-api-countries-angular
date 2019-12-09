import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountriesComponent } from './countries/countries.component';
import { CountryDetailComponent } from './country-detail/country-detail.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: "countries", component: CountriesComponent },
  { path: "countries/:name", component: CountryDetailComponent },
  { path: "login", component: LoginComponent},
  { path: "", redirectTo: "countries", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
