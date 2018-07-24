import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import {NavController, LoadingController, ToastController, Events,AlertController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TabsPage} from "../tabs/tabs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CharacterEditPage} from "../character-edit/character-edit";
import {GlobalProvider} from "../../provider/global";
import {CreateRPGPage} from "../createRPG/createRPG";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user:any;

  constructor(private http: Http, public navCtrl:NavController,
              public events: Events,
              public alerCtrl: AlertController,
              public global: GlobalProvider) {

    this.user = new FormGroup({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

  }

  showConfirm(title,message,firstAction,secondAction) {

    const confirm = this.alerCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: firstAction,
          handler: () => {
            this.navCtrl.push(RegisterPage);
          }
        },
        {
          text: secondAction,
          handler: () => {
            //console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  showAlert(title,message,action) {
    const alert = this.alerCtrl.create({
      title: title,
      subTitle: message,
      buttons:[
        {
          text: action,
          handler: () => {
            this.global.registrationComplete = false;
          }
        }]
    });
    alert.present();
    this.navCtrl.setRoot(CharacterEditPage);
    this.navCtrl.popToRoot();
  }

  GoToRegister(){
    //Mit "Zurück"-Funktion
    this.navCtrl.push(RegisterPage);
  }

  checkLogin() {
    let data = {
        "spielername": this.user.controls.name.value,
        "spielerpasswort": this.user.controls.password.value
    };

    this.http.post(this.global.serverHost + '/login', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      if(response._id == undefined){
        this.showConfirm(response.message,'Registriere dich, falls du noch kein Konto hast!','Registrierung','Neuer Versuch');
        //console.log('POST Response:', response.message);
      }
      else {
        window.sessionStorage.setItem("id", response._id);
        this.global.spielername = response.spielername;
        this.findRPG(response);
      }

    });

  }

  findRPG(spieler) {
    this.http.get(this.global.serverHost + '/find_all').pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log(response.length);
      if (response.length > 0) {
        this.global.isAdmin = spieler.admin;
        window.sessionStorage.setItem("rpgid", response[0]._id);

        if(spieler.Characters.length > 0){
          this.events.publish('user:login', 'hurray');
          window.sessionStorage.setItem("char_id", spieler.Characters[0]);
        }else{
          this.showAlert('Bestätigen','Sie müssen noch einen Charakter erstellen','Okay!');
        }
      } else {
        this.navCtrl.setRoot(CreateRPGPage);
        this.navCtrl.popToRoot();
      }
    });
  }

}
