import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import {NavController, LoadingController, ToastController, Events} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';
import {TabsPage} from "../tabs/tabs";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  name:string;
  password:string;
  imageURI:any;
  imageFileName:any;
  base64Image: string;

  constructor(private http: Http, public navCtrl:NavController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController,
              public events: Events) {

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
        "spielername": this.name,
        "spielerpasswort": this.password
    };

    this.http.post('http://localhost:8080/way/login', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });

    /*this.http.get('http://localhost:8080/singup' + this.name).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('GET Response:', response);
    });*/

    this.events.publish('user:login', 'hurray');
  }

}
