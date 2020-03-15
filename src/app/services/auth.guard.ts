import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { StorageService } from './storage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private _navCtrl: NavController,
    private _auth: AuthService,
    private _storage: StorageService
  ) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._storage.existeUsuario().then(usuario => {
      if(usuario){
        this._auth.setLogged(true, usuario.token);
        this._navCtrl.navigateForward('home');
        return false;
      }
      return true;
    });
  }
  
}
