import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import {NavController, LoadingController, ToastController, Events,AlertController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TabsPage} from "../tabs/tabs";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  user:any;
  imageURI:any;
  imageFileName:any;
  base64Image: string;

  constructor(private http: Http, public navCtrl:NavController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public events: Events,
              public alerCtrl: AlertController) {

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
            this.events.publish('user:login', 'hurray');
          }
        }]
    });
    alert.present();
  }

  GoToRegister(){
    //Mit "Zurück"-Funktion
    this.navCtrl.push(RegisterPage);

    //Ohne "Zurück"-Funktion
    // this.navCtrl.setRoot(RegisterPage);
    // this.navCtrl.popToRoot();
  }

  checkLogin() {
    let data = {
        "spielername": this.user.controls.name.value,
        "spielerpasswort": this.user.controls.password.value
    };

    this.http.post('http://localhost:8080/login', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      if(response._id == undefined){
        this.showConfirm(response.message,'Registriere dich, falls du noch kein Konto hast!','Registrierung','Neuer Versuch');
        //console.log('POST Response:', response.message);
      }
      else {
         this.showAlert('Bestätigen','Benutzername und Passwort richtig!','Spielen!');
        window.sessionStorage.setItem("id", response._id);

        var id = window.sessionStorage.getItem("id");
        console.log(id);
      }

    });

    /*this.http.get('http://localhost:8080/singup' + this.name).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });*/

  }

}
