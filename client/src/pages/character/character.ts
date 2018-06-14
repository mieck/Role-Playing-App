import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";

@Component({
  selector: 'page-character',
  templateUrl: 'character.html'
})
export class CharacterPage {

  public attributes: Array<any>;
  public description: string;
  public ownChar: boolean;


  constructor(public navCtrl: NavController, public events: Events) {
    this.attributes = [
      {attr: "Name", value: "Klaus"},
      {attr: "Alter", value: 12},
      {attr: "Geschlecht", value: "männlich"},
    ];

    this.description = "Hier steht was";
    this.ownChar = true;

  }

  editCharacter() {
    this.navCtrl.push(CharacterEditPage);
  }

  ionViewDidLoad(){

    if(this.ownChar) {
      document.getElementById('editButton').style.visibility = 'visible';
    } else {
      document.getElementById('editButton').style.visibility = 'hidden';
    }
  }

}
