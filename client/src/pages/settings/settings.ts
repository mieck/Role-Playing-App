import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import {ProfilePage} from "../profile/profile";
import {SettingsEditPage} from "../setting-edit/settings-edit";
import {GlobalProvider} from "../../provider/global";


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})

export class SettingsPage {

  public players: Array<any>;
  public rpg_name: String;
  public genre: String;
  public rpg_description: String;
  public admin: String;
  public isAdmin: boolean;

  constructor(public navCtrl: NavController, public global: GlobalProvider){

    this.players = [
      {teilnehmer: "Player1",
        character: "Bob"},
      {teilnehmer: "Player2",
        character: "Alice"},
    ];
    this.rpg_name = "rpg";
    this.genre = "Action";
    this.rpg_description  = "A rpg";
    this.admin = "me";

  }

  goToCharacter() {
    this.navCtrl.push(CharacterPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  editSettings() {
    this.navCtrl.push(SettingsEditPage);
  }

  ionViewWillEnter(){
    this.isAdmin = this.global.isAdmin;
    console.log(this.global.isAdmin)
  }

}
