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

  title = 'Manejo de Partidos';
  tituloPartidoLista = '';
  tituloPartidoUniListaEquipo = '';
  titloPartidoBuscado = '';
  titloPartidoEditar = '';

  //Crear
  PartidoUniT: any = [];
  //Editar
  PartidoCataEdi: any = [];

  //Consulta general por equipo
  equiposTotales: any=[];

  //Por tipo
  PartidoUniTEquipo: any = [];

  //Listar
  tablapartidostotales: any = [];
  //listar por tipo
  tablapartidosDeporte: any = [];

  BuscarEvalor = 1;
  controlLista = 1;

  flag: boolean = false;
  

  // form group
  listarPartidosTotales = new FormGroup({});

  crearPartidoU = new FormGroup({
    textNueEquipoLocal: new FormControl(),
    textNueEquipoVisitante: new FormControl(),
    textNueFechaPartido: new FormControl(),
    textNueDeporte: new FormControl(),
    textNueGanadorPartido: new FormControl(),
  })



  ConsultarPartidoByEquipo = new FormGroup({
    CBPartidoEquipo: new FormControl(),
  })

  public consultaPartidosTotales(list:boolean) {
    if (this.controlLista == 1) {
      this.servi.getPartidoTotal().subscribe(
        (data:{partidos:[]}) => {
          if(list==true)this.flag=list
          this.PartidoUniT = data; //JSON.parse(data);
          console.log(this.PartidoUniT);
          this.tituloPartidoLista = 'Lista de Todos los partidos';
          this.tablapartidostotales[0] = 'id partido';
          this.tablapartidostotales[1] = 'Partido';
          this.tablapartidostotales[2] = 'Fecha';
          this.tablapartidostotales[3] = 'Deporte';
          this.tablapartidostotales[4] = 'Ganador Partido';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.PartidoUniT = null;
      this.tituloPartidoLista = '';
      this.tablapartidostotales[0] = '';
      this.tablapartidostotales[1] = '';
      this.tablapartidostotales[2] = '';
      this.tablapartidostotales[3] = '';
      this.tablapartidostotales[4] = '';
      this.controlLista = 1;
    }
  }

  public LimpiarLista(list:boolean) {
    if(list==false)this.flag=list
    this.controlLista = 0;
  }


  public consultaEquiposTotales() {
    this.servi.getEquiposTotales().subscribe(
      (data:{equipos:[]})=>{
        this.equiposTotales = data;
      },(error)=>{
        console.error(error + ' ');
      }
    )
  }

  
  public SelTipEquipo() {
    this.BuscarEvalor = this.ConsultarPartidoByEquipo.getRawValue()['CBPartidoEquipo'];
    this.servi.getTicketTipPuntoVenta(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PartidoUniTEquipo = data;
        console.log(this.PartidoUniTEquipo);

        this.tituloPartidoUniListaEquipo = 'Equipo Local';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  insertarNuevoPartido() {
    var datosvalo1 = this.crearPartidoU.getRawValue()['textNueFechaTicket'];
    var datosvalo2 = this.crearPartidoU.getRawValue()['textNuePuntoVentaTicket']; //JSON armado
    var datosvalo3 = this.crearPartidoU.getRawValue()['textNueCliente']; //JSON armado

    var cadena = {
      FechaTicket: datosvalo1,
      PuntoVentaTicket: datosvalo2,
      ClienteTicket: datosvalo3,
    };

    this.servi.crearPartidoU(cadena).then((res) => {
        
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.crearPartidoU.reset();
  }





  ngOnInit(): void {
    this.listarPartidosTotales = this.formBuilder.group({});
  }
}
