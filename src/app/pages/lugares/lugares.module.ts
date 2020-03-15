import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LugaresPageRoutingModule } from './lugares-routing.module';

import { LugaresPage } from './lugares.page';
import { LugaresModule } from '../../components/lugares/lugares.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LugaresPageRoutingModule,
    LugaresModule
  ],
  declarations: [LugaresPage]
})
export class LugaresPageModule {}
