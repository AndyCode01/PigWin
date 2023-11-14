import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-partido',
  templateUrl: './partido.component.html',
  styleUrls: ['./partido.component.css'],
})
export class PartidoComponent implements OnInit {
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

  public valoresByEquipo() {
    return this.servi.getEquiposTotales().pipe(map((data) => data));
  }

  //Objeto donde se guarda la info del cliente
  Partidos: Array<any> = [];
  keysPartido: Array<any> = [];
  partidosFiltrados: Array<any> = [];

  showTable: boolean = false;
  showInputModificar: boolean = false;

  isSubmitted = {
    CrearCliente: false,
    BusquedaCliente: false,
    ModificarCliente: false,
  };

  Catalogos: any = {
    EquiposFutbol: [],
    EquiposBaloncesto: [],
    EquiposValorant: [],
    EquiposRegistrar: [],
    EquiposModificar:[],
    Deporte: [],
  };

  inputFormCliente: any = [
    { label: 'Fecha del partido', controlName: 'FechaPartido' },
  ];

  selectFormCliente: any = [
    { label: 'Deporte', controlName: 'Deporte' },
    { label: 'EquipoLocal', controlName: 'EquipoLocal' },
    { label: 'EquipoVisitante', controlName: 'EquipoVisitante' },
  ];

  selectFormBusquedaCliente: any = [
    { label: 'Deporte', value: 'deporte' },
    { label: 'id', value: 'id_partidos' },
  ];

  valoresBusqueda: any = [];

  FormBusquedaCliente = this.formBuilder.group({
    TipoBusquedaCliente: ['', Validators.required],
    ValorBusquedaCliente: [1, Validators.required],
  });

  FormCrearCliente = this.formBuilder.group({
    FechaPartido: ['', Validators.required],
    Deporte: [0, Validators.required],
    EquipoLocal: [0, Validators.required],
    EquipoVisitante: [0, Validators.required],
  });

  setCrearClienteSelectValue() {
    let CrearCliente = {
      Deporte: this.Catalogos.Deporte[0].id_catalogo_universal,
      EquipoLocal: this.Catalogos.EquiposFutbol[0].id_equipos,
      EquipoVisitante: this.Catalogos.EquiposFutbol[1].id_equipos,
    };
    this.FormCrearCliente.patchValue(CrearCliente);
  }

  FormModificarCliente = this.formBuilder.group({
    id_partidos: '',
    FechaPartido: ['', Validators.required],
    Deporte: [0, Validators.required],
    EquipoLocal: [0, Validators.required],
    EquipoVisitante: [0, Validators.required],
  });

  setModificarClienteSelectValue() {
    let equipoLocal;
    let equipoVisitante;
    let deporte;

    for (
      let index = 0;
      index < this.Catalogos?.EquiposModificar.length;
      index++
    ) {
      if (
        this.partidosFiltrados[0]['Equipo Local'] ==
        this.Catalogos?.EquiposModificar[index].NombreEquipo
      )
        equipoLocal = this.Catalogos?.EquiposModificar[index].id_equipos;
      else if (
        this.partidosFiltrados[0]['Equipo Visitante'] ==
        this.Catalogos?.EquiposModificar[index].NombreEquipo
      )
        equipoVisitante = this.Catalogos?.EquiposModificar[index].id_equipos;
    }
    for (
      let index = 0;
      index < this.Catalogos?.Deporte.length;
      index++
    ) {
      if (
        this.partidosFiltrados[0]['Deporte'] ==
        this.Catalogos?.Deporte[index].NombreCatalogo
      )
        deporte = this.Catalogos?.Deporte[index].id_catalogo_universal;
    }
    const fechaTicket = new Date(this.partidosFiltrados[0].FechaPartido);
    const utcFechaTicket = new Date(
      fechaTicket.getTime() + fechaTicket.getTimezoneOffset() * 60 * 1000
    );
    const formattedFechaTicket = formatDate(
      utcFechaTicket,
      'yyyy-MM-ddTHH:mm',
      'en-US'
    );

    let ModificarCliente = {
      id_partidos: this.partidosFiltrados[0].id_partidos,
      EquipoLocal: equipoLocal,
      EquipoVisitante: equipoVisitante,
      Deporte: deporte,
      FechaPartido: formattedFechaTicket,
    };
    this.FormModificarCliente.patchValue(ModificarCliente);
  }

