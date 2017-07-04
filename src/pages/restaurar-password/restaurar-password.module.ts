import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestaurarPasswordPage } from './restaurar-password';

@NgModule({
  declarations: [
    RestaurarPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(RestaurarPasswordPage),
  ],
  exports: [
    RestaurarPasswordPage
  ]
})
export class RestaurarPasswordPageModule {}
