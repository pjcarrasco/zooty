import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authState = new BehaviorSubject(false);
  private token: string;

  constructor(
    private _storage: StorageService
  ) { }

  isLogged(){
    return this.authState.value;
  }

  setLogged(state: boolean, token: string){
    this.authState.next(state);
    this.token = token;
  }

  logout(){
    this.authState.next(false);
    this.token = null;
    this._storage.eliminarUsuario();
  }

  getToken(){
    return this.token;
  }



}
