import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {EngadirComponent} from './engadir/engadir.component';
import {ListarComponent} from './listar/listar.component';
import {ApiComponent} from './api/api.component';
import {ProdutoComponent} from './produto/produto.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'tableiro', pathMatch: 'full' },
  { path: 'tableiro', component: DashboardComponent },
  { path: 'engadir', component: EngadirComponent },
  { path: 'listar', component: ListarComponent },
  { path: 'listar/:id', component: ProdutoComponent },
  { path: 'api', component: ApiComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
