import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {SettingsPage} from "../settings/settings";
import {CharacterPage} from "../character/character";

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {

  constructor(public navCtrl: NavController) {

  }

  goToCharacterEdit() {
    this.navCtrl.push(CharacterPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  goToSettings() {
    this.navCtrl.push(SettingsPage);
  }

}
