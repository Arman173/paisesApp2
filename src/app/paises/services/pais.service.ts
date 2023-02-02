import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../interfaces/pais.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v2';

  get httpParams(): HttpParams {
    return new HttpParams().set('fields', 'flag,name,capital,population,alpha2Code');
  }

  constructor(
    private _http: HttpClient
  ) { }

  buscarPais( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/name/${ termino }`;
    return this._http.get<Country[]>( url, { params: this.httpParams } );
  }

  buscarPaisPorCapital( termino: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/capital/${ termino }`;
    return this._http.get<Country[]>( url, { params: this.httpParams } );
  }

  getPaisPorAlpha( id: string ): Observable<Country> {

    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this._http.get<Country>( url );
  }

  buscarRegion( regionCode: string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/regionalbloc/${ regionCode }`;
    return this._http.get<Country[]>( url, { params: this.httpParams } );
  }

}
