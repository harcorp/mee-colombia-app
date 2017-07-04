import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import  { AngularFireAuth } from 'angularfire2/auth';

import { DashboardPage } from "../pages/dashboard/dashboard";
import { BolsasPage } from "../pages/bolsas/bolsas";
import { TransaccionesPage } from "../pages/transacciones/transacciones";
import { FaqPage } from "../pages/faq/faq";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'IngresoPage';

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
  public splashScreen: SplashScreen, private afAuth: AngularFireAuth) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Dasboard', component: DashboardPage },
      { title: 'Bolsas', component: BolsasPage },
      { title: 'Transacciones', component: TransaccionesPage },
      { title: 'Centro de Ayuda', component: FaqPage}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  
  cerrarSesion(){
    this.afAuth.auth.signOut();
  }

  footer = "&copy: 2017";

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}