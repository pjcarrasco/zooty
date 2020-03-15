import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

  constructor(
    private _http: HttpClient
  ) { }

  consultaLugaresCercanos(lat, long, distancia){
    return this._http.get(environment.API_URL + `/localizacion/list/${lat}/${long}/${distancia}`);
  }

  nuevoComentario(params){
    return this._http.post(environment.API_URL + '/comentario', params);
  }

  consultaCantidadComentarios(params){
    return this._http.post(environment.API_URL + '/comentario/cantidad', params);
  }

  consultaComentarios(params){
    return this._http.post(environment.API_URL + '/comentario/list', params);
  }

}