  public consultaClientesTotales() {
    this.servi.getPartidoTotal().subscribe((data) => {
      this.Partidos = data;
      this.keysPartido = Object.keys(this.Partidos[0]);
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Partidos.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public async getCatalogos() {
    let equipos = await this.valoresByEquipo().toPromise();
    equipos.filter((equipo: any) => {
      switch (equipo.Deporte) {
        case 'Futbol':
          this.Catalogos.EquiposFutbol.push(equipo);
          break;
        case 'Baloncesto':
          this.Catalogos.EquiposBaloncesto.push(equipo);
          break;
        case 'Valorant':
          this.Catalogos.EquiposValorant.push(equipo);
          break;
      }
    });
    this.Catalogos.Deporte = await this.valoresByTipoCatalogo(3).toPromise();
  }

  public async getEquipos(id_catalogo_universal: number, tipo:string) {
    const deporte = await this.servi
      .getlCatEdit(id_catalogo_universal)
      .toPromise();
    switch (deporte[0].NombreCatalogo) {
      case 'Futbol':
        this.Catalogos[tipo] = this.Catalogos.EquiposFutbol;
        break;
      case 'Baloncesto':
        this.Catalogos[tipo] = this.Catalogos.EquiposBaloncesto;
        break;
      case 'Valorant':
        this.Catalogos[tipo] = this.Catalogos.EquiposValorant;
        break;
    }
  }

  public getValoresBusqueda(tipoBusqueda: string) {
    switch (tipoBusqueda) {
      case 'deporte':
        for (let index = 0; index < this.Catalogos.Deporte.length; index++) {
          this.valoresBusqueda.push({
            value: this.Catalogos.Deporte[index].id_catalogo_universal,
            label: this.Catalogos.Deporte[index].NombreCatalogo,
          });
        }
        break;
      case 'id_partidos':
        for (let index = 0; index < this.Partidos.length; index++) {
          this.valoresBusqueda.push({
            value: this.Partidos[index].id_partidos,
            label: this.Partidos[index].id_partidos,
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
    this.FormCrearCliente.get('Deporte')?.valueChanges.subscribe(
      async (tipo) => {
        if(tipo){
          await this.getEquipos(tipo, 'EquiposRegistrar');
          let equipos = {
            EquipoLocal: this.Catalogos.EquiposRegistrar[0]?.id_equipos,
            EquipoVisitante: this.Catalogos.EquiposRegistrar[1]?.id_equipos,
          };
          this.FormCrearCliente.patchValue(equipos);
        }
      }
    );
    this.FormModificarCliente.get('Deporte')?.valueChanges.subscribe(
      async (tipo) => {
        if (tipo) {
          await this.getEquipos(tipo, 'EquiposModificar');
          let equipos = {
            EquipoLocal: this.Catalogos.EquiposModificar[0]?.id_equipos,
            EquipoVisitante: this.Catalogos.EquiposModificar[1]?.id_equipos,
          };
          this.FormModificarCliente.patchValue(equipos);
        }
      }
    );
    let aux = { Deporte: 19 };
    this.FormCrearCliente.patchValue(aux);
    this.FormBusquedaCliente.get('TipoBusquedaCliente')?.valueChanges.subscribe(
      (tipo) => {
        this.valoresBusqueda = [];
        this.getValoresBusqueda(tipo);
      }
    );
    let valor = {
      TipoBusquedaCliente: 'deporte',
    };
    this.FormBusquedaCliente.patchValue(valor);
  }

  async onSubmitCrearCliente(): Promise<void> {
    if (!this.FormCrearCliente.invalid) {
      const newCliente = this.FormCrearCliente.value;
      try {
        const res = await this.servi.crearPartidoU(newCliente);
        console.log(newCliente);
        this.FormCrearCliente.reset();
        this.consultaClientesTotales();
        this.setCrearClienteSelectValue();
        // this.setModificarClienteSelectValue();
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
        case 'deporte':
          this.servi
            .getPartidoTipEquipo(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.partidosFiltrados = data;
              this.setModificarClienteSelectValue();
            });
          break;

        default:
          this.servi
            .getPartidoSeleccionado(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.partidosFiltrados = data;
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
        const res = await this.servi.ActualizarPartidoU(updateCliente);
        this.consultaClientesTotales();
        this.FormModificarCliente.reset;
        this.partidosFiltrados = [];
        this.FormBusquedaCliente.get('TipoBusquedaCliente')?.setValue(
          'id_partidos'
        );
        this.FormBusquedaCliente.get('ValorBusquedaCliente')?.setValue(
          updateCliente.id_partidos
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
