import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import { NavController, LoadingController, ToastController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {ProfilePage} from "../profile/profile";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { Camera, CameraOptions } from '@ionic-native/camera';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  name:string;
  password:string;
  imageURI:any;
  imageFileName:any;

  constructor(private http: Http, public navCtrl:NavController,
              private transfer: FileTransfer,
              private camera: Camera,
              public loadingCtrl: LoadingController) {

  }


  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
    });
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
        console.log(data+" Uploaded Successfully");
        this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg"
        loader.dismiss();
      }, (err) => {
        console.log(err);
        loader.dismiss();
      });
  }

  GoToRegister(){
    //Mit "Zurück"-Funktion
    this.navCtrl.push(RegisterPage);

    //Ohne "Zurück"-Funktion
    // this.navCtrl.setRoot(RegisterPage);
    // this.navCtrl.popToRoot();
  }


  loadImage() {

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

    this.navCtrl.setRoot(ProfilePage);
    this.navCtrl.popToRoot();

  }

}
