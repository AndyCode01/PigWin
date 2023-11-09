import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-apuesta',
  templateUrl: './apuesta.component.html',
  styleUrls: ['./apuesta.component.css'],
})
export class ApuestaComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  //Objeto donde se guarda la info del cliente
  Apuestas: Array<any> = [];
  apuestasFiltradas: Array<any> = [];
  apuestaModificable: Array<any>=[];
  keysApuesta: Array<any> = [];
  newApuesta: any = [];

  Clientes: Array<any> = [];
  Partidos: Array<any> = [];
  Tickets: Array<any> = [];

  equiposByPartido: Array<any> = [];

  error: boolean = false;

  showTable: boolean = false;
  filters: Array<string> = [];
  valuefilters: Array<string> = [];

  switchInputBusqueda: boolean = false;

  showInputModificar: boolean = false;

  FormBusquedaApuesta = new FormGroup({
    TipoBusquedaCliente: new FormControl(),
    ValorBusquedaCliente: new FormControl(),
  });

  FormCrearApuesta = new FormGroup({
    PartidoApuesta: new FormControl(),
    TicketApuesta: new FormControl(),
    'Monto Apuesta': new FormControl(),
    EquipoApuesta: new FormControl(),
  });

  FormModificarApuesta = new FormGroup({
    PartidoApuesta: new FormControl(),
    TicketApuesta: new FormControl(),
    'Monto Apuesta': new FormControl(),
    EquipoApuesta: new FormControl(),
  });

  public consultaApuestasTotales() {
    this.servi.getApuestasTotales().subscribe((data) => {
      this.Apuestas = data;
      this.keysApuesta = Object.keys(this.Apuestas[0]);
      this.filtros(this.FormBusquedaApuesta);
    });
  }

  public consultaClientesTotales() {
    this.servi.getClientesTotales().subscribe((data) => {
      this.Clientes = data;
    });
  }

  public consultaTicketsTotales() {
    this.servi.getTicketTotal().subscribe((data) => {
      this.Tickets = data;
    });
  }

  public consultaPartidosTotales() {
    this.servi.getPartidoTotal().subscribe((data) => {
      this.Partidos = data;
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Apuestas.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public filtros(Form: FormGroup) {
    const tipoBusqueda = Form.getRawValue()['TipoBusquedaCliente'];
    if (tipoBusqueda == 'Cliente') this.switchInputBusqueda = true;
    else {
      this.switchInputBusqueda = false;
    }
    this.valuefilters = this.listaValoresAtributo(tipoBusqueda);
  }

  public listaValoresAtributo(tipoBusqueda: string) {
    let valores: Array<string> = [];
    let flag: boolean = true;
    for (let index = 0; index < this.Apuestas.length; index++) {
      valores.filter((valor) => {
        if (valor == this.Apuestas[index][tipoBusqueda]) flag = false;
      });
      if (flag == true) valores.push(this.Apuestas[index][tipoBusqueda]);
      flag = true;
    }
    return valores;
  }

  public valoresByEquipo() {
    return this.servi.getEquiposTotales().pipe(map((data) => data));
  }

  public async buscarValorEquipo(valor: string) {
    let id_tipo_catalogo: number = 0;
    let equipos: any;

    equipos = await this.valoresByEquipo().toPromise();

    for (let index = 0; index < equipos?.length; index++) {
      if (valor == equipos[index].NombreEquipo) {
        id_tipo_catalogo = equipos[index].id_equipos;
      }
    }
    return id_tipo_catalogo;
  }

  public async BuscarApuesta(Form: FormGroup) {
    const valores = {
      tipoBusqueda: Form.getRawValue()['TipoBusquedaCliente'],
      valorFiltro: Form.getRawValue()['ValorBusquedaCliente'],
    };
    switch (valores?.tipoBusqueda) {
      case 'Cliente':
        this.servi.getApuestaByCliente(valores?.valorFiltro).subscribe(
          (data) => {
            this.error = false;
            this.apuestasFiltradas = data;
          },
          (error) => {
            this.error = true;
          }
        );
        break;
      case 'id_apuestas':
        this.servi.getApuestaByID(valores?.valorFiltro).subscribe((data) => {
          this.apuestasFiltradas = data;
          this.apuestaModificable = data;
        });
        break;
      default:
        break;
    }
  }

  public getEquipoByParido(form: FormGroup) {
    const values = form.getRawValue()['PartidoApuesta'];
    for (let index = 0; index < this.Partidos.length; index++) {
      if (this.Partidos[index].id_partidos == values) {
        this.equiposByPartido = [
          this.Partidos[index].Equipo_Local,
          this.Partidos[index].Equipo_Visitante,
        ];
      }
    }
  }

  public async registrarApuesta() {
    let newApuesta: any = {};
    const values = this.FormCrearApuesta.getRawValue();
    for (const key in values) {
      if (key == 'EquipoApuesta') {
        newApuesta[key.replace(/ /g, '')] = await this.buscarValorEquipo(
          values[key]
        );
      } else {
        newApuesta[key.replace(/ /g, '')] = values[key];
      }
    }

    try {
      const res = await this.servi.CrearApuesta(newApuesta);
      console.log(newApuesta);
      this.FormCrearApuesta.reset();
      this.consultaApuestasTotales();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  public async modificarApuesta() {
    let updateApuesta: any = {};
    const values = this.apuestasFiltradas[0];
    for (const key in values) {
      if (key == 'EquipoApuesta') {
        updateApuesta[key.replace(/ /g, '')] = await this.buscarValorEquipo(
          values[key]
        );
      } else if(key=='Cliente'){
        updateApuesta['TicketApuesta'] = values[key];
      }
      else {
        updateApuesta[key.replace(/ /g, '')] = values[key];
      }
    }
    console.log(updateApuesta);
    try {
      const res = await this.servi.ModificarApuesta(updateApuesta);
      console.log(updateApuesta);
      this.FormModificarApuesta.reset();
      this.consultaApuestasTotales();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  public InputModificar() {
    console.log(this.apuestaModificable, this.apuestasFiltradas);
    if (this.showInputModificar == true) this.showInputModificar = false;
    else {
      this.showInputModificar = true;
    }
  }

  ngOnInit(): void {
    this.consultaApuestasTotales();
    this.consultaClientesTotales();
    this.consultaPartidosTotales();
    this.consultaTicketsTotales();
    this.FormBusquedaApuesta = this.formBuilder.group({
      TipoBusquedaCliente: [],
      ValorBusquedaCliente: '',
    });
    this.FormCrearApuesta = this.formBuilder.group({
      PartidoApuesta: 0,
      TicketApuesta: 0,
      'Monto Apuesta': 10000,
      EquipoApuesta: '',
    });
    this.FormModificarApuesta = this.formBuilder.group({
      PartidoApuesta: 0,
      TicketApuesta: 0,
      'Monto Apuesta': 0,
      EquipoApuesta: '',
    });
  }
}
