import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController   } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { User } from "../../models/user";
import { Facebook } from '@ionic-native/facebook';
/**
 * Generated class for the IngresoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-ingreso',
  templateUrl: 'ingreso.html',
})
export class IngresoPage {

  user = {} as User;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
            private alertCtrl: AlertController, private loadingCtrl: LoadingController,
            private afAuth: AngularFireAuth, private toast: ToastController, 
            private platform: Platform, private fb: Facebook) {

    afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      //this.navCtrl.push('DashboardPage');    
    });
  }

  public createAccount() {
    this.navCtrl.push('RegistroPage');
  }

  async login(user: User){
    try{
    const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    if(result){
      this.navCtrl.setRoot('DashboardPage');
    }
    } catch (e){
      console.error(e);
    }
  }

  signInWithFacebook() {
    if (this.platform.is('cordova')) {
      return this.fb.login(['email', 'public_profile']).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        return firebase.auth().signInWithCredential(facebookCredential);
      })
    }
    else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }
  }

  ionViewDidLoad() {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.navCtrl.setRoot('DashboardPage');
      }else {
        this.toast.create({
          message: 'No ha iniciado sesión',
          duration: 3000
        }).present();
      }
    });
  }


}
