import { Component} from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController } from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable} from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FaqPage } from "../faq/faq";
import { TransaccionesPage } from "../transacciones/transacciones";

@IonicPage()
@Component({
  selector: 'page-bolsas',
  templateUrl: 'bolsas.html',
})
export class BolsasPage {

  items: FirebaseListObservable<any[]>;
  usuarios: FirebaseObjectObservable<any[]>;
  afiliados: any[];
  saldos: FirebaseObjectObservable<any[]>;
  uid: String;
  referidoPor: String;
  bolsaInicial: boolean;
  activoBolsa: boolean = true;
  numeroBolsas: number;


  selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private afAuth: AngularFireAuth, public afDB: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    this.selectedItem = navParams.get('item');

      afAuth.authState.subscribe(user => {
      if (user) {
        this.uid = user.uid;
        this.usuarios = afDB.object('usuarios/' + this.uid, { preserveSnapshot: true });
        this.usuarios.subscribe(snapshots=>{
          snapshots.forEach(snapshot => { 
            if(snapshot.key == "referidoPor") this.referidoPor = snapshot.val();
            if(snapshot.key == "bolsaInicial") this.bolsaInicial = snapshot.val();
          });
        });
        this.items = afDB.list('/bolsas/' + user.uid, {
            query: {
              limitToLast: 6,
              orderByChild: 'timestamp',
            }
        });
        this.items.subscribe(snapshots => {
          this.numeroBolsas = snapshots.length;
        });
        this.saldos = afDB.object('saldos/' + user.uid, { preserveSnapshot: true });
      }
    });
  } 

  presentActionSheet() {
   let actionSheet = this.actionSheetCtrl.create({
     title: 'Operaciones',
     buttons: [
       {
         text: 'Crear Bolsa de Microinversion',
         icon: 'add',
         role: 'destructive',
         handler: () => {
           if(this.numeroBolsas < 3){
              this.validarSaldoBolsa();
           }else{
             let alerta = this.alertCtrl.create({
               title: 'Prohibido',
               message: 'Solo puede tener 3 bolsas activas simultaneamente. Para abrir una nueva debe terminar una',
               buttons: ['Aceptar']
             });
             alerta.present();
           }
           
         }
       },
       {
         text: 'Ayuda',
         icon: 'help-circle',
         handler: () => {
           this.navCtrl.push(FaqPage);
         }
       },
       {
         text: 'Cancelar',
         role: 'cancel',
         handler: () => {
         }
       }
     ]
   });

   actionSheet.present();
 }

 validarSaldoBolsa(){
   this.saldos.subscribe(snapshots=>{
        if(this.activoBolsa){
          this.activoBolsa = false;
          snapshots.forEach(snapshot => {
          if(snapshot.key == "saldo"){
            if(snapshot.val() >= 30000){
                let alert = this.alertCtrl.create();
                alert.setTitle('Activar Bolsa');
                alert.setMessage('Se activara una nueva bolsa de microinversión para empezar a generar ganancias.');
                alert.addButton('Cancelar');
                alert.addButton({
                  text: 'Activar',
                  handler: () => {
                    this.crearBolsa(snapshot.val());
                  }
                });
                alert.present();
            }else{
                let alert = this.alertCtrl.create();
                alert.setTitle('Saldo Insuficiente');
                alert.setMessage('Dirigete a a la sección de transacciones para agregar saldo.');
                alert.addButton('Cancelar');
                alert.addButton({
                  text: 'Recargar',
                  handler: data => {
                    this.navCtrl.setRoot(TransaccionesPage);
                  }
                });
                alert.present();
            }
          }
        });
        }
        
    });
 }

 crearBolsa(saldo: number){
    let loader = this.loadingCtrl.create({
      content: "Por favor espere..."
    });
    loader.present();
    this.afDB.object('/saldos/' + this.uid + '/saldo').set(saldo - 30000)
      .then(_ => {
        let alerta = this.alertCtrl.create();
        alerta.setTitle('Bolsa Creada');
        alerta.setMessage('Su bolsa ha sido creada correctamente. Puede empezar a agregar afiliados');
        alerta.addButton('OK');
        this.activoBolsa = true;
        if(!this.bolsaInicial){
          this.items.push({  
            "enabled" : true,
            "referido" : this.referidoPor,
            "subafl" : 0,
            "valor" : 0,
            "timestamp" : Date.now() / 1000 | 0
          }).then(_ => {
            loader.dismiss();
            alerta.present();
          });
        }else{
          this.items.push({  
            "enabled" : true,
            "referido" : "rodrihd",
            "subafl" : 0,
            "valor" : 0,
            "timestamp" : Date.now() / 1000 | 0
          }).then(_ => {
            loader.dismiss();
            alerta.present();
          });
        }
      });
 }
}

