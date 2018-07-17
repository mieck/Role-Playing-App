import { Component } from '@angular/core';
import { NavController, ToastController  } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import { AlertController } from 'ionic-angular';
import {GlobalProvider} from "../../provider/global";
import {CharRegistrPage} from "../charRegistr/charReg";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {CameraOptions, Camera} from "@ionic-native/camera";
import {DomSanitizer} from "@angular/platform-browser";
import {LoadingController, Loading} from "ionic-angular";
import {FileTransfer, FileTransferObject, FileUploadOptions} from "@ionic-native/file-transfer";

import {File} from "@ionic-native/file";

import {AddAvatarPage} from "../addAvatar/addAvatar";


@Component({
  selector: 'page-character',
  templateUrl: 'character-edit.html'
})
export class CharacterEditPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;
  public profileImage: any;
  public imagePath: any;
  loading: Loading;
  public registered:boolean;
  public images: Array<String>;
  public imageFileName:any;
  public Ausgabe: String;

  constructor(private http: Http, public navCtrl: NavController, private alertCtrl: AlertController,
              public global: GlobalProvider, private camera: Camera, private sanitizer: DomSanitizer,
              public loadingCtrl: LoadingController,
              private transfer: FileTransfer, public toastCtrl: ToastController, private file: File) {
    this.profileImage = "assets/imgs/ProfileImage.png"
    this.name = "";
    this.description = "";
    this.attributes = [];
  }

  // get image from librabry
  // https://stackoverflow.com/questions/47118760/how-to-take-or-choose-image-from-gallery-in-ionic-3
  getImage() {
    const options: CameraOptions =  {
      quality: 100,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.SAVEDPHOTOALBUM,
    }
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
    });

    this.loading.present();

    this.camera.getPicture(options).then((imageURI) => {
      // show Image
      this.profileImage  = this.sanitizer.bypassSecurityTrustUrl(imageURI);
      // show Image
      this.imagePath= imageURI;
      this.imageFileName = this.name + Math.floor(Math.random()* (1 - 50)) + 1; //  Name des Bilds ist CharacterName + integer
      setTimeout(() => {
        this.imagePath= imageURI;
        this.loading.dismiss();
      }, 1000);
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
        this.presentToast(err);
      });
  }

  saveAttributes(){
    if(this.name == undefined || this.name == '')
      this.presentAlert();
    else{

    this.deleteRows();
    let arrayLength = this.attributes.length;
    let dataObj = {CharacterAttributes:[]};

      //dynamische Liste füllen
      for (let i = 0; i < arrayLength; i++) {
        dataObj.CharacterAttributes.push(this.attributes[i]);
      }
      dataObj["CharacterName"] = this.name;
      dataObj["CharacterBeschreibung"] = this.description;

    if(this.imagePath != undefined){
      this.updateAddBild();
      dataObj["CharacterBild"] = this.global.serverHost + '/public/resources/' + this.imageFileName;
    }else{
      dataObj["CharacterBild"] = this.profileImage;
    }

    console.log(dataObj);

      if(!this.global.registrationComplete) {
        var spielerId = window.sessionStorage.getItem("id");
        dataObj["spielerId"] = spielerId;
        this.createData(dataObj);
        this.loading = this.loadingCtrl.create({
          spinner: 'ios',
          content: 'Charakter wird erstellt',
        });
        this.loading.present();

        setTimeout(() => {
          this.navCtrl.setRoot(CharRegistrPage);
          this.navCtrl.popToRoot();

          this.loading.dismiss();
        }, 1000);

      }
      else{
        var characterId = window.sessionStorage.getItem("char_id");
        dataObj["characterId"] = characterId;
        this.updateData(dataObj);
        this.navCtrl.pop();
      }
    }
  }

  createData(data){
    this.http.post(this.global.serverHost + '/new_character', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
      window.sessionStorage.setItem("char_id", response._id);
    });
  }

  updateData(data){
    this.http.post(this.global.serverHost + '/update_character', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
      // const url =  this.global.serverHost + '/public/resources/' + this.imageFileName;
      // this.profileImage  = this.sanitizer.bypassSecurityTrustUrl(url);
    });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  deleteRows(){
    let arrayLength = this.attributes.length;

    for (let i = 0; i < arrayLength; i++) {
      console.log(this.attributes[i].attr)
      if(this.attributes[i].attr == "" || this.attributes[i].value == "") {
        console.log("delete")
        this.attributes.splice(i, 1);
        arrayLength = this.attributes.length;
        --i;
      }
    }
  }

  addAttribute(){

      let insert = {
        attr: "",
        value: "",
      };
      this.attributes.push(insert);
  }

  deleteAttribute(){
    let arrayLength = this.attributes.length;
    if(arrayLength > 1)
      this.attributes.pop();
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Name fehlt!',
      buttons: ['Verstanden']
    });
    alert.present();
  }

  changeAvatars() {
    this.navCtrl.push(AddAvatarPage);
  }

  ionViewDidLoad(){

    if(this.global.registrationComplete) {
      this.registered = true;
    } else {
      this.registered = false;
    }

    var char_id = window.sessionStorage.getItem("char_id");

    if(this.global.registrationComplete){
      this.http.post(this.global.serverHost + '/find_character', {id: char_id}).pipe(
        map(res => res.json())
      ).subscribe(response => {
        this.name = response.CharacterName;
        this.description = response.CharacterBeschreibung;
        this.attributes = response.CharacterAttributes;
        this.profileImage = response.CharacterBild;
      });
    }
  }
}
