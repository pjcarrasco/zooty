import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private _http: HttpClient
  ) { }

  login(loginParams){
    return this._http.post(environment.API_URL + '/usuario/login', loginParams);
  }

  registro(userParams){
    return this._http.post(environment.API_URL + '/usuario', userParams);
  }

  modificarDatosUsuario(userParams){
    return this._http.put(environment.API_URL + '/usuario', userParams);
  }

  consultarDatosUsuario(){

  }

}
