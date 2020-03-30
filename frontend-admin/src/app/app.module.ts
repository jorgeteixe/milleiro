import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { TooltipModule } from 'ng2-tooltip-directive';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RefsComponent } from './refs/refs.component';
import { TrazaComponent } from './traza/traza.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    RefsComponent,
    TrazaComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    QRCodeModule,
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
