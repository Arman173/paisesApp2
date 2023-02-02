import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _paisService: PaisService
  ) { }

  ngOnInit(): void {

    this._activatedRoute.params
      .pipe(
        // switchMap nos permite retornar otro Observable
        switchMap( ({ id }) => this._paisService.getPaisPorAlpha( id ) ),
        tap( console.log )
      )
      .subscribe( pais => this.pais = pais );

    // this._activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log( id );

    //     this._paisService.getPaisPorAlpha( id )
    //       .subscribe( pais => {
    //         console.log( pais );
    //       });

    //   });
  }

}
