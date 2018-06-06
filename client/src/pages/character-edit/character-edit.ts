import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-character',
  templateUrl: 'character-edit.html'
})
export class CharacterEditPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

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
