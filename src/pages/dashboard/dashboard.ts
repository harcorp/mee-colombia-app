import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  noticias: FirebaseListObservable<any[]>;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, private Toast: ToastController,
    afDB: AngularFireDatabase) {

    afAuth.authState.subscribe(user => {
      if (user) {
        this.noticias = afDB.list('/noticias/', {
            query: {
              limitToLast: 10,
              orderByChild: 'timestamp',
            }
        });
      }
    });
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.Toast.create({
          message: 'Bienvenido a la plataforma',
          duration: 3000
        }).present();
      }else {
        this.Toast.create({
          message: 'No ha iniciado sesión',
          duration: 3000
        }).present();
        this.navCtrl.setRoot('IngresoPage');
      }
    });
  }

}
