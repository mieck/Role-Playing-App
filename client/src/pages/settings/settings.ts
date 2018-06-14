import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import {PostsPage} from "../posts/posts";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  constructor(public navCtrl: NavController) {

  }

  goToCharacter() {
    this.navCtrl.push(CharacterPage);
  }

  goToPosts() {
    this.navCtrl.popToRoot();
  }

}
