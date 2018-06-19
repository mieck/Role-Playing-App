import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings-edit.html'
})

export class SettingsEditPage {

  public players: Array<any>;
  public rpg_name: String;
  public genre: String;
  public rpg_description: String;
  public admin: String;
  public genres: Array<String>;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController){

    this.players = [
      {teilnehmer: "Player1",
        character: "Bob"},
      {teilnehmer: "Player2",
        character: "Alice"},
    ];
    this.rpg_name = "rpg";
    this.genre = "Action";
    this.rpg_description  = "A rpg";
    this.admin = "Player1";

    this.genres = ["Action", "Romance", "Comedy"]

  }

  deletePlayer(index) {
    if (this.admin != this.players[index].teilnehmer)
      this.presentAlertDelete(index);
    else
      this.presentAlertAdmin();
  }

  saveEdits() {
    this.navCtrl.pop();
  }

  presentAlertDelete(index) {
    const alert = this.alertCtrl.create({
      title: 'Sind Sie sicher, den Spieler entfernen zu wollen?',
      buttons: [
        {
          text: "Ja",
          handler: () => {
            this.players.splice(index, 1);
          }
        },
        {
          text: "Nein",
        }
      ]
    });
    alert.present();
  }

  presentAlertAdmin() {
    const alert = this.alertCtrl.create({
      title: 'Admin kann nicht entfernt werden!',
      buttons: ['Verstanden']
    });
    alert.present();
  }

}
