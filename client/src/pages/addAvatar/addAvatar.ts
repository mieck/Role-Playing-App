import { Component } from '@angular/core';
import {AlertController, Events, Loading, LoadingController, NavController, ToastController} from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";
import {CameraOptions, Camera} from "@ionic-native/camera";
import {DomSanitizer} from "@angular/platform-browser";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";

@Component({
  selector: 'page-addAvatar',
  templateUrl: 'addAvatar.html'
})
export class AddAvatarPage {

  public name: string;
  public images: Array<any>;
  public loading: Loading;
  public imagePath: any;
  public imageFileName:any;
  public Ausgabe: String;
  public numberOfAvatars: number;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider,
              public loadingCtrl: LoadingController,
              private transfer: FileTransfer, public toastCtrl: ToastController,
              private camera: Camera, private sanitizer: DomSanitizer,
              private alertCtrl: AlertController,) {
    this.numberOfAvatars = 0;
  }

  uploadToCharacter() {
    var char_id = window.sessionStorage.getItem("char_id");
    let avatarImage = this.global.imageServer + this.imageFileName;

    this.http.post(this.global.serverHost + '/uploadAvatar', {id: char_id, avatar: avatarImage}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
      this.images.push(avatarImage);
      this.numberOfAvatars++;
      //const url =  this.global.serverHost + '/public/resources/' + this.imageFileName;
      //this.profileImage  = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }

  updateAddBild(){

    let options: FileUploadOptions = {
      fileKey: 'file',
      fileName: this.imageFileName,
      chunkedMode: false,
      mimeType: "image/png",
      httpMethod:'POST',
      headers: {}
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    console.log("file transfert");
    fileTransfer.upload(this.imagePath, this.global.serverHost + '/new_image_character', options)
      .then((data) => {
        this.Ausgabe = data+" Uploaded Successfully";
        this.presentToast("Image uploaded successfully");
      },(err) => {
        console.log(err);
        this.presentToast(this.imagePath + ' ' + err);
      });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 7000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  addAvatar(){
    if(this.numberOfAvatars < 8){

      const options: CameraOptions =  {
        quality: 100,
        allowEdit: true,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.PNG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
      }

      this.camera.getPicture(options).then((imageURI) => {
        this.imageFileName = this.name + Math.floor(Math.random()* (1 - 50)) + 1; //  Name des Bilds ist CharacterName + integer
        this.imagePath= imageURI;
        this.updateAddBild();
        this.uploadToCharacter();
      });

    }else{
      let message = 'Maximal 8 Avatare';
      this.presentAlert(message);
    }
  }

  presentAlert(message) {
    let alert = this.alertCtrl.create({
      title: message,
      buttons: ['Verstanden']
    });
    alert.present();
  }

  deleteAvatar(){
    if(this.numberOfAvatars > 0){
      //Folgt noch
    }else{
      let message = 'Löschen nicht möglich';
      this.presentAlert(message);
    }
  }

  ionViewDidLoad() {
    var char_id = window.sessionStorage.getItem("char_id");

    if (this.global.registrationComplete) {
      this.http.post(this.global.serverHost + '/find_character', {id: char_id}).pipe(
        map(res => res.json())
      ).subscribe(response => {
        this.name = response.CharacterName;
        this.images = response.avatar;

        this.numberOfAvatars = this.images.length;
      });
    }
  }
}
