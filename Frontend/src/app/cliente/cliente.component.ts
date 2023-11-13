import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
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

  public valoresByTipoCatalogo(id_tipo_catalogo: number) {
    return this.servi
      .getTipoCatalogo(id_tipo_catalogo)
      .pipe(map((data) => data));
  }

  //Objeto donde se guarda la info del cliente
  Clientes: Array<any> = [];
  keysCliente: Array<any> = [];
  clientesFiltrados: Array<any> = [];

  showTable: boolean = false;
  showInputModificar: boolean = false;

  isSubmitted = {
    CrearCliente: false,
    BusquedaCliente: false,
    ModificarCliente: false,
  };

  Catalogos: any = {
    TipoDocumento: [],
    Sexo: [],
    MetodoDePago: [],
  };

  inputFormCliente: any = [
    { label: 'Primer Nombre', controlName: 'PrimerNombre' },
    { label: 'Segundo Nombre', controlName: 'SegundoNombre' },
    { label: 'Primer Apellido', controlName: 'PrimerApellido' },
    { label: 'Segundo Apellido', controlName: 'SegundoApellido' },
    { label: 'Número de documento', controlName: 'NumeroDocumento' },
  ];

  selectFormCliente: any = [
    { label: 'Tipo de documento', controlName: 'TipoDocumento' },
    { label: 'Sexo', controlName: 'Sexo' },
    { label: 'Metodo de pago', controlName: 'MetodoDePago' },
  ];

  selectFormBusquedaCliente: any = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'id', value: 'id_clientes' },
    { label: 'Tipo de documento', value: 'id_tipo_documento' },
  ];

  valoresBusqueda: any = [];

  FormBusquedaCliente = this.formBuilder.group({
    TipoBusquedaCliente: ['', Validators.required],
    ValorBusquedaCliente: [1, Validators.required],
  });

  FormCrearCliente = this.formBuilder.group({
    PrimerNombre: ['', Validators.required],
    SegundoNombre: '',
    PrimerApellido: ['', Validators.required],
    SegundoApellido: '',
    TipoDocumento: [0, Validators.required],
    Sexo: [0, Validators.required],
    MetodoDePago: [0, Validators.required],
    NumeroDocumento: ['', Validators.required],
  });

  setCrearClienteSelectValue() {
    let CrearCliente = {
      TipoDocumento: this.Catalogos?.TipoDocumento[0]?.id_catalogo_universal,
      Sexo: this.Catalogos?.Sexo[0]?.id_catalogo_universal,
      MetodoDePago: this.Catalogos?.MetodoDePago[0]?.id_catalogo_universal,
    };
    this.FormCrearCliente.patchValue(CrearCliente);
  }

  FormModificarCliente = this.formBuilder.group({
    id_clientes: '',
    PrimerNombre: ['', Validators.required],
    SegundoNombre: '',
    PrimerApellido: ['', Validators.required],
    SegundoApellido: '',
    TipoDocumento: [0, Validators.required],
    Sexo: [0, Validators.required],
    MetodoDePago: [0, Validators.required],
    NumeroDocumento: ['', Validators.required],
  });

  setModificarClienteSelectValue() {
    let tipoDocumento;
    let sexo;
    let metodoPago;
    for (let index = 0; index < this.Catalogos?.TipoDocumento.length; index++) {
      if (
        this.clientesFiltrados[0]['Tipo Documento'] ==
        this.Catalogos?.TipoDocumento[index].NombreCatalogo
      )
        tipoDocumento =
          this.Catalogos?.TipoDocumento[index].id_catalogo_universal;
    }
    for (let index = 0; index < this.Catalogos?.Sexo.length; index++) {
      if (
        this.clientesFiltrados[0]['Sexo'] ==
        this.Catalogos?.Sexo[index].NombreCatalogo
      )
        sexo = this.Catalogos?.Sexo[index].id_catalogo_universal;
    }
    for (let index = 0; index < this.Catalogos?.MetodoDePago.length; index++) {
      if (
        this.clientesFiltrados[0]['Metodo De Pago'] ==
        this.Catalogos?.MetodoDePago[index].NombreCatalogo
      )
        metodoPago = this.Catalogos?.MetodoDePago[index].id_catalogo_universal;
    }
    let ModificarCliente = {
      id_clientes: this.clientesFiltrados[0].id_clientes,
      PrimerNombre: this.clientesFiltrados[0]['Primer Nombre'],
      SegundoNombre: this.clientesFiltrados[0]['Segundo Nombre'],
      PrimerApellido: this.clientesFiltrados[0]['Primer Apellido'],
      SegundoApellido: this.clientesFiltrados[0]['Segundo Apellido'],
      TipoDocumento: tipoDocumento,
      Sexo: sexo,
      MetodoDePago: metodoPago,
      NumeroDocumento: this.clientesFiltrados[0]['Numero Documento'],
    };
    this.FormModificarCliente.patchValue(ModificarCliente);
  }

  public consultaClientesTotales() {
    this.servi.getClientesTotales().subscribe((data) => {
      this.Clientes = data;
      this.keysCliente = Object.keys(this.Clientes[0]);
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Clientes.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public async getCatalogos() {
    this.Catalogos = {
      TipoDocumento: await this.valoresByTipoCatalogo(4).toPromise(),
      Sexo: await this.valoresByTipoCatalogo(6).toPromise(),
      MetodoDePago: await this.valoresByTipoCatalogo(5).toPromise(),
    };
  }

  public getValoresBusqueda(tipoBusqueda: string) {
    switch (tipoBusqueda) {
      case 'id_tipo_documento':
        for (
          let index = 0;
          index < this.Catalogos.TipoDocumento.length;
          index++
        ) {
          this.valoresBusqueda.push({
            value: this.Catalogos.TipoDocumento[index].id_catalogo_universal,
            label: this.Catalogos.TipoDocumento[index].NombreCatalogo,
          });
        }
        break;
      case 'nombre':
        for (let index = 0; index < this.Clientes.length; index++) {
          this.valoresBusqueda.push({
            value: this.Clientes[index].id_clientes,
            label:
              this.Clientes[index]['Primer Nombre'] +
              ' ' +
              this.Clientes[index]['Segundo Nombre'] +
              ' ' +
              this.Clientes[index]['Primer Apellido'],
          });
        }
        break;
      case 'id_clientes':
        for (let index = 0; index < this.Clientes.length; index++) {
          this.valoresBusqueda.push({
            value: this.Clientes[index].id_clientes,
            label: this.Clientes[index].id_clientes,
          });
        }
        break;
    }
    let valor = {
      ValorBusquedaCliente: this.valoresBusqueda[0].value,
    };
    this.FormBusquedaCliente.patchValue(valor);
  }

  async ngOnInit(): Promise<void> {
    this.consultaClientesTotales();
    await this.getCatalogos();
    this.setCrearClienteSelectValue();
    this.FormBusquedaCliente.get('TipoBusquedaCliente')?.valueChanges.subscribe(
      (tipo) => {
        this.valoresBusqueda = [];
        this.getValoresBusqueda(tipo);
      }
    );
    let valor = {
      TipoBusquedaCliente: 'nombre',
    };
    this.FormBusquedaCliente.patchValue(valor);
  }

  async onSubmitCrearCliente(): Promise<void> {
    if (!this.FormCrearCliente.invalid) {
      const newCliente = this.FormCrearCliente.value;
      try {
        const res = await this.servi.CrearCliente(newCliente);
        console.log(newCliente);
        this.FormCrearCliente.reset();
        this.setCrearClienteSelectValue();
        this.consultaClientesTotales();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.isSubmitted.CrearCliente = true;
    }
  }

  async onSubmitBuscarCliente(): Promise<void> {
    const valoresBusqueda = this.FormBusquedaCliente.value;
    try {
      switch (valoresBusqueda.TipoBusquedaCliente) {
        case 'id_tipo_documento':
          this.servi
            .getClienteByTipoDocumento(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.clientesFiltrados = data;
              this.setModificarClienteSelectValue();
            });
          break;

        default:
          this.servi
            .getClienteByID(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.clientesFiltrados = data;
              this.setModificarClienteSelectValue();
            });
          break;
      }
    } catch (error) {}
  }

  async onSubmitModificarCliente(): Promise<any> {
    if (!this.FormModificarCliente.invalid) {
      const updateCliente = this.FormModificarCliente.value;
      try {
        console.log(updateCliente);
        const res = await this.servi.ModificarCliente(updateCliente);
        this.consultaClientesTotales();
        this.FormModificarCliente.reset;
        this.clientesFiltrados=[]
        this.FormBusquedaCliente.get('TipoBusquedaCliente')?.setValue(
          'id_clientes'
        );
        this.FormBusquedaCliente.get('ValorBusquedaCliente')?.setValue(updateCliente.id_clientes);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
