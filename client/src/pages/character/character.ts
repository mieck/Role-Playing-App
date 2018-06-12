import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {PostsPage} from "../posts/posts";
import {TabsPage} from "../tabs/tabs";
import {CharacterEditPage} from "../character-edit/character-edit";

@Component({
  selector: 'page-character',
  templateUrl: 'character.html'
})
export class CharacterPage {

  public attributes: Array<any>;
  public description: string;
  public ownChar: boolean;


  constructor(public navCtrl: NavController) {
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

  goToPosts(){
    this.navCtrl.setRoot(TabsPage);
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad(){

    if(this.ownChar) {
      document.getElementById('editButton').style.visibility = 'visible';
    } else {
      document.getElementById('editButton').style.visibility = 'hidden';
    }
  }

}
