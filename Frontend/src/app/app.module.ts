import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

// Librería para poder consumir el servicio
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MiservicioService } from './miservicio.service';
import { AppComponent } from './appcomponent/app.component';
import { CatauniversalComponent } from './catauniversal/catauniversal.component';
import { TicketComponent } from './ticket/ticket.component';
import { PuntoventaComponent } from './puntoventa/puntoventa.component';
import { PartidoComponent } from './partido/partido.component';
import { ClienteComponent } from './cliente/cliente.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { EquipoComponent } from './equipo/equipo.component';
import { ApuestaComponent } from './apuesta/apuesta.component';




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
  {
    path: 'Cliente',
    component: ClienteComponent,
  },
  {
    path: 'Equipo',
    component: EquipoComponent,
  },
  {
    path: 'Apuesta',
    component: ApuestaComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    CatauniversalComponent,
    TicketComponent,
    PuntoventaComponent,
    PartidoComponent,
    ClienteComponent,
    EquipoComponent,
    ApuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [MiservicioService],
  bootstrap: [AppComponent],
})
export class AppModule {}
