import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { BolsasPage } from "../pages/bolsas/bolsas";
import { TransaccionesPage } from "../pages/transacciones/transacciones";

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth';
import { Facebook } from '@ionic-native/facebook';
import { DerpPipe } from '../pipes/derp/derp';
import { FaqPage } from "../pages/faq/faq";


export const firebaseConfig = {
    apiKey: "AIzaSyDEF1Tkx3jmSPzMV8kdOPnD1zL9v0AOATQ",
    authDomain: "mee-colombia.firebaseapp.com",
    databaseURL: "https://mee-colombia.firebaseio.com",
    projectId: "mee-colombia",
    storageBucket: "mee-colombia.appspot.com",
    messagingSenderId: "883017914638"
};

@NgModule({
  declarations: [
    MyApp,
    BolsasPage,
    TransaccionesPage,
    FaqPage,
    DerpPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BolsasPage,
    FaqPage,
    TransaccionesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    Facebook
  ]
})
export class AppModule {}
