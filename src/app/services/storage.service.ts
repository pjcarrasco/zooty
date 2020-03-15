import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private _storage: Storage
  ) { }

  guardarUsuario(userData){
    this._storage.set('user', userData);
  }

  existeUsuario(){
    return this._storage.get('user');
  }

  eliminarUsuario(){
    this._storage.remove('user');
  }


}
