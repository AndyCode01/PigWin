import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MiservicioService } from '../miservicio.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private servi: MiservicioService,
    Router: Router
  ) {}

  Equipos: Array<any> = [];
  EquiposFiltrados : Array<any> = [];
  KeysEquipo: Array<any> = [];

  showTable: boolean = false;
  filters: Array<string> = [];
  valuefilters: Array<string> = [];

  showInputModificar: boolean = false;


  FormBusquedaEquipo = new FormGroup({
    TipoBusquedaEquipo: new FormControl(),
    ValorBusquedaEquipo: new FormControl(),
  });

  FormCrearEquipo = new FormGroup({
    'Nombre Equipo': new FormControl(),
    'Deporte': new FormControl()
  });

  FormModificarEquipo = new FormGroup({
    TipoBusquedaEquipo: new FormControl(),
    ValorBusquedaEquipo: new FormControl(),
    'Nombre Equipo': new FormControl(),
    'Deporte': new FormControl()
  });

  public consultarEquiposTotales(){
    this.servi.getEquiposTotales().subscribe((data) => {
      this.Equipos = data;
      this.KeysEquipo = Object.keys(this.Equipos[0]);
      this.filtros(this.FormBusquedaEquipo);
    });
  }

  public mostrarTabla() {
    this.showTable = true;
  }

  public limpiarLista() {
    if (this.Equipos.length > 1 && this.showTable == true)
      this.showTable = false;
  }

  public filtros(Form: FormGroup) {
    
    const tipoBusqueda = Form.getRawValue()['TipoBusquedaEquipo'];
    this.valuefilters = this.listaValoresAtributo(tipoBusqueda);
    console.log(tipoBusqueda, this.Equipos, this.valuefilters);
  }


  public listaValoresAtributo(tipoBusqueda: string) {
    
    let valores: Array<string> = [];
    let flag: boolean = true;
    for (let index = 0; index < this.Equipos.length; index++) {
      valores.filter((valor) => {
        if (valor == this.Equipos[index][tipoBusqueda]) flag = false;
      });
      if (flag == true) valores.push(this.Equipos[index][tipoBusqueda]);
      flag = true;
    }
    return valores;
  }

  public async BuscarEquipo(Form: FormGroup) {
    const valores = {
      tipoBusqueda: Form.getRawValue()['TipoBusquedaEquipo'],
      valorFiltro: Form.getRawValue()['ValorBusquedaEquipo'],
    };

    this.servi.getEquipoByID(valores?.valorFiltro).subscribe((data) => {
      this.EquiposFiltrados = data;
    });
  }

  public valoresByTipoCatalogo(id_tipo_catalogo: number) {
    return this.servi.getTipoCatalogo(id_tipo_catalogo).pipe(map((data) => data));
  }

  public async buscarValorCatalogo(atributo: string, valor: string) {
    let id_tipo_catalogo: number = 0;
    let catalogo: any;

    switch (atributo) {
      case 'Deporte':
        catalogo = await this.valoresByTipoCatalogo(3).toPromise();
        break;

    }

    for (let index = 0; index < catalogo?.length; index++) {
      if (valor == catalogo[index].NombreCatalogo) {
        id_tipo_catalogo = catalogo[index].id_catalogo_universal;
      }
    }
    return id_tipo_catalogo;
  }

  public async registrarEquipo() {
    let newEquipo: any = {};
    const values = this.FormCrearEquipo.getRawValue();
    for (const key in values) {
      if (key == 'Deporte') {
        newEquipo[key.replace(/ /g, '')] = await this.buscarValorCatalogo(
          key,
          values[key]
        );
      } else {
        newEquipo[key.replace(/ /g, '')] = values[key];
      }
    }

    try {
      const res = await this.servi.CrearEquipo(newEquipo);
      console.log(newEquipo);
      this.FormCrearEquipo.reset();
      this.consultarEquiposTotales();
      console.log(res);
    } catch (error) {
      console.log(error);
    }

  }

  ngOnInit(): void {
    this.consultarEquiposTotales();
    this.filtros(this.FormBusquedaEquipo);
    this.FormCrearEquipo = this.formBuilder.group({
      'Nombre Equipo': '',
      'Deporte': '',
    });

  }

}
