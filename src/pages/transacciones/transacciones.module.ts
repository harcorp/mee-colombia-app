import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TransaccionesPage } from './transacciones';

@NgModule({
  declarations: [
    TransaccionesPage,
  ],
  imports: [
    IonicPageModule.forChild(TransaccionesPage),
  ],
  exports: [
    TransaccionesPage
  ]
})
export class TransaccionesPageModule {}
