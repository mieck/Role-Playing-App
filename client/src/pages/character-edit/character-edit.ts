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
  public charExists: boolean;


  constructor(private http: Http, public navCtrl: NavController, private alertCtrl: AlertController, public global: GlobalProvider, private camera: Camera, private sanitizer: DomSanitizer) {
    this.profileImage = "assets/imgs/ProfileImage.png"

    this.attributes = [
      {attr: "Name", value: "Klaus", databaseAttr: "CharacterName"},
      {attr: "Alter", value: 12, databaseAttr: "CharacterAlter"},
      {attr: "Geschlecht", value: "männlich", databaseAttr: "CharacterGeschlecht"},
    ];

    this.description = "Hier steht was";
    this.charExists = false;

  }

  saveAttributes(){

    this.deleteRows();
    let arrayLength = this.attributes.length;
    let dataObj = {};

    //dynamische Liste füllen
    for (let i = 0; i < arrayLength; i++) {
      let attrName = this.attributes[i]["databaseAttr"];
      let attrValue = this.attributes[i]["value"];

      dataObj[attrName] = attrValue;
    }
    dataObj["CharacterBeschreibung"] = this.description;
    var spielerId = window.sessionStorage.getItem("id");
    dataObj["spielerId"] = spielerId;

    if(!dataObj.hasOwnProperty("CharacterName"))
      this.presentAlert();
    else{

      if(!this.global.registrationComplete) {
        this.createData(dataObj);
        this.navCtrl.setRoot(CharRegistrPage);
        this.navCtrl.popToRoot();
      }
      else{
        this.updateData(dataObj);
        this.navCtrl.pop();
      }
    }
  }

  createData(data){
    this.http.post('http://localhost:8080/new_character', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
    });
  }

  updateData(data){
    this.http.post('http://localhost:8080/update_character', data).pipe(
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
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageURI) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.profileImage  = this.sanitizer.bypassSecurityTrustUrl(imageURI);
      this.imagePath = imageURI;
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

    if(this.charExists) {
      document.getElementById('notification').style.visibility = 'hidden';
    } else {
      document.getElementById('notification').style.visibility = 'visible';
    }
  }



}
