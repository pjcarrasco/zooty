import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { LugarDetalleComponent } from './lugar-detalle/lugar-detalle.component';
import { LugarNewComponent } from './lugar-new/lugar-new.component';
import { FechaHoraEsPipe } from 'src/app/pipes/fecha-hora-es.pipe';

@NgModule({
  declarations: [
    LugarDetalleComponent,
    LugarNewComponent,
    FechaHoraEsPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
  ],
  entryComponents: [
    LugarDetalleComponent,
    LugarNewComponent
  ],
  exports: [
    LugarDetalleComponent,
    LugarNewComponent
  ]
})
export class LugaresModule { }
