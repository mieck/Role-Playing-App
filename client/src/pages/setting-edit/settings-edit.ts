import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

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
  public adminID: String;

  constructor(private http: Http, public navCtrl: NavController, private alertCtrl: AlertController){

    this.players = [];
    this.rpg_name = "rpg";
    this.genre = "Action";
    this.rpg_description  = "A rpg";
    this.admin = "Player1";

    this.genres = ["Action", "Romance", "Comedy", "Fantasy", "Sci-Fi", "Slice of Life", "Horror", "Drama"]

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

  ionViewDidLoad(){

    this.http.get('http://localhost:8080/find_spiel').pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.rpg_name = response.spieltitle;
      this.rpg_description = response.spielbeschreibung;
      this.genre = response.spielgenre;
      this.adminID = response.admin;
    });

    this.players = [];

    this.http.get('http://localhost:8080/settings').pipe(
      map(res => res.json())
    ).subscribe(response => {
      let arrayLength = response.length;
      for (let i = 0; i < arrayLength; i++) {

        if(response[i].admin){
          this.admin = response[i].spielername;
        }

        var char_id = response[i].Characters[0];
        var spielername = response[i].spielername;

        let insert = {"teilnehmer": spielername,
          "charID": char_id};

        console.log(insert);

        this.http.post('http://localhost:8080/find_character', {id: char_id}).pipe(
          map(res => res.json())
        ).subscribe(response => {
          insert["character"] = response.CharacterName;
        });
        this.players.push(insert);
      }
      console.log(this.players);
    });
  }

}
