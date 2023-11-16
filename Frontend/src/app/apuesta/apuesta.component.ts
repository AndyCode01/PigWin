import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public valoresByTicket() {
    return this.servi.getTicketTotal().pipe(map((data) => data));
  }

  public valoresByPartido() {
    return this.servi.getPartidoTotal().pipe(map((data) => data));
  }

  public valoresByEquipo() {
    return this.servi.getDeportesTotales().pipe(map((data) => data));
  }

  public valoresByCliente() {
    return this.servi.getClientesTotales().pipe(map((data) => data));
  }

  //Objeto donde se guarda la info del cliente
  Apuestas: Array<any> = [];
  keysApuestas: Array<any> = [];
  apuestasFiltradas: Array<any> = [];

  showTable: boolean = false;
  showInputModificar: boolean = false;

  isSubmitted = {
    CrearApuesta: false,
    BusquedaCliente: false,
    ModificarCliente: false,
  };

  Catalogos: any = {
    TicketApuesta: [],
    PartidoApuesta: [],
    EquipoApuestaRegistro: [],
    EquipoApuestaModificar: [],
  };

  Equipos: any = [];
  Clientes: any = [];

  inputFormCliente: any = [
    { label: 'Monto de la apuesta', controlName: 'MontoApuesta' },
  ];

  selectFormCliente: any = [
    { label: 'Cliente', controlName: 'TicketApuesta' },
    { label: 'Partido', controlName: 'PartidoApuesta' },
    { label: 'Equipo al que deseas apostar', controlName: 'EquipoApuesta' },
  ];

  selectFormBusquedaCliente: any = [
    { label: 'id', value: 'id_apuestas' },
    { label: 'ticket', value: 'id_tickets' },
  ];

  valoresBusqueda: any = [];

  FormBusquedaCliente = this.formBuilder.group({
    TipoBusquedaCliente: ['', Validators.required],
    ValorBusquedaCliente: [1, Validators.required],
  });

  FormCrearApuesta = this.formBuilder.group({
    MontoApuesta: [0, Validators.required],
    TicketApuesta: [0, Validators.required],
    PartidoApuesta: [0, Validators.required],
    EquipoApuesta: [0, Validators.required],
  });

  setCrearClienteSelectValue() {
    let equipoApuesta = [];
    let CrearApuesta: any = {
      TicketApuesta: this.Catalogos?.TicketApuesta[0]?.id_tickets,
      PartidoApuesta: this.Catalogos?.PartidoApuesta[0]?.id_partidos,
    };
    for (let index = 0; index < this.Equipos.length; index++) {
      if (
        this.Equipos[index].NombreEquipo ==
          this.Catalogos?.PartidoApuesta[0]['Equipo Local'] ||
        this.Equipos[index].NombreEquipo ==
          this.Catalogos?.PartidoApuesta[0]['Equipo Visitante']
      ) {
        let objectEquipo = {
          id_equipos: this.Equipos[index].id_equipos,
          NombreEquipo: this.Equipos[index].NombreEquipo,
        };
        equipoApuesta.push(objectEquipo);
      }
    }
    CrearApuesta.EquipoApuesta = equipoApuesta[0].id_equipos;
    this.Catalogos.EquipoApuestaRegistro = equipoApuesta;
    this.FormCrearApuesta.patchValue(CrearApuesta);
  }

  FormModificarApuesta = this.formBuilder.group({
    id_apuestas: '',
    MontoApuesta: [0, Validators.required],
    TicketApuesta: [0, Validators.required],
    PartidoApuesta: [0, Validators.required],
    EquipoApuesta: [0, Validators.required],
  });

  setModificarClienteSelectValue() {
    let ticket;
    let partido;
    let indexPartido = 0;
    let equipoApuesta = [];
    for (let index = 0; index < this.Catalogos?.TicketApuesta.length; index++) {
      if (
        this.apuestasFiltradas[0]['Cliente'].replace(/ /g, '') ==
        this.Catalogos?.TicketApuesta[index].cliente.replace(/ /g, '')
      ) {
        ticket = this.Catalogos?.TicketApuesta[index].id_tickets;
      }
    }
    for (
      let index = 0;
      index < this.Catalogos?.PartidoApuesta.length;
      index++
    ) {
      if (
        this.apuestasFiltradas[0]['Partido Apuesta'].includes(
          this.Catalogos?.PartidoApuesta[index].Equipo_Local
        ) &&
        this.apuestasFiltradas[0]['Partido Apuesta'].includes(
          this.Catalogos?.PartidoApuesta[index].Equipo_Visitante
        )
      ) {
        indexPartido = index;
        partido = this.Catalogos?.PartidoApuesta[index].id_partidos;
      }
    }
    for (let index = 0; index < this.Equipos.length; index++) {
      if (
        this.Equipos[index].NombreEquipo ==
          this.Catalogos?.PartidoApuesta[indexPartido]?.Equipo_Local ||
        this.Equipos[index].NombreEquipo ==
          this.Catalogos?.PartidoApuesta[indexPartido]?.Equipo_Visitante
      ) {
        let objectEquipo = {
          id_equipos: this.Equipos[index].id_equipos,
          NombreEquipo: this.Equipos[index].NombreEquipo,
        };
        equipoApuesta.push(objectEquipo);
      }
    }

    let ModificarApuesta: any = {
      id_apuestas: this.apuestasFiltradas[0].id_apuestas,
      TicketApuesta: ticket,
      PartidoApuesta: partido,
      MontoApuesta: this.apuestasFiltradas[0]['Monto Apuesta'],
    };
    ModificarApuesta.EquipoApuesta = equipoApuesta[0].id_equipos;
    this.Catalogos.EquipoApuestaModificar = equipoApuesta;
    this.FormModificarApuesta.patchValue(ModificarApuesta);
  }

  public actualizarEquipo(indexPartido: number, Form: FormGroup, tipo: string) {
    let equipoApuesta = [];
    for (let index = 0; index < this.Equipos.length; index++) {
      if (
        this.Equipos[index].NombreEquipo ==
          this.Catalogos?.PartidoApuesta[indexPartido]?.Equipo_Local ||
        this.Equipos[index].NombreEquipo ==
          this.Catalogos?.PartidoApuesta[indexPartido]?.Equipo_Visitante
      ) {
        let objectEquipo = {
          id_equipos: this.Equipos[index].id_equipos,
          NombreEquipo: this.Equipos[index].NombreEquipo,
        };
        equipoApuesta.push(objectEquipo);
      }
    }

    let listaEquipos: any = {
      EquipoApuesta: equipoApuesta[0].id_equipos
    };
    console.log(equipoApuesta);

    switch (tipo) {
      case 'registrarApuesta':
        this.Catalogos.EquipoApuestaRegistro = equipoApuesta;
        break;
      case 'modificarApuesta':
        this.Catalogos.EquipoApuestaModificar = equipoApuesta;
        break;
    }
    Form.patchValue(listaEquipos);
  }

  public consultaClientesTotales() {
    this.servi.getApuestasTotales().subscribe((data) => {
      this.Apuestas = data;
      this.keysApuestas = Object.keys(this.Apuestas[0]);
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Apuestas.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public async getCatalogos() {
    this.Catalogos = {
      TicketApuesta: await this.valoresByTicket().toPromise(),
      PartidoApuesta: await this.valoresByPartido().toPromise(),
    };
    this.Equipos = await this.valoresByEquipo().toPromise();
    this.Clientes = await this.valoresByCliente().toPromise();
  }

  public getValoresBusqueda(tipoBusqueda: string) {
    switch (tipoBusqueda) {
      case 'id_tickets':
        for (
          let index = 0;
          index < this.Catalogos.TicketApuesta.length;
          index++
        ) {
          for (let j = 0; j < this.Clientes.length; j++) {
            if (
              this.Catalogos.TicketApuesta[index].cliente ==
              this.Clientes[j]['Primer Nombre'] +
                ' ' +
                this.Clientes[j]['Segundo Nombre'] +
                ' ' +
                this.Clientes[j]['Primer Apellido'] +
                ' ' +
                this.Clientes[j]['Segundo Apellido']
            ) {
              this.valoresBusqueda.push({
                value: this.Clientes[j].id_clientes,
                label:
                  this.Clientes[j]['Primer Nombre'] +
                  ' ' +
                  this.Clientes[j]['Segundo Nombre'] +
                  ' ' +
                  this.Clientes[j]['Primer Apellido'] +
                  ' ' +
                  this.Clientes[j]['Segundo Apellido'],
              });
            }
          }
        }
        break;
      case 'id_apuestas':
        for (let index = 0; index < this.Apuestas.length; index++) {
          this.valoresBusqueda.push({
            value: this.Apuestas[index].id_apuestas,
            label: this.Apuestas[index].id_apuestas,
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
    this.FormCrearApuesta.get('PartidoApuesta')?.valueChanges.subscribe(
      (partido) =>{
        this.actualizarEquipo(
          partido - 1,
          this.FormCrearApuesta,
          'registrarApuesta'
        );
      }
    );
    this.FormModificarApuesta.get('PartidoApuesta')?.valueChanges.subscribe(
      (partido) => {
        this.actualizarEquipo(
          partido - 1,
          this.FormModificarApuesta,
          'modificarApuesta'
        );
      }
    );
    let valor = {
      TipoBusquedaCliente: 'id_apuestas',
    };
    this.FormBusquedaCliente.patchValue(valor);
  }

  async onSubmitCrearCliente(): Promise<void> {
    if (!this.FormCrearApuesta.invalid) {
      const newCliente = this.FormCrearApuesta.value;
      try {
        const res = await this.servi.CrearApuesta(newCliente);
        console.log(newCliente);
        this.FormCrearApuesta.reset();
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
        case 'id_tickets':
          this.servi
            .getApuestaByCliente(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.apuestasFiltradas = data;
              this.setModificarClienteSelectValue();
            });
          break;

        default:
          this.servi
            .getApuestaByID(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.apuestasFiltradas = data;
              this.setModificarClienteSelectValue();
            });
          break;
      }
    } catch (error) {}
  }

  async onSubmitModificarCliente(): Promise<any> {
    if (!this.FormModificarApuesta.invalid) {
      const updateApuesta = this.FormModificarApuesta.value;
      try {
        console.log(updateApuesta);
        const res = await this.servi.ModificarApuesta(updateApuesta);
        this.consultaClientesTotales();
        this.FormModificarApuesta.reset;
        this.apuestasFiltradas = [];
        this.FormBusquedaCliente.get('TipoBusquedaCliente')?.setValue(
          'id_apuestas'
        );
        this.FormBusquedaCliente.get('ValorBusquedaCliente')?.setValue(
          updateApuesta.id_apuestas
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
