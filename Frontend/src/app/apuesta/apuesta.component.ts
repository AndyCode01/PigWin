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

  FormBusquedaCliente = new FormGroup({
    TipoBusquedaCliente: new FormControl(),
    ValorBusquedaCliente: new FormControl(),
  });

  FormCrearApuesta = new FormGroup({
    PartidoApuesta: new FormControl(),
    TicketApuesta: new FormControl(),
    'Monto Apuesta': new FormControl(),
    EquipoApuesta: new FormControl(),
  });

  FormModificarCliente = new FormGroup({
    TipoBusquedaCliente: new FormControl(),
    ValorBusquedaCliente: new FormControl(),
    'Primer Nombre': new FormControl(),
    'Segundo Nombre': new FormControl(),
    'Primer Apellido': new FormControl(),
    'Segundo Apellido': new FormControl(),
    'Tipo Documento': new FormControl(),
    Sexo: new FormControl(),
    'Metodo De Pago': new FormControl(),
    'Numero Documento': new FormControl(),
  });

  public consultaApuestasTotales() {
    this.servi.getApuestasTotales().subscribe((data) => {
      this.Apuestas = data;
      this.keysApuesta = Object.keys(this.Apuestas[0]);
      this.filtros(this.FormBusquedaCliente);
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

  public valoresByTipoCatalogo(id_tipo_catalogo: number) {
    return this.servi
      .getTipoCatalogo(id_tipo_catalogo)
      .pipe(map((data) => data));
  }

  public async buscarValorEquipo(atributo: string, valor: string) {
    let id_tipo_catalogo: number = 0;
    let equipos: any;

    switch (atributo) {
      case 'Tipo Documento':
        equipos = await this.valoresByTipoCatalogo(4).toPromise();
        break;
      case 'Sexo':
        equipos = await this.valoresByTipoCatalogo(6).toPromise();
        break;
      case 'Metodo De Pago':
        equipos = await this.valoresByTipoCatalogo(5).toPromise();
        break;
    }

    for (let index = 0; index < equipos?.length; index++) {
      if (valor == equipos[index].NombreCatalogo) {
        id_tipo_catalogo = equipos[index].id_catalogo_universal;
      }
    }
    return id_tipo_catalogo;
  }

  public async BuscarCliente(Form: FormGroup) {
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
        });
        break;
      default:
        break;
    }
  }

  public getEquipoByParido() {
    const values = this.FormCrearApuesta.getRawValue()['PartidoApuesta'];
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
    console.log(values);

    for (const key in values) {
      if (key == 'EquipoApuesta') {
        newApuesta[key.replace(/ /g, '')] = await this.buscarValorEquipo(
          key,
          values[key]
        );
      } else {
        newApuesta[key.replace(/ /g, '')] = values[key];
      }
    }

    // try {
    //   const res = await this.servi.CrearCliente(newApuesta);
    //   console.log(newApuesta);
    //   this.FormCrearApuesta.reset();
    //   this.consultaApuestasTotales();
    //   console.log(res);
    // } catch (error) {
    //   console.log(error);
    // }
  }

  public async modificarCliente() {
    let updateCliente: any = {};
    const values = this.apuestasFiltradas[0];
    for (const key in values) {
      if (key == 'Tipo Documento' || key == 'Sexo' || key == 'Metodo De Pago') {
        updateCliente[key.replace(/ /g, '')] = await this.buscarValorEquipo(
          key,
          values[key]
        );
      } else {
        updateCliente[key.replace(/ /g, '')] = values[key];
      }
    }
    try {
      const res = await this.servi.ModificarCliente(updateCliente);
      console.log(updateCliente);
      this.consultaApuestasTotales();
      this.InputModificar();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  public InputModificar() {
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
    this.FormBusquedaCliente = this.formBuilder.group({
      TipoBusquedaCliente: [],
      ValorBusquedaCliente: '',
    });
    this.FormCrearApuesta = this.formBuilder.group({
      PartidoApuesta: 0,
      TicketApuesta: 0,
      'Monto Apuesta': 10000,
      EquipoApuesta:'',
    });
    this.FormModificarCliente = this.formBuilder.group({
      TipoBusquedaCliente: [],
      ValorBusquedaCliente: '',
      'Primer Nombre': '',
      'Segundo Nombre': '',
      'Primer Apellido': '',
      'Segundo Apellido': '',
      'Tipo Documento': '',
      Sexo: '',
      'Metodo De Pago': '',
      'Numero Documento': '',
    });
  }
}
