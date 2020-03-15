import { Component, OnInit, Input } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { Comentario } from '../../../interfaces/comentario';
import { LugaresService } from 'src/app/services/lugares.service';

@Component({
  selector: 'app-lugar-detalle',
  templateUrl: './lugar-detalle.component.html'
})
export class LugarDetalleComponent implements OnInit {

  @Input() lugar: any;
  public listaComentarios;
  public comentario: Comentario;
  
  constructor(
    private _modalCtrl: ModalController,
    private _alert: AlertController,
    private _lugares: LugaresService
  ) {}

  ngOnInit() {
  }

  dismissModal(){
    this._modalCtrl.dismiss();
  }

  pushRate(value){
    this.comentario = {
      localizacion: this.lugar._id,
      itemComentario: {
        puntuacion: value,
        comentario: ''
      }      
    }
    this.presentarAlerta();
  }

  presentarAlerta(){
    this._alert.create({
      header: 'Quieres comentar?',
      inputs: [
        {
          name: 'comentario',
          id: 'comentario',
          type: 'textarea',
          placeholder: 'Escribe tu comentario'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, 
        {
          text: 'Ok',
          handler: (data) => {
            this.comentarioConfirm(data.comentario)
          }
        }
      ]
    }).then((alerta) => {
      alerta.present();
    });
  }

  comentarioConfirm(comentario){
    this.comentario.itemComentario.comentario = comentario;
    if(this.listaComentarios) this.comentario.consulta = true;
    this._lugares.nuevoComentario(this.comentario).subscribe(
      (response: any) => {
        //this.cantidad = response.lista;
        //this.totalComentarios = response.total;
        this.listaComentarios = response.comentarios || null;
        this.comentario = null;
      },
      (error)=>{
        console.log('No se ha podido registrar el comentario');
      }
    );
  }

  consultaComentarios(){
    this._lugares.consultaComentarios({localizacion: this.lugar._id}).subscribe(
      (response: any) => {
        this.listaComentarios = response.comentarios;
        this.totalComentarios = response.total;
      },
      (error)=>{
        console.log('No se ha podido registrar el comentario');
      }
    );
  }

  totalComentarios(){
    return this.lugar.positivo + this.lugar.negativo;
  }

}
