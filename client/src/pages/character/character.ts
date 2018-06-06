import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {CharacterEditPage} from "../character-edit/character-edit";

@Component({
  selector: 'page-character',
  templateUrl: 'character.html'
})
export class CharacterPage {

  public attributes: Array<any>;
  public description: string;

  constructor(public navCtrl: NavController) {

    this.attributes = [
      {attr: "Name", value: "Klaus"},
      {attr: "Alter", value: 12},
      {attr: "Geschlecht", value: "männlich"},
    ];

    this.description = "Hier steht was";
  }

  editCharacter() {
    this.navCtrl.push(CharacterEditPage);
  }

}
