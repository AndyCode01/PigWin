import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Librería para poder consumir el servicio
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MiservicioService } from './miservicio.service';
import { AppComponent } from './appcomponent/app.component';
import { CatauniversalComponent } from './catauniversal/catauniversal.component';
import { TicketComponent } from './ticket/ticket.component';
import { PuntoventaComponent } from './puntoventa/puntoventa.component';
import { PartidoComponent } from './partido/partido.component';


const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'prefix',
    redirectTo: 'Inicio',
  },
  {
    path: 'Inicio',
    component: CatauniversalComponent,
  },
  {
    path: 'Ticket',
    component: TicketComponent,
  },
  {
    path: 'PuntoVenta',
    component: PuntoventaComponent,
  },
  {
    path: 'Partido',
    component: PartidoComponent,
  },
];

@NgModule({
  declarations: [AppComponent, CatauniversalComponent, TicketComponent, PuntoventaComponent, PartidoComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes), 
    HttpClientModule, 
  ],
  providers: [MiservicioService],
  bootstrap: [AppComponent],
})
export class AppModule {}