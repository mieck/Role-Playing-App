import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import { AlertController } from 'ionic-angular';
import {CameraOptions} from "@ionic-native/camera";
import {GlobalProvider} from "../../provider/global";
import {CharRegistrPage} from "../charRegistr/charReg";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

@Component({
  selector: 'page-character',
  templateUrl: 'character-edit.html'
})
export class CharacterEditPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;
  public profileImage: string;
  public charExists: boolean;


  constructor(private http: Http, public navCtrl: NavController, private alertCtrl: AlertController, public global: GlobalProvider) {
    this.profileImage ="assets/imgs/ProfileImage.png"

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

    console.log(dataObj);

    if(!dataObj.hasOwnProperty("CharacterName"))
      this.presentAlert();
    else{

      this.sendData(dataObj);
      if(!this.global.registrationComplete) {
        this.navCtrl.setRoot(CharRegistrPage);
        this.navCtrl.popToRoot();
      }
      else{
        this.navCtrl.pop();
      }
    }
  }

  sendData(data){
    this.http.post('http://localhost:8080/new_character', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
        console.log('POST Response:', response.message);
    });
  }

  changeImage(){
    this.profileImage = "assets/imgs/Natsume.png"

      // get image from smartphone

      // const options: CameraOptions = {
      //   quality: 100,
      //   destinationType: this.camera.DestinationType.DATA_URL,
      //   encodingType: this.camera.EncodingType.JPEG,
      //   mediaType: this.camera.MediaType.PICTURE
      // }
      //
      // this.camera.getPicture(options).then((imageData) => {
      //   // imageData is either a base64 encoded string or a file URI
      //   // If it's base64:
      //   var base64Image = 'data:image/jpeg;base64,' + imageData;
      // }, (err) => {
      //   // Handle error
      // });

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
