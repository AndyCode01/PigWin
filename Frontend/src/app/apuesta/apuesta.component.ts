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

  showTable: boolean = false;
  filters: Array<string> = [];
  valuefilters: Array<string> = [];

  showInputModificar: boolean = false;

  FormBusquedaCliente = new FormGroup({
    TipoBusquedaCliente: new FormControl(),
    ValorBusquedaCliente: new FormControl(),
  });

  FormCrearCliente = new FormGroup({
    'Primer Nombre': new FormControl(),
    'Segundo Nombre': new FormControl(),
    'Primer Apellido': new FormControl(),
    'Segundo Apellido': new FormControl(),
    'Tipo Documento': new FormControl(),
    Sexo: new FormControl(),
    'Metodo De Pago': new FormControl(),
    'Numero Documento': new FormControl(),
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

  public consultaClientesTotales() {
    this.servi.getApuestasTotales().subscribe((data) => {
      this.Apuestas = data;
      this.keysApuesta = Object.keys(this.Apuestas[0]);
      this.filtros(this.FormBusquedaCliente);
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

  public async buscarValorCatalogo(atributo: string, valor: string) {
    let id_tipo_catalogo: number = 0;
    let catalogo: any;

    switch (atributo) {
      case 'Tipo Documento':
        catalogo = await this.valoresByTipoCatalogo(4).toPromise();
        break;
      case 'Sexo':
        catalogo = await this.valoresByTipoCatalogo(6).toPromise();
        break;
      case 'Metodo De Pago':
        catalogo = await this.valoresByTipoCatalogo(5).toPromise();
        break;
    }

    for (let index = 0; index < catalogo?.length; index++) {
      if (valor == catalogo[index].NombreCatalogo) {
        id_tipo_catalogo = catalogo[index].id_catalogo_universal;
      }
    }
    return id_tipo_catalogo;
  }

  public async BuscarCliente(Form: FormGroup) {
    const valores = {
      tipoBusqueda: Form.getRawValue()['TipoBusquedaCliente'],
      valorFiltro: Form.getRawValue()['ValorBusquedaCliente'],
    };

    if (Number.isNaN(Number.parseInt(valores?.valorFiltro))) {
      let id_tipo_documento = await this.buscarValorCatalogo(
        valores?.tipoBusqueda,
        valores?.valorFiltro
      );
      this.servi
        .getClienteByTipoDocumento(id_tipo_documento)
        .subscribe((data) => {
          this.apuestasFiltradas = data;
        });
    } else {
      this.servi.getClienteByID(valores?.valorFiltro).subscribe((data) => {
        this.apuestasFiltradas = data;
      });
    }
  }

  public async registrarCliente() {
    let newCliente: any = {};
    const values = this.FormCrearCliente.getRawValue();
    for (const key in values) {
      if (key == 'Tipo Documento' || key == 'Sexo' || key == 'Metodo De Pago') {
        newCliente[key.replace(/ /g, '')] = await this.buscarValorCatalogo(
          key,
          values[key]
        );
      } else {
        newCliente[key.replace(/ /g, '')] = values[key];
      }
    }

    try {
      const res = await this.servi.CrearCliente(newCliente);
      console.log(newCliente);
      this.FormCrearCliente.reset();
      this.consultaClientesTotales();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  public async modificarCliente() {
    let updateCliente: any = {};
    const values = this.apuestasFiltradas[0];
    for (const key in values) {
      if (key == 'Tipo Documento' || key == 'Sexo' || key == 'Metodo De Pago') {
        updateCliente[key.replace(/ /g, '')] = await this.buscarValorCatalogo(
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
      this.consultaClientesTotales();
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
    this.consultaClientesTotales();
    this.FormBusquedaCliente = this.formBuilder.group({
      TipoBusquedaCliente: [],
      ValorBusquedaCliente: '',
    });
    this.FormCrearCliente = this.formBuilder.group({
      'Primer Nombre': '',
      'Segundo Nombre': '',
      'Primer Apellido': '',
      'Segundo Apellido': '',
      'Tipo Documento': '',
      Sexo: '',
      'Metodo De Pago': '',
      NumeroDocumento: '',
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
