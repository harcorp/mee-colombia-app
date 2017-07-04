import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayName;
  constructor(public navCtrl: NavController,
  private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.displayName = user.displayName;
    });
  }

}
