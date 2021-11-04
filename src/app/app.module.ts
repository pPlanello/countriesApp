import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CapitalModule } from './pages/capital/capital.module';
import { PaisModule } from './pages/pais/pais.module';
import { RegionModule } from './pages/region/region.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CapitalModule,
    PaisModule,
    RegionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
