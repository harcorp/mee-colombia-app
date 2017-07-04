import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from "../../models/user";

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  user = {} as User;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private afAuth: AngularFireAuth) {
  }

  async register(user: User){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
    }catch (e){
      console.error(e);
    }
  }
}
