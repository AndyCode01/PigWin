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
  selector: 'app-catauniversal',
  templateUrl: './catauniversal.component.html',
  styleUrls: ['./catauniversal.component.css'],
})
export class CatauniversalComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  //---------------------------------------------------------------------}
  //LAS VARIABLES
  title = 'MANEJO DE CATALOGO UNIVERSAL'; //Titulo dela página
  tituloCataUniLista = ''; //Titulo Lista de todos los catalogos
  titloCataUniBuscado = ''; //Titulo de Color Buscado
  titloCataUniEditar = ''; //Titulo de Color a Editar

  CataUniT: any = []; //Lista de todos los catalogos
  CataUniCatalogo: any = []; //Lista catalogo Catalogo
  CataUniApartado: any = []; //Lista catalogo Color
  CataUniDeporte: any = []; //Lista catalogo TiposVehiculos
  CataUniDocumento: any = []; //Lista catalogo Marca
  CataUniMetodoPago: any = []; //Lista catalogo Tipos de Documntos
  CataUniEps: any = []; //Lista catalogo Eps
  CataUniPrefSexual: any = []; //Lista catalogo Preferencias Sexuales

  CataUniCatalogoSel: any = []; //Lista catalogo Catalogo selecionado
  CataUniApartadoSel: any = []; //Lista el color selecionado
  CataUniDeporteSel: any = []; //Lista catalogo TiposVehiculos selecionado
  CataUniDocumentoSel: any = []; //Lista catalogo Marca selecionado
  CataUniMetodoPagoSel: any = []; //Lista catalogo Tipos de Documntos selecionado
  CataUniEpsSel: any = []; //Lista catalogo Eps selecionado
  CataUniTipoContacto: any = []; //Lista catalogo Preferencias Sexuales selecionado
  CataUniCataEdi: any = [];

  tablacatalogosstotales: any = []; //Encabezados tabla catalogos totales

  BuscarEvalor = 1; //Control para carga del valor a buscar
  controlLista = 1; //Control para limpiar la lista

  //----------------------------------------------------------------------------------------

  //Form group  //Grupo para la lista de Colores
  ListarCatTotales = new FormGroup({});

  //Grupo para formulariomostrar catalogo de Catalogos
  CBCatalogoCatalogo = new FormGroup({
    CatCatalogofiltro: new FormControl(),
    textCatalogo: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo colores
  CBCatalogoApartado = new FormGroup({
    CatApartadofiltro: new FormControl(),
    textApartado: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo Tipos de Vehículos
  CBCatalogoDeporte = new FormGroup({
    CatDeportefiltro: new FormControl(),
    textDeporte: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo Marca
  CBCatalogoDocumento = new FormGroup({
    CatDocumentofiltro: new FormControl(),
    textDocumento: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo Tipos de Documentos
  CBCatalogoMetodoPago = new FormGroup({
    CatMetodoPagofiltro: new FormControl(),
    textMetodopago: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo EPS
  CBCatalogoIdentidad = new FormGroup({
    CatIdentidadfiltro: new FormControl(),
    textIdentidad: new FormControl(),
  });

  //Grupo para formulariomostrar catalogo PrefSexual
  CBCatalogoTipoContacto = new FormGroup({
    CatTipoContactofiltro: new FormControl(),
    textTipoContacto: new FormControl(),
  });

  CrearCatalogoU = new FormGroup({
    CBTipoCatalogo: new FormControl(),
    textNueTipoCat: new FormControl(),
  });

  ActCatalogoU = new FormGroup({
    CBCatalogoEdi: new FormControl(),
    CBTipoCatalogoEdi: new FormControl(),
    textNueDenominacionEdi: new FormControl(),
    textNueTipoCatEdi: new FormControl(),
  });

  //*****************************************************************************
  //=============================================================
  //LOS CRUD
  //=============================================================
  //Lista de todos los catalogos

  public consultaCatalogosTotales() {
    if (this.controlLista == 1) {
      this.servi.getCatalogoTotal().subscribe(
        (data: { catalogouniversal: [] }) => {
          this.CataUniT = data; //JSON.parse(data);
          console.log(this.CataUniT);
          this.tituloCataUniLista = 'LISTA DE TODOS LOS CATALOGOS';
          this.tablacatalogosstotales[0] = 'id';
          this.tablacatalogosstotales[1] = 'Nombre Catalogo';
          this.tablacatalogosstotales[2] = 'Tipo Catalogo ';
        },
        (error) => {
          console.error(error + ' ');
        }
      );
    } else {
      this.CataUniT = null;
      this.tituloCataUniLista = '';
      this.tablacatalogosstotales[0] = '';
      this.tablacatalogosstotales[1] = '';
      this.tablacatalogosstotales[2] = '';
      this.tablacatalogosstotales[3] = '';
      this.controlLista = 1;
    }
  }

  //--------------------------------------------------------------------------------------------->
  //para Limpiar la lista

  public LimpiarLista() {
    this.controlLista = 0;
  }

  // -----------------------------------------------------------------------------------------
  // Listar un solo tipo de Catalogo
  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public ListarCatalogoE(catip: any) {
    //var catipo = catip;
    //var filtoCatalogo = this.CBCatalogoApartado.getRawValue()['CatApartadofiltro'];

    this.servi.getlListCatologoEsp('/' + catip).subscribe(
      (data: {}) => {
        if (catip == 1) {
          this.CataUniCatalogo = data;
          console.log(this.CataUniCatalogo);

        } else if (catip == 2) {
          this.CataUniApartado = data;
          console.log(this.CataUniApartado);
        } else if (catip == 3) {
          this.CataUniDeporte = data;
        } else if (catip == 4) {
          this.CataUniDocumento = data;
        } else if (catip == 5) {
          this.CataUniMetodoPago = data;
        } else if (catip == 6) {
          this.CataUniEps = data;
        } //if(catip == 7)
        else {
          this.CataUniPrefSexual = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //--------------------------------------------------------------
  //Consulta un color por medio de su id.

  public SelecCatalogoE(catip: any, catselec: any) {
    if (this.BuscarEvalor != 0) {
      if (catip == 1) {
        this.BuscarEvalor =
          this.CBCatalogoCatalogo.getRawValue()['CatCatalogofiltro'];
      } else if (catip == 2) {
        this.BuscarEvalor =
          this.CBCatalogoApartado.getRawValue()['CatApartadofiltro'];
      } else if (catip == 3) {
        this.BuscarEvalor =
          this.CBCatalogoDeporte.getRawValue()['CatDeportefiltro'];
      } else if (catip == 4) {
        this.BuscarEvalor =
          this.CBCatalogoDocumento.getRawValue()['CatDocumentofiltro'];
      } else if (catip == 5) {
        this.BuscarEvalor =
          this.CBCatalogoMetodoPago.getRawValue()['CatMetodoPagofiltro'];
      } else if (catip == 6) {
        this.BuscarEvalor =
          this.CBCatalogoIdentidad.getRawValue()['CatIdentidadfiltro'];
      } //if(catip ==7)
      else {
        this.BuscarEvalor =
          this.CBCatalogoTipoContacto.getRawValue()['CatTipoContactofiltro'];
      }
    }
    catselec = this.BuscarEvalor;

    this.servi.getlListCatologoEsp('/' + catip + '/' + catselec).subscribe(
      (data: {}) => {
        if (catip == 1) {
          this.CataUniCatalogoSel = data;
        } else if (catip == 2) {
          this.CataUniApartadoSel = data;
        } else if (catip == 3) {
          this.CataUniDeporteSel = data;
        } else if (catip == 4) {
          this.CataUniDocumentoSel = data;
        } else if (catip == 5) {
          this.CataUniMetodoPagoSel = data;
        } else if (catip == 6) {
          this.CataUniEpsSel = data;
        } //if(catip == 7)
        else {
          this.CataUniTipoContacto = data;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  } //Para insertar una nuevo catalogo

  //-------------------------------------------------------------------------

  InsertarNuevoCatalogo() {
    //variables para armar el JSON que se va a enviar al Back-End

    var datosvalo2 = this.CrearCatalogoU.getRawValue()['textNueTipoCat'];

    var datosvalo3 = this.CrearCatalogoU.getRawValue()['CBTipoCatalogo']; //JSON armado

    var cadena = {
      NombreCatalogo: datosvalo2,

      TipoCatalogo: datosvalo3,
    }; //se consume el servicio

    this.servi
      .CrearCatalogoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      }); //this.LimpiarFormulario();

    this.CrearCatalogoU.reset();
  }

  // -----------------------------------------------------------------------------------------

  //--------------------------------------------------------------

  //Consulta un catalogo por Id.

  public SelCataEditar() {
    this.BuscarEvalor = this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];

    this.servi.getlCatEdit(this.BuscarEvalor).subscribe(
      (data: any) => {
        this.CataUniCataEdi = data;

        //console.log(" aca 45 " + this.CataUniCataEdi.length + " y la data  " + data.length);

        this.titloCataUniEditar = 'CATALOGO A EDITAR';
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // -----------------------------------------------------------------------------------------

  // método para actualizar un catalogo .

  public ActualizarCatalogo() {
    //variables para armar el JSON que se va a enviar al Back-End
    var datosvalo1 = this.ActCatalogoU.getRawValue()['CBCatalogoEdi'];

    var datosvalo2 = this.ActCatalogoU.getRawValue()['textNueDenominacionEdi'];

    var datosvalo3 = this.ActCatalogoU.getRawValue()['CBTipoCatalogoEdi'];

    //JSON armado

    var cadena = {
      id_catalogo_universal: datosvalo1,

      NombreCatalogo: datosvalo2,

      TipoCatalogo: datosvalo3,
    };

    //se consume el servicio

    this.servi
      .ActualizarCatalogoU(cadena)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    this.CrearCatalogoU.reset();
  }

  //=============================================================
  //LAS FUNCIONES PARA LLAMARLAS DESDE EL HTML
  //=============================================================

  //------------------------------------------------------

  ngOnInit(): void {
    this.ListarCatTotales = this.formBuilder.group({});

    this.CBCatalogoCatalogo = this.formBuilder.group({
      CatCatalogofiltro: [],
      textCatalogo: [],
    });

    this.CBCatalogoApartado = this.formBuilder.group({
      CatApartadofiltro: [],
      textApartado: [],
    });

    this.CBCatalogoDeporte = this.formBuilder.group({
      CatDeportefiltro: [],
      textDeporte: [],
    });

    this.CBCatalogoDocumento = this.formBuilder.group({
      CatDocumentofiltro: [],
      textDocumento: [],
    });

    this.CBCatalogoMetodoPago = this.formBuilder.group({
      CatMetodoPagofiltro: [],
      textMetodopago: [],
    });

    this.CBCatalogoIdentidad = this.formBuilder.group({
      CatIdentidadfiltro: [],
      textIdentidad: [],
    });

    this.CBCatalogoTipoContacto = this.formBuilder.group({
      CatTipoContactofiltro: [],
      textTipoContacto: [],
    });

    this.ActCatalogoU = this.formBuilder.group({
      CBCatalogoEdi: [],
      CBTipoCatalogoEdi: [],
      textNueDenominacionEdi: [],
      textNueTipoCatEdi: [],
    });
  }
}
