import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';


@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `
  ]
})
export class PorPaisComponent {

  termino     : string    = '';
  hayError    : boolean   = false;
  paises      : Country[] = [];
  sugerencias : Country[] = [];

  mostrarSugerencias: boolean = false;

  constructor(
    private _paisService: PaisService
  ) { }

  buscar( termino: string ) {
    
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = false;

    this._paisService.buscarPais( this.termino )
      .subscribe( paises => {
        
        // si hay un error...
        if( !Array.isArray( paises ) ) {
          this.hayError = true;
          this.paises = [];
          return;
        }

        // si no hay error...
        this.paises = paises;
        console.log( paises );
      });
  }

  setSugerencias( termino: string ) {

    // si esta vacio el termino, no hacemos nada
    if ( termino.trim().length === 0 ) { this.sugerencias = []; return; }

    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;

    this._paisService.buscarPais( termino )
      .subscribe( 
        paises => {
          // no hay paises para mostrar ( error! )
          if ( !Array.isArray( paises ) ) { this.sugerencias = []; return; }

          this.sugerencias = paises.splice(0, 5);
        }
      );
    
  }

}
