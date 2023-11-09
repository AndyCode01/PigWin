import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class MiservicioService {
  private Url: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  private extractData(res: Response) {
    let body = JSON.parse('' + res);

    return body || {};
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // SERVICIO  CATALOGO UNIVERSAL
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  getCatalogoTotal(): Observable<any> {
    return this.http.get(this.Url + '/Universal', httpOptions);
  }

  //-------------------------------------------------------------

  getlListCatologoEsp(tipcat: any): Observable<any> {
    return this.http.get(this.Url + '/Universal' + tipcat, httpOptions);
  }

  getTipoCatalogo(tipo_catalogo: number): Observable<any> {
    return this.http.get(this.Url + `/Universal/${tipo_catalogo}`, httpOptions);
  }
  //-------------------------------------------------------------
  //-------------------------------------------------------------

  getlCatEspSelec(IdCat: any): Observable<any> {
    return this.http.get(this.Url + '/Universal' + IdCat, httpOptions);
  } // Método para insertar un nuevo Catalogo

  getlCatEdit(Id: any): Observable<any> {
    return this.http.get(this.Url + '/Universal/id/' + Id, httpOptions);
  }
  //-------------------------------------------------------------

  async CrearCatalogoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + '/Universal', Dato, httpOptions).toPromise();
    });
  } //-------------------------------------------------------------

  async ActualizarCatalogoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + '/Universal', Dato, httpOptions).toPromise();
    });
  }

  // Tabla tickets

  getTicketTotal(): Observable<any> {
    return this.http.get(this.Url + '/Ticket', httpOptions);
  }

  async CrearTicketU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + '/Ticket', Dato, httpOptions).toPromise();
    });
  }

  async ActualizarTicketU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + '/Ticket', Dato, httpOptions).toPromise();
    });
  }

  getTicketSeleccionado(id_ticket: any): Observable<any> {
    return this.http.get(this.Url + '/Ticket/id/' + id_ticket, httpOptions);
  }

  //por punto de venta
  getTicketTipPuntoVenta(cadoc: any): Observable<any> {
    return this.http.get(this.Url + '/Ticket/' + cadoc, httpOptions);
  }

  // traer la consulta general de los puntos de venta
  getPuntoVentaTotales(): Observable<any> {
    return this.http.get(this.Url + '/PuntoVenta', httpOptions);
  }

  //-------------------------------------------------------------

  // tabla de punto de venta

  async CrearPuntoVentaU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + '/PuntoVenta', Dato, httpOptions).toPromise();
    });
  }

  getPuntoVentaSeleccionado(id_punto_venta: any): Observable<any> {
    return this.http.get(
      this.Url + '/PuntoVenta/id/' + id_punto_venta,
      httpOptions
    );
  }

  async ActualizarPuntoVentaU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + '/PuntoVenta', Dato, httpOptions).toPromise();
    });
  }

  // Tabla partidos

  getPartidoTotal(): Observable<any> {
    return this.http.get(this.Url + '/Partido', httpOptions);
  }

  getEquiposTotales(): Observable<any> {
    return this.http.get(this.Url + '/Equipo', httpOptions);
  }

  async crearPartidoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.Url + '/Partido', Dato, httpOptions).toPromise();
    });
  }

  getPartidoTipEquipo(id: any): Observable<any> {
    return this.http.get(this.Url + '/Ticket/' + id, httpOptions);
  }

  getPartidoSeleccionado(id_ticket: any): Observable<any> {
    return this.http.get(this.Url + '/Partido/id/' + id_ticket, httpOptions);
  }

  async ActualizarPartidoU(Dato: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.put(this.Url + '/Partido', Dato, httpOptions).toPromise();
    });
  }
  //Para obtiener los deportes totales pero en realidad estoy obteniendo los equipos
  getDeportesTotales(): Observable<any> {
    return this.http.get(this.Url + '/Equipo', httpOptions);
  }

  getPartidoTipDeporte(cadoc: any): Observable<any> {
    return this.http.get(this.Url + '/Equipo/' + cadoc, httpOptions);
  }

  // Tabla clientes

  getClientesTotales(): Observable<any> {
    return this.http.get(this.Url + '/Cliente', httpOptions);
  }

  getClienteByID(id_cliente: number): Observable<any> {
    return this.http.get(this.Url + `/Cliente/id/${id_cliente}`, httpOptions);
  }

  getClienteByTipoDocumento(tipo_documento: number): Observable<any> {
    return this.http.get(this.Url + `/Cliente/${tipo_documento}`, httpOptions);
  }

  async CrearCliente(Dato: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.http
          .post(this.Url + '/Cliente', Dato, httpOptions)
          .toPromise();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async ModificarCliente(Dato: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.http
          .put(this.Url + '/Cliente', Dato, httpOptions)
          .toPromise();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }


  // Equipos
  getEquipoByID(id_equipo: number): Observable<any> {
    return this.http.get(this.Url + `/Equipo/id/${id_equipo}`, httpOptions);
  }

  async CrearEquipo(Dato: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.http
          .post(this.Url + '/Equipo', Dato, httpOptions)

  getApuestasTotales(): Observable<any> {
    return this.http.get(this.Url + '/Apuesta', httpOptions);
  }

  getApuestaByID(id_cliente: number): Observable<any> {
    return this.http.get(this.Url + `/Apuesta/id/${id_cliente}`, httpOptions);
  }

  getApuestaByCliente(id_cliente: number): Observable<any> {
    return this.http.get(this.Url + `/Apuesta/${id_cliente}`, httpOptions);
  }
  
  
  //Apuesta

  async CrearApuesta(Dato: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.http
          .post(this.Url + '/Apuesta', Dato, httpOptions)
          .toPromise();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }

  async ModificarApuesta(Dato: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await this.http
          .put(this.Url + '/Apuesta', Dato, httpOptions)
          .toPromise();
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}

