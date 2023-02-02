import { Component } from '@angular/core';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';
import { allRegions, Region } from '../../interfaces/region.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [
    `button {
      margin-right: 5px;
      margin-bottom: 5px;
    }`
  ]
})
export class PorRegionComponent {

  regiones: Region[] = allRegions;
  regionActiva: Region = { code: '', name: '' };
  hayError: boolean   = false;
  paises: Country[] = [];

  constructor(
    private _paisService: PaisService
  ) { }

  getBtnClassRegionActive( region: string ): string {
    return ( this.regionActiva.name === region )
            ? 'btn btn-primary'
            : 'btn btn-outline-primary';
  }

  activarRegion( region: Region ) {

    if( this.regionActiva === region ) return;

    this.hayError = false;
    this.regionActiva = region;
    this.paises = [];

    // to do: hacer el llamado al servicio
    this._paisService.buscarRegion( this.regionActiva.code )
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

}
