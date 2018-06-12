import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {

  constructor(public navCtrl: NavController) {

  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

}
