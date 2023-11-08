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
  selector: 'app-puntoventa',
  templateUrl: './puntoventa.component.html',
  styleUrls: ['./puntoventa.component.css']
})
export class PuntoventaComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  //Titulos
  title = 'Manejo de Puntos de Venta';
  tituloPuntoVentaLista = '';
  titloPuntoVentaBuscado = '';
  titloPuntoVentaEditar = '';

  //Crear
  PuntoVentaUniT : any = [];
  //Editar
  PuntoVentaCataEdi: any = [];

  //Listar
  tablapuntosventatotales: any = [];  
  
  BuscarEvalor = 1;
  controlLista = 1;

  flag:boolean = false

  //Consultar todos los puntos de venta

  listarPuntosVentaTotales = new FormGroup({});
  
  //Formgroup de crear
  CrearPuntoVentaU = new FormGroup({
    textNueNombrePuntoVenta: new FormControl(),
    textNueAdminPuntoVenta: new FormControl(),

  })

  //Formgroup de editar
  ActPuntoVentaU = new FormGroup({
    CBPuntoVentaEdi: new FormControl(),
    textNueNombrePuntoVentaEdi: new FormControl(),
    textNueAdminPuntoVentaEdi: new FormControl(),
    
  })


  //Metodos

  public consultaPuntosVentaTotales(list:boolean) {
    if (this.controlLista == 1) {
      this.servi.getPuntoVentaTotales().subscribe(
        (data: { punto_venta: [] }) => {
          if(list==true)this.flag=list
          this.PuntoVentaUniT = data; 
          this.tituloPuntoVentaLista = 'LISTA DE TODOS LOS PUNTOS DE VENTA';
          this.tablapuntosventatotales[0] = 'id ';
          this.tablapuntosventatotales[1] = 'Punto venta';
          this.tablapuntosventatotales[2] = 'Administrador';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.PuntoVentaUniT = null;
      this.tituloPuntoVentaLista = '';
      this.tablapuntosventatotales[0] = '';
      this.tablapuntosventatotales[1] = '';
      this.tablapuntosventatotales[2] = '';
      this.controlLista = 1;
    }
  }

  public LimpiarLista(list:boolean) {
    if(list==false)this.flag=list
    this.controlLista = 0;
  }

  insertarNuevoPuntoVenta() {
    var datosvalo1 = this.CrearPuntoVentaU.getRawValue()['textNueNombrePuntoVenta'];
    var datosvalo2 = this.CrearPuntoVentaU.getRawValue()['textNueAdminPuntoVenta']; 

    var cadena = {
      NombrePuntoVenta: datosvalo1,
      AdministradorPuntoVenta: datosvalo2,

    };

    this.servi.CrearPuntoVentaU(cadena).then((res) => {
        
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.CrearPuntoVentaU.reset();
  }


  public SelPuntoVentaEditar() {
    this.BuscarEvalor = this.ActPuntoVentaU.getRawValue()['CBPuntoVentaEdi'];

    this.servi.getPuntoVentaSeleccionado(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PuntoVentaCataEdi = data;
        //console.log(this.PuntoVentaCataEdi);

        this.titloPuntoVentaEditar = 'Punto de venta a editar';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public ActualizarPuntoVenta() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActPuntoVentaU.getRawValue()['CBPuntoVentaEdi'];

    var datosvalo2 = this.ActPuntoVentaU.getRawValue()['textNueNombrePuntoVentaEdi'];

    var datosvalo3 = this.ActPuntoVentaU.getRawValue()['textNueAdminPuntoVentaEdi'];

    var cadena = {
      id_punto_venta: datosvalo1,

      NombrePuntoVenta: datosvalo2,

      AdministradorPuntoVenta: datosvalo3,

      
    };


    this.servi.ActualizarPuntoVentaU(cadena).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearPuntoVentaU.reset();
  }



  ngOnInit(): void {
    this.listarPuntosVentaTotales = this.formBuilder.group({});

    this.ActPuntoVentaU = this.formBuilder.group({
      CBPuntoVentaEdi: [],
      textNueNombrePuntoVentaEdi: [],
      textNueAdminPuntoVentaEdi: [],

    });
  }
}
