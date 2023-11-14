import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css'],
})
export class EquipoComponent implements OnInit {
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
  Equipos: Array<any> = [];
  keysEquipo: Array<any> = [];
  equipoFiltrados: Array<any> = [];

  showTable: boolean = false;
  showInputModificar: boolean = false;

  isSubmitted = {
    CrearApuesta: false,
    BusquedaCliente: false,
    ModificarCliente: false,
  };

  Catalogos: any = {
    Deporte: [],
  };

  inputFormCliente: any = [
    { label: 'Nombre del equipo', controlName: 'NombreEquipo' },
  ];

  selectFormCliente: any = [{ label: 'Deporte', controlName: 'Deporte' }];

  selectFormBusquedaCliente: any = [
    { label: 'Nombre', value: 'nombre' },
    { label: 'id', value: 'id_equipos' },
  ];

  valoresBusqueda: any = [];

  FormBusquedaCliente = this.formBuilder.group({
    TipoBusquedaCliente: ['', Validators.required],
    ValorBusquedaCliente: [1, Validators.required],
  });

  FormCrearCliente = this.formBuilder.group({
    NombreEquipo: ['', Validators.required],
    Deporte: [0, Validators.required],
  });

  setCrearClienteSelectValue() {
    let CrearApuesta = {
      Deporte: this.Catalogos?.Deporte[0].id_catalogo_universal,
    };
    this.FormCrearCliente.patchValue(CrearApuesta);
  }

  FormModificarCliente = this.formBuilder.group({
    id_equipos: '',
    NombreEquipo: ['', Validators.required],
    Deporte: [0, Validators.required],
  });

  setModificarClienteSelectValue() {
    let deporte;
    for (let index = 0; index < this.Catalogos?.Deporte.length; index++) {
      if (
        this.equipoFiltrados[0]['Deporte'] ==
        this.Catalogos?.Deporte[index].NombreCatalogo
      )
        deporte = this.Catalogos?.Deporte[index].id_catalogo_universal;
    }
    console.log(this.equipoFiltrados[0]);

    let ModificarCliente = {
      id_equipos: this.equipoFiltrados[0].id_equipos,
      NombreEquipo: this.equipoFiltrados[0].NombreEquipo,
      Deporte: deporte,
    };
    this.FormModificarCliente.patchValue(ModificarCliente);
  }

  public consultaClientesTotales() {
    this.servi.getEquiposTotales().subscribe((data) => {
      this.Equipos = data;
      this.keysEquipo = Object.keys(this.Equipos[0]);
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Equipos.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public async getCatalogos() {
    this.Catalogos = {
      Deporte: await this.valoresByTipoCatalogo(3).toPromise(),
    };
  }

  public getValoresBusqueda(tipoBusqueda: string) {
    switch (tipoBusqueda) {
      case 'nombre':
        for (let index = 0; index < this.Equipos.length; index++) {
          this.valoresBusqueda.push({
            value: this.Equipos[index].id_equipos,
            label: this.Equipos[index].NombreEquipo,
          });
        }
        break;
      case 'id_equipos':
        for (let index = 0; index < this.Equipos.length; index++) {
          this.valoresBusqueda.push({
            value: this.Equipos[index].id_equipos,
            label: this.Equipos[index].id_equipos,
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
      const newEquipo = this.FormCrearCliente.value;
      try {
        const res = await this.servi.CrearEquipo(newEquipo);
        console.log(newEquipo);
        this.FormCrearCliente.reset();
        this.setCrearClienteSelectValue();
        this.consultaClientesTotales();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    } else {
      this.isSubmitted.CrearApuesta = true;
    }
  }

  async onSubmitBuscarCliente(): Promise<void> {
    const valoresBusqueda = this.FormBusquedaCliente.value;
    try {
      switch (valoresBusqueda.TipoBusquedaCliente) {
        default:
          this.servi
            .getEquipoByID(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.equipoFiltrados = data;
              this.setModificarClienteSelectValue();
            });
          break;
      }
    } catch (error) {}
  }

  async onSubmitModificarCliente(): Promise<any> {
    if (!this.FormModificarCliente.invalid) {
      const updateEquipo = this.FormModificarCliente.value;
      try {
        console.log(updateEquipo);
        const res = await this.servi.ModificarEquipo(updateEquipo);
        this.consultaClientesTotales();
        this.FormModificarCliente.reset;
        this.equipoFiltrados = [];
        this.FormBusquedaCliente.get('TipoBusquedaCliente')?.setValue(
          'id_equipos'
        );
        this.FormBusquedaCliente.get('ValorBusquedaCliente')?.setValue(
          updateEquipo.id_equipos
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
