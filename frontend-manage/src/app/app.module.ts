import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { EngadirComponent } from './engadir/engadir.component';
import { ListarComponent } from './listar/listar.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ApiComponent } from './api/api.component';
import { ContrasinalComponent } from './contrasinal/contrasinal.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EngadirComponent,
    ListarComponent,
    BuscarComponent,
    ApiComponent,
    ContrasinalComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
