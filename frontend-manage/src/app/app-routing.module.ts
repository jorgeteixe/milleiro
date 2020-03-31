import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import {EngadirComponent} from './engadir/engadir.component';
import {ListarComponent} from './listar/listar.component';
import {BuscarComponent} from './buscar/buscar.component';
import {ApiComponent} from './api/api.component';
import {ContrasinalComponent} from './contrasinal/contrasinal.component';

const routes: Routes = [
  { path: '', redirectTo: 'tableiro', pathMatch: 'full' },
  { path: 'tableiro', component: DashboardComponent },
  { path: 'engadir', component: EngadirComponent },
  { path: 'listar', component: ListarComponent },
  { path: 'buscar', component: BuscarComponent },
  { path: 'api', component: ApiComponent },
  { path: 'constrasinal', component: ContrasinalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
