import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';

import { MiservicioService } from '../miservicio.service';

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

  title = 'Manejo de Tickets';
  tituloTicketLista = '';
  tituloTicketUniListaPuntoVenta = '';
  titloTicketBuscado = '';
  titloTicketEditar = '';
  
  //Crear
  TicketUniT: any = [];
  //Editar
  TicketCataEdi: any = [];
  //TicketUniTicket: any = [];

  // por punto de venta -> Para la consulta por punto de venta
  puntoVentaTotales: any=[];
  
  //Para tipo 
  TicketUniTPunto: any = [];
  
  //Listar
  tablaticketstotales: any = [];
  tablaticketsPuntoVenta: any = []; 

  BuscarEvalor = 1;
  controlLista = 1;

  flag:boolean = false

  listarTicketsTotales = new FormGroup({});

  CrearTicketU = new FormGroup({
    textNueFechaTicket: new FormControl(),
    textNuePuntoVentaTicket: new FormControl(),
    textNueCliente: new FormControl(),
  });

  ActTicketU = new FormGroup({
    CBTicketEdi: new FormControl(),
    //CBTipoCatalogoEdi: new FormControl(), // Ojo al parecer no se usa
    textNueFechaTicketEdi: new FormControl(),
    textNuePuntoVentaEdi: new FormControl(),
    textNueClienteEdi: new FormControl(),
  });

  //BuscarPorPuntoVenta = new FormGroup({
    //CBPuntoVenta: new FormControl(),

  //})

  //Por punto de venta
     
    ConsultarTiketByPuntoVentaU = new FormGroup({
      CBTicketPuntoVenta: new FormControl(),
      //TicketPuntoVentafiltro: new FormControl(),
      //textPuntoVenta: new FormControl(),
  });


  public consultaTicketsTotales(list:boolean) {
    if (this.controlLista == 1) {
      this.servi.getTicketTotal().subscribe(
        (data: { tickets: [] }) => {
          if(list==true)this.flag=list
          this.TicketUniT = data; //JSON.parse(data);
          this.tituloTicketLista = 'LISTA DE TODOS LOS TICKETS';
          this.tablaticketstotales[0] = 'id tickets';
          this.tablaticketstotales[1] = 'Fecha Ticket';
          this.tablaticketstotales[2] = 'Punto venta';
          this.tablaticketstotales[3] = 'Cliente';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.TicketUniT = null;
      this.tituloTicketLista = '';
      this.tablaticketstotales[0] = '';
      this.tablaticketstotales[1] = '';
      this.tablaticketstotales[2] = '';
      this.tablaticketstotales[3] = '';
      this.controlLista = 1;
    }
  }

  public LimpiarLista(list:boolean) {
    if(list==false)this.flag=list
    this.controlLista = 0;
  }

 // por punto de venta -> trae la consulta general de los puntos de venta 
 // 
  public consultaPuntoVentaTotales() {
    this.servi.getPuntoVentaTotales().subscribe(
      (data:{puntoVenta:[]})=>{
        this.puntoVentaTotales = data;
      },(error)=>{
        console.error(error + ' ');
      }
    )
    
  }

  // public consultaTipoPuntoVenta(cadoc: any) {
  //   if (this.controlLista == 1) {
  //     this.servi.getTicketTipPuntoVenta('/'+cadoc).subscribe(
  //       (data: { tickets: [] }) => {
  //         this.TicketUniTPunto = data; //JSON.parse(data);
  //         console.log(this.TicketUniTPunto);
  //         this.tituloTicketLista = 'LISTA DE TODOS LOS TICKETS';
  //         this.tablaticketsPuntoVenta[0] = 'Id';
  //         this.tablaticketsPuntoVenta[1] = 'Fecha Ticket';
  //         this.tablaticketsPuntoVenta[2] = 'Punto venta';
  //         this.tablaticketsPuntoVenta[3] = 'Cliente';
  //       },
  //       (error) => {
  //         console.error(error + ' ');
  //       }
  //     );
  //   } else {
  //     this.TicketUniTPunto = null;
  //     this.tituloTicketLista = '';
  //     this.tablaticketsPuntoVenta[0] = '';
  //     this.tablaticketsPuntoVenta[1] = '';
  //     this.tablaticketsPuntoVenta[2] = '';
  //     this.tablaticketsPuntoVenta[3] = '';

  //     this.controlLista = 1;
  //   }
  // }

  public LimpiarTablaDoc() {
    this.TicketUniTPunto = null; // Establece los datos en null para limpiar la tabla de "Pacientes Tipo Documento"
    this.tituloTicketUniListaPuntoVenta = ''; // Limpia el título de la tabla si es necesario
    this.tablaticketsPuntoVenta = []; // Limpia las columnas de la tabla si es necesario
    this.controlLista = 0;
  }


  // ticketSelecciondo : any;

  // obtenerTicketSeleccionado(id_ticket: any){
  //   this.servi.getTicketSeleccionado(id_ticket).subscribe((data)=> {
  //     this.ticketSelecciondo = data;
  //   })
  // }
  

  insertarNuevoTicket() {
    var datosvalo1 = this.CrearTicketU.getRawValue()['textNueFechaTicket'];
    var datosvalo2 = this.CrearTicketU.getRawValue()['textNuePuntoVentaTicket']; //JSON armado
    var datosvalo3 = this.CrearTicketU.getRawValue()['textNueCliente']; //JSON armado

    var cadena = {
      FechaTicket: datosvalo1,
      PuntoVentaTicket: datosvalo2,
      ClienteTicket: datosvalo3,
    };

    this.servi.CrearTicketU(cadena).then((res) => {
        
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.CrearTicketU.reset();
  }


  
  public SelTicketEditar() {
    this.BuscarEvalor = this.ActTicketU.getRawValue()['CBTicketEdi'];

    this.servi.getTicketSeleccionado(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.TicketCataEdi = data;
        console.log(this.TicketCataEdi);

        this.titloTicketEditar = 'TICKET A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }


//Por punto de venta
  public SelTipPuntoVenta() {
    this.BuscarEvalor = this.ConsultarTiketByPuntoVentaU.getRawValue()['CBTicketPuntoVenta'];
    this.servi.getTicketTipPuntoVenta(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.TicketUniTPunto = data;
        console.log(this.TicketUniTPunto);

        this.tituloTicketUniListaPuntoVenta = 'Punto de Venta a Consultar';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public ActualizarTicket() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActTicketU.getRawValue()['CBTicketEdi'];

    var datosvalo2 = this.ActTicketU.getRawValue()['textNueFechaTicketEdi'];

    var datosvalo3 = this.ActTicketU.getRawValue()['textNuePuntoVentaEdi'];

    var datosvalo4 = this.ActTicketU.getRawValue()['textNueClienteEdi'];

   

    var cadena = {
      id_tickets: datosvalo1,

      FechaTicket: datosvalo2,

      PuntoVentaTicket: datosvalo3,

      ClienteTicket: datosvalo4,
    };


    this.servi.ActualizarTicketU(cadena).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearTicketU.reset();
  }

  ngOnInit(): void {
    this.listarTicketsTotales = this.formBuilder.group({});

    this.ActTicketU = this.formBuilder.group({

      CBTicketEdi: [],
      //CBTipoCatalogoEdi: [],
      textNueFechaTicketEdi: [],
      textNuePuntoVentaEdi: [],
      textNueClienteEdi: [],
    });
      
  }
}
