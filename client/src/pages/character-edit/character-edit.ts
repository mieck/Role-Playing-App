import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import { AlertController } from 'ionic-angular';
import {CameraOptions} from "@ionic-native/camera";

@Component({
  selector: 'page-character',
  templateUrl: 'character-edit.html'
})
export class CharacterEditPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;
  public profileImage: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {
    this.profileImage ="https://img1.ak.crunchyroll.com/i/spire3/3614810e9ada5235038e8deb4adc264c1447729591_large.jpg"

    this.attributes = [
      {attr: "Name", value: "Klaus"},
      {attr: "Alter", value: "12"},
      {attr: "Geschlecht", value: "männlich"},
    ];

    this.description = "Hier steht was";
  }

  saveAttributes(){

    this.deleteRows();
    let arrayLength = this.attributes.length;
    let dataObj = {};

    //dynamische Liste füllen
    for (let i = 0; i < arrayLength; i++) {
      let attrName = this.attributes[i]["attr"];
      let attrValue = this.attributes[i]["value"];

      dataObj[attrName] = attrValue;
    }

    console.log(this.attributes);

    if(!dataObj.hasOwnProperty("Name"))
      this.presentAlert();
    else{
      this.navCtrl.setRoot(CharacterPage);
      this.navCtrl.popToRoot();
    }
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


}
