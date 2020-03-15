import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  HtmlInfoWindow
} from '@ionic-native/google-maps';
import { MapService } from 'src/app/services/map.service';
import { LugaresService } from 'src/app/services/lugares.service';
import { ModalController } from '@ionic/angular';
import { LugarDetalleComponent } from 'src/app/components/lugares/lugar-detalle/lugar-detalle.component';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.page.html',
  providers: [Geolocation]
})
export class LugaresPage implements OnInit {

  @ViewChild('info', {static: false}) infoContent: ElementRef;
  public map: GoogleMap;
  public currentPosition;
  public lugares;
  public listaMarkers;
  public markerSelect;
  public infoWindow: HtmlInfoWindow;
  public currentModal: HTMLIonModalElement;
  public mapView: boolean;

  constructor(
    private _geolocation: Geolocation,
    private _mapService: MapService,
    private _lugares: LugaresService,
    private _modalCtrl: ModalController
  ) {
    this.posicionActual();
  }

  ngOnInit() {
  }

  posicionActual(){
    this._geolocation.getCurrentPosition().then((position) => {
      this.currentPosition = {lat : position.coords.latitude, lng: position.coords.longitude};
      this.loadMap();
    });
  }

  loadMap(){
    this.mapView = true;
    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: { lat: this.currentPosition.lat, lng: this.currentPosition.lng },
        zoom: 16,
        tilt: 30
      }
    });
    this.map.one(GoogleMapsEvent.MAP_READY).then(()=>{
      this.obtenerConsulta(this.currentPosition);
    });
    this.map.one(GoogleMapsEvent.CAMERA_MOVE_END).then(()=>{
      let point = this.map.getCameraTarget();
      this.obtenerConsulta(point);
    });
  }

  obtenerConsulta(current){
    let bounds = this.map.getVisibleRegion();
    let distancia = this._mapService.calculoDistanciaMetros(bounds.farLeft, bounds.northeast);
    this.consultarLugares(current, distancia);
  }

  consultarLugares(current, distancia){
    this._lugares.consultaLugaresCercanos(current.lat, current.lng, distancia).subscribe(
      (response: any) =>{
        this.lugares = response.localizaciones;
        this.cargaLocalizaciones();
      }, error => {
        console.log('Error en la consulta de localizaciones');
      }
    )
  }

  cargaLocalizaciones(){
    this.listaMarkers = [];
    for(let i = 0; i<this.lugares.length; i++){
      let options = this._mapService.getMarker(this.lugares[i]);
      this.map.addMarker(options).then((marker: Marker) => {
        marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
          this.markerSelect = i;
          marker.hideInfoWindow();
          this.nuevaInfoWindow().open(marker);
        });
        this.listaMarkers.push({
          markerOptions: options,
          marker: marker,
          idLugar: this.lugares[i].id
        })
      })
    }
  }

  nuevaInfoWindow(): HtmlInfoWindow{
    this.infoWindow = new HtmlInfoWindow();
    this.infoWindow.setContent(this.infoContent.nativeElement, {
      width: "270px",
      height: "55px"
    });
    return this.infoWindow;
  }

  infoIconClose(){
    this.infoWindow.close();
  }

  markerValue(item, defaultValue = ''){
    if(!isNaN(this.markerSelect)){
      return this.lugares[this.markerSelect][item] || defaultValue;
    }
    return '';
  }

  infoIconDetalle(){
    let props = { 
      'lugar': this.lugares[this.markerSelect]
    };
    this.createModal(LugarDetalleComponent, props);
  }

  infoListDetalle(ind){
    let props = { 
      'lugar': this.lugares[ind]
    };
    this.createModal(LugarDetalleComponent, props);
  }


  async createModal(component, props){
    this.currentModal = await this._modalCtrl.create({
      component: component,
      componentProps: props
    });
    await this.currentModal.present();
    this.currentModal.onWillDismiss().then(()=>{
      this.currentModal = null;
    })
  }


  changeView(){
    this.mapView = !this.mapView;
  }
  
  newLocation(){
    console.log('aaaa');
  }
}
