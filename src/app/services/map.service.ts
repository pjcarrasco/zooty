import { Injectable } from '@angular/core';

import {
  GoogleMaps,
  GoogleMap
} from '@ionic-native/google-maps';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private radio = 6371;

  constructor() { }

  generarMapa(current): GoogleMap{
    return GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: current.lat, lng: current.lng },
        zoom: 16,
        tilt: 30
      }
    });
  }

  calculoDistanciaMetros(inicio, fin){
    let dLat = this.deg2rad(fin.lat - inicio.lat);
    let dLon = this.deg2rad(fin.lng - inicio.lng); 
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(inicio.lat)) * Math.cos(this.deg2rad(fin.lat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    let dist = this.radio * c;
    return dist * 1000;
  }

  private deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  getMarker(localizacion){
    return {
      position:{
        lat: localizacion.location.coordinates[0],
        lng: localizacion.location.coordinates[1]
      },
      title: localizacion.nombre,
      icon: {}
    }
  }


}
