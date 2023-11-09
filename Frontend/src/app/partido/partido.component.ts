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
  tituloPartidoUniListaDeporte = '';
  titloPartidoBuscado = '';
  titloPartidoEditar = '';

  //Crear
  PartidoUniT: any = [];
  //Editar
  PartidoCataEdi: any = [];
  //Consultar
  DeporteCataRead: any = [];

  //Consulta general por equipo
  equiposTotales: any = [];
  deportesTotales: any = [];

  //Por tipo
  PartidoUniTEquipo: any = [];
  PartidoUniTDeporte: any = [];

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
  });

  ActPartidoU = new FormGroup({
    CBPartidoEdi: new FormControl(),
    textNueEquipoLocalEdi: new FormControl(),
    textNueEquipoVisitanteEdi: new FormControl(),
    textNueFechaPartidoEdi: new FormControl(),
    textNueDeporteEdi: new FormControl(),
    textNueGanadorPartidoEdi: new FormControl(),

  })

  ConsultarPartidoBYIdU = new FormGroup({
    CBPartidoRead: new FormControl(),
    textEquipoLocalRead: new FormControl(),
    textEquipoVisitanteRead: new FormControl(),
    textFechaPartidoRead: new FormControl(),
    textDeporteRead: new FormControl(),
  })


  // ConsultarPartidoByEquipoU = new FormGroup({
  //   CBPartidoEquipo: new FormControl(),
  // });


  ConsultarPartidoByDeporteU = new FormGroup({
    CBPartidoDeporte: new FormControl(),
  })

  public consultaPartidosTotales(list: boolean) {
    if (this.controlLista == 1) {
      this.servi.getPartidoTotal().subscribe(
        (data: { partidos: [] }) => {
          if (list == true) this.flag = list;
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

  public LimpiarLista(list: boolean) {
    if (list == false) this.flag = list;
    this.controlLista = 0;
  }

  // public consultaEquiposTotales() {
  //   this.servi.getEquiposTotales().subscribe(
  //     (data: { equipos: [] }) => {
  //       this.equiposTotales = data;
  //     },
  //     (error) => {
  //       console.error(error + ' ');
  //     }
  //   );
  // }


  // public consultaDeportesTotales() {
  //   this.servi.getlListCatologoDeporte('/' + 3).subscribe(
  //     (data: { equipos: [] }) => {
  //       this.deportesTotales = data;
  //     },
  //     (error) => {
  //       console.error(error + ' ');
  //     }
  //   );
  // }

  // public SelTipEquipo() {
  //   this.BuscarEvalor = this.ConsultarPartidoByEquipoU.getRawValue()['CBPartidoEquipo'];
  //   this.servi.getPartidoTipEquipo(this.BuscarEvalor).subscribe(
  //     (data: any) => {
  //       this.PartidoUniTEquipo = data;
  //       console.log(this.PartidoUniTEquipo);

  //       this.tituloPartidoUniListaEquipo = 'Equipo Local';
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  // public SelTipDeporte() {
  //   this.BuscarEvalor = this.ConsultarPartidoByDeporte.getRawValue()['CBPartidoDeporte'];
  //   this.servi.getPartidoTipEquipo(this.BuscarEvalor).subscribe(
  //     (data: any) => {
  //       this.PartidoUniTDeporte = data;
  //       console.log(this.PartidoUniTDeporte);

  //       this.tituloPartidoUniListaDeporte = 'Deporte';
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );
  // }

  //El metodo de la consulta que pues en este caso no sirve de mucho
  public consultaDeportesTotales(){
    this.servi.getDeportesTotales().subscribe(
      (data:{equipos:[]})=>{
        this.deportesTotales = data;
      },(error)=>{
        console.error(error + ' ');
      }
    )
  }

  //Intento de metodo para traerlo por deporte hice una consulta a equipos pero no
  // pero la cague porque era a catalogo univrsal para obtener los deportes
  public SelTipDeporte() {
    this.BuscarEvalor = this.ConsultarPartidoByDeporteU.getRawValue()['CBPartidoDeporte'];
    this.servi.getPartidoTipDeporte(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PartidoUniTDeporte = data;
        console.log(this.PartidoUniTDeporte);

        this.tituloPartidoUniListaDeporte = 'Deporte a Consultar';
      },
      (error) => {
        console.log(error);
      }
    );
  }




  insertarNuevoPartido() {
    var datosvalo1 = this.crearPartidoU.getRawValue()['textNueEquipoLocal'];
    var datosvalo2 = this.crearPartidoU.getRawValue()['textNueEquipoVisitante'];
    var datosvalo3 = this.crearPartidoU.getRawValue()['textNueFechaPartido']; 
    var datosvalo4 = this.crearPartidoU.getRawValue()['textNueDeporte']; 
   

    var cadena = {
      EquipoLocal: datosvalo1,
      EquipoVisitante: datosvalo2,
      FechaPartido: datosvalo3,
      Deporte: datosvalo4,
       
    };

    this.servi.crearPartidoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    this.crearPartidoU.reset();
  }

  

  public SelPartidoEditar() {
    this.BuscarEvalor = this.ActPartidoU.getRawValue()['CBPartidoEdi'];

    this.servi.getPartidoSeleccionado(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PartidoCataEdi = data;
        console.log(this.PartidoCataEdi);

        this.titloPartidoEditar = 'Partido a Editar';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //Intento de metodo para consultar el partido por id
  public SelPartidoConsultar() {
    this.BuscarEvalor = this.ConsultarPartidoBYIdU.getRawValue()['CBPartidoRead'];

    this.servi.getPartidoSeleccionado(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.PartidoCataEdi = data;
        console.log(this.PartidoCataEdi);

        this.titloPartidoBuscado = 'Partido a Consultar';
      },
      (error) => {
        console.log(error);
      }
    );
  }



  

  public ActualizarPartido() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActPartidoU.getRawValue()['CBPartidoEdi'];
    var datosvalo2 = this.ActPartidoU.getRawValue()['textNueEquipoLocalEdi'];
    var datosvalo3 = this.ActPartidoU.getRawValue()['textNueEquipoVisitanteEdi'];
    var datosvalo4 = this.ActPartidoU.getRawValue()['textNueFechaPartidoEdi'];
    var datosvalo5 = this.ActPartidoU.getRawValue()['textNueDeporteEdi'];
    
    var cadena = {
      id_partidos: datosvalo1,

      EquipoLocal: datosvalo2,

      EquipoVisitante: datosvalo3,

      FechaPartido: datosvalo4,

      Deporte: datosvalo5,
    };


    this.servi.ActualizarPartidoU(cadena).then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.crearPartidoU.reset();
  }



  ngOnInit(): void {
    this.listarPartidosTotales = this.formBuilder.group({});

    this.ActPartidoU = this.formBuilder.group({
      CBPartidoEdi: [],
      textNueEquipoLocalEdi: [],
      textNueEquipoVisitanteEdi: [],
      textNueFechaPartidoEdi: [],
      textNueDeporteEdi: [],
      textNueGanadorPartidoEdi: [],

    });
  }
}
