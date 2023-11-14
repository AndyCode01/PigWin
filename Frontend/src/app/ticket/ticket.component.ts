import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css'],
})
export class TicketComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  public valoresByPuntoVenta() {
    return this.servi.getPuntoVentaTotales().pipe(map((data) => data));
  }

  public valoresByCliente() {
    return this.servi.getClientesTotales().pipe(map((data) => data));
  }

  //Objeto donde se guarda la info del cliente
  Tickets: Array<any> = [];
  keysTickets: Array<any> = [];
  ticketsFiltrados: Array<any> = [];

  showTable: boolean = false;
  showInputModificar: boolean = false;

  isSubmitted = {
    CrearCliente: false,
    BusquedaCliente: false,
    ModificarCliente: false,
  };

  Catalogos: any = {
    PuntoVenta: [],
    cliente: [],
  };

  inputFormCliente: any = [
    { label: 'Fecha del ticket', controlName: 'FechaTicket' },
  ];

  selectFormCliente: any = [
    { label: 'Punto de venta', controlName: 'NombrePuntoVenta' },
    { label: 'Cliente', controlName: 'cliente' },
  ];

  selectFormBusquedaCliente: any = [
    { label: 'id', value: 'id_tickets' },
    { label: 'Punto de venta', value: 'id_punto_venta' },
  ];

  valoresBusqueda: any = [];

  FormBusquedaCliente = this.formBuilder.group({
    TipoBusquedaCliente: ['', Validators.required],
    ValorBusquedaCliente: [1, Validators.required],
  });

  FormCrearCliente = this.formBuilder.group({
    FechaTicket: ['', Validators.required],
    NombrePuntoVenta: [0, Validators.required],
    cliente: [0, Validators.required],
  });

  setCrearClienteSelectValue() {
    let CrearCliente = {
      NombrePuntoVenta: this.Catalogos?.PuntoVenta[0]?.id_punto_venta,
      cliente: this.Catalogos?.cliente[0]?.id_clientes,
    };
    this.FormCrearCliente.patchValue(CrearCliente);
  }

  FormModificarCliente = this.formBuilder.group({
    id_tickets: '',
    FechaTicket: ['', Validators.required],
    NombrePuntoVenta: [0, Validators.required],
    cliente: [0, Validators.required],
  });

  setModificarClienteSelectValue() {
    let nombrePuntoVenta;
    let cliente;
    for (let index = 0; index < this.Catalogos?.PuntoVenta.length; index++) {
      if (
        this.ticketsFiltrados[0]['NombrePuntoVenta'] ==
        this.Catalogos?.PuntoVenta[index].NombrePuntoVenta
      )
        nombrePuntoVenta = this.Catalogos?.PuntoVenta[index].id_punto_venta;
    }
    for (let index = 0; index < this.Catalogos?.cliente.length; index++) {
      if (
        this.ticketsFiltrados[0]['cliente'] ==
        this.Catalogos?.cliente[index]['Primer Nombre'] +
          ' ' +
          this.Catalogos?.cliente[index]['Segundo Nombre'] +
          ' ' +
          this.Catalogos?.cliente[index]['Primer Apellido'] +
          ' ' +
          this.Catalogos?.cliente[index]['Segundo Apellido']
      )
        cliente = this.Catalogos?.cliente[index].id_clientes;
    }
    const fechaTicket = new Date(this.ticketsFiltrados[0].FechaTicket);
    const utcFechaTicket = new Date(
      fechaTicket.getTime() + fechaTicket.getTimezoneOffset() * 60 * 1000
    );
    const formattedFechaTicket = formatDate(
      utcFechaTicket,
      'yyyy-MM-ddTHH:mm',
      'en-US'
    );

    let ModificarCliente = {
      id_tickets: this.ticketsFiltrados[0].id_tickets,
      FechaTicket: formattedFechaTicket,
      NombrePuntoVenta: nombrePuntoVenta,
      cliente: cliente,
    };
    this.FormModificarCliente.patchValue(ModificarCliente);
  }

  public consultarTicketsTotales() {
    this.servi.getTicketTotal().subscribe((data) => {
      this.Tickets = data;
      this.keysTickets = Object.keys(this.Tickets[0]);
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Tickets.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public async getCatalogos() {
    this.Catalogos = {
      PuntoVenta: await this.valoresByPuntoVenta().toPromise(),
      cliente: await this.valoresByCliente().toPromise(),
    };
  }

  public getValoresBusqueda(tipoBusqueda: string) {
    switch (tipoBusqueda) {
      case 'id_punto_venta':
        for (let index = 0; index < this.Catalogos.PuntoVenta.length; index++) {
          this.valoresBusqueda.push({
            value: this.Catalogos.PuntoVenta[index].id_punto_venta,
            label: this.Catalogos.PuntoVenta[index].NombrePuntoVenta,
          });
        }
        break;
      case 'id_tickets':
        for (let index = 0; index < this.Tickets.length; index++) {
          this.valoresBusqueda.push({
            value: this.Tickets[index].id_tickets,
            label: this.Tickets[index].id_tickets,
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
    this.consultarTicketsTotales();
    await this.getCatalogos();
    this.setCrearClienteSelectValue();
    this.FormBusquedaCliente.get('TipoBusquedaCliente')?.valueChanges.subscribe(
      (tipo) => {
        this.valoresBusqueda = [];
        this.getValoresBusqueda(tipo);
      }
    );
    let valor = {
      TipoBusquedaCliente: 'id_tickets',
    };
    this.FormBusquedaCliente.patchValue(valor);
  }

  async onSubmitCrearTicket(): Promise<void> {
    if (!this.FormCrearCliente.invalid) {
      const newTicket = this.FormCrearCliente.value;
      console.log(newTicket);

      try {
        const res = await this.servi.CrearTicketU(newTicket);
        console.log(newTicket);
        this.FormCrearCliente.reset();
        this.setCrearClienteSelectValue();
        this.consultarTicketsTotales();
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
        case 'id_punto_venta':
          this.servi
            .getTicketTipPuntoVenta(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.ticketsFiltrados = data;
              this.setModificarClienteSelectValue();
            });
          break;

        default:
          this.servi
            .getTicketSeleccionado(valoresBusqueda.ValorBusquedaCliente)
            .subscribe((data) => {
              this.ticketsFiltrados = data;
              this.setModificarClienteSelectValue();
            });
          break;
      }
    } catch (error) {}
  }

  async onSubmitModificarCliente(): Promise<any> {
    if (!this.FormModificarCliente.invalid) {
      const updateTicket = this.FormModificarCliente.value;
      try {
        console.log(updateTicket);
        const res = await this.servi.ActualizarTicketU(updateTicket);
        this.consultarTicketsTotales();
        this.FormModificarCliente.reset;
        this.ticketsFiltrados = [];
        this.FormBusquedaCliente.get('TipoBusquedaCliente')?.setValue(
          'id_tickets'
        );
        this.FormBusquedaCliente.get('ValorBusquedaCliente')?.setValue(
          updateTicket.id_tickets
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
