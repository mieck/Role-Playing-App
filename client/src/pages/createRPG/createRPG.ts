import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";

@Component({
  selector: 'page-createRPG',
  templateUrl: 'createRPG.html'
})
export class CreateRPGPage {

  constructor(public navCtrl: NavController) {

  }

  save() {
    this.navCtrl.setRoot(CharacterEditPage);
    this.navCtrl.popToRoot();
  }

  abort(){

  }

}
