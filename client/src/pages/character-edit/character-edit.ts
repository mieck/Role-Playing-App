import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import { AlertController } from 'ionic-angular';
import {GlobalProvider} from "../../provider/global";
import {CharRegistrPage} from "../charRegistr/charReg";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {CameraOptions, Camera} from "@ionic-native/camera";
import {DomSanitizer} from "@angular/platform-browser";
import {LoadingController, Loading} from "ionic-angular";
import {Crop, CropOptions} from "@ionic-native/crop";

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

  constructor(private http: Http, public navCtrl: NavController, private alertCtrl: AlertController,
              public global: GlobalProvider, private camera: Camera, private sanitizer: DomSanitizer,
              public loadingCtrl: LoadingController, public cropService: Crop) {
    this.profileImage = "assets/imgs/ProfileImage.png"
    this.name = "";
    this.description = "";
    this.attributes = [];

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
    });
  }


  // get image from librabry
  // https://stackoverflow.com/questions/47118760/how-to-take-or-choose-image-from-gallery-in-ionic-3
  getImage() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
    }
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
    });

    this.loading.present();

    this.camera.getPicture(options).then((imageURI) => {
      // show Image
      this.profileImage  = this.sanitizer.bypassSecurityTrustUrl(imageURI);
      //ImagePath with URI
      this.imagePath = imageURI;
      setTimeout(() => {
        this.loading.dismiss();
      }, 3000);

    });

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
      });
    }
  }
}
