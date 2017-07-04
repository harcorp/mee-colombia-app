import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BolsasPage } from './bolsas';

@NgModule({
  declarations: [
    BolsasPage,
  ],
  imports: [
    IonicPageModule.forChild(BolsasPage),
  ],
  exports: [
    BolsasPage
  ],
  entryComponents: [
    BolsasPage
  ],
})
export class BolsasPageModule {}
