import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
})
export class ClienteComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  //Objeto donde se guarda la info del cliente
  Clientes: Array<any> = [];
  clientesFiltrados: Array<any> = [];
  keysCliente: Array<any> = [];

  showTable: boolean = false;
  filters: Array<string> = [];
  valuefilters: Array<string> = [];

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
    'NumeroDocumento': new FormControl()
  });

  public consultaClientesTotales() {
    this.servi.getClientesTotales().subscribe((data) => {
      this.Clientes = data;
      this.keysCliente = Object.keys(this.Clientes[0]);
      this.filtros();
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Clientes.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public filtros() {
    const tipoBusqueda =
      this.FormBusquedaCliente.getRawValue()['TipoBusquedaCliente'];
    this.valuefilters = this.listaValoresAtributo(tipoBusqueda);
  }

  public listaValoresAtributo(tipoBusqueda: string) {
    let valores: Array<string> = [];
    let flag: boolean = true;
    for (let index = 0; index < this.Clientes.length; index++) {
      valores.filter((valor) => {
        if (valor == this.Clientes[index][tipoBusqueda]) flag = false;
      });
      if (flag == true) valores.push(this.Clientes[index][tipoBusqueda]);
      flag = true;
    }
    return valores;
  }

  public valoresByTipoCatalogo(id_tipo_catalogo: number) {
    return this.servi.getTipoCatalogo(id_tipo_catalogo).pipe(map((data) => data));
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

  public async BuscarCliente() {
    const tipoBusqueda =
      this.FormBusquedaCliente.getRawValue()['TipoBusquedaCliente'];
    const valorFiltro =
      this.FormBusquedaCliente.getRawValue()['ValorBusquedaCliente'];
    if (Number.isNaN(Number.parseInt(valorFiltro))) {
      let id_tipo_documento = await this.buscarValorCatalogo(
        tipoBusqueda,
        valorFiltro
      ); ;
      this.servi
        .getClienteByTipoDocumento(id_tipo_documento)
        .subscribe((data) => {
          this.clientesFiltrados = data;
        });
    } else {
      this.servi.getClienteByID(valorFiltro).subscribe((data) => {
        this.clientesFiltrados = data;
      });
    }
  }

  public async registrarCliente() {
    let newCliente: any = {};
    const values = this.FormCrearCliente.getRawValue();
    for (const key in values) {
      if (key == 'Tipo Documento' || key == 'Sexo' || key == 'Metodo De Pago')
        {newCliente[key.replace(/ /g, '')] = await this.buscarValorCatalogo(
          key,
          values[key]
        );}
      else {
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
      'NumeroDocumento':''
    });
  }
}
