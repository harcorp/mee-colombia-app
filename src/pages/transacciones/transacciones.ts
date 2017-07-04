import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@IonicPage()
@Component({
  selector: 'page-transacciones',
  templateUrl: 'transacciones.html',
})
export class TransaccionesPage {
  selectedItem: any;
  items: FirebaseListObservable<any[]>;
  saldos: FirebaseObjectObservable<any[]>;
  saldoInterno: FirebaseObjectObservable<any[]>;
  solicitudes: FirebaseListObservable<any[]>;

  saldoActual: number;
  uid: String;
  constructor(public navCtrl: NavController, public navParams: NavParams,
          afDB: AngularFireDatabase, private afAuth: AngularFireAuth,
          public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
    this.selectedItem = navParams.get('item');

  afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.items = afDB.list('/transacciones/' + user.uid, {
            query: {
              limitToLast: 20,
              orderByChild: 'timestamp',
            }
        });

        this.saldos = afDB.object('/saldos/' + user.uid);
        this.saldoInterno = afDB.object('saldos/' + user.uid, { preserveSnapshot: true});
        this.solicitudes = afDB.list('solicitudes');
        this.saldoInterno.subscribe(snapshots => {
          snapshots.forEach(snapshot => {
            if(snapshot.key == 'saldo') this.saldoActual = snapshot.val();
          });
        });
      }
    });
    
  }

   presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Operaciones',
     buttons: [
       {
         text: 'Recargar Cuenta',
         icon: 'arrow-dropup-circle',
         handler: () => {
           
         }
       },
       {
         text: 'Solicitar Retiro',
         icon: 'arrow-dropdown-circle',
         handler: () => {
           if(this.saldoActual >= 80000){
              this.retirarCuenta();
              console.log("Solicito retiro");
           }else{
             let alert = this.alertCtrl.create();
             alert.setTitle('Saldo insuficiente');
             alert.setMessage('Recuerde que el retiro minimo de su cuenta es de $80.000 pesos, por favor espere a completar el saldo.');
             alert.addButton('Aceptar');
             alert.present();
           }
         }
       },
       {
         text: 'Cancelar',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
     ]
   });

   actionSheet.present();
 }


 recargarCuenta(){

 }

 retirarCuenta(){
   let alerta = this.alertCtrl.create();
   alerta.setTitle('Solicitar Retiro');
   alerta.setMessage('Puede solicitar un retiro minimo de $80.000');
   alerta.addInput({
     type: 'number',
     name: 'valor',
     placeholder: 'Ingrese Valor',
     min: '80000'
   });
   alerta.addButton('Cancelar');
   alerta.addButton({
     text: 'Retirar',
     handler: data => {
      this.solicitudes.push({
        'type': 2,
        'userUID': this.uid,
        'valor': +data.valor,
        'timestamp': Date.now() / 1000 | 0,
        'aproved': false
      });
     }
   });
   alerta.present();

 }

}
