import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {CharacterPage} from "../character/character";
import {ProfilePage} from "../profile/profile";
import {SettingsEditPage} from "../setting-edit/settings-edit";
import {GlobalProvider} from "../../provider/global";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";


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
  public adminID: String;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider){

    this.players = [];

    this.rpg_name = "rpg";
    this.genre = "Action";
    this.rpg_description  = "A rpg";
    this.admin = "me";

  }

  goToCharacter(charID) {
    this.navCtrl.push(CharacterPage);
    this.global.otherCharID = charID;
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  editSettings() {
    this.navCtrl.push(SettingsEditPage);
  }

  ionViewWillEnter(){
    this.global.isAdmin;

    if (this.global.isAdmin) {
      document.getElementById('editButton').style.visibility = 'visible';
    } else {
      document.getElementById('editButton').style.visibility = 'hidden';
    }

    this.http.get(this.global.serverHost + '/find_spiel').pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.rpg_name = response.spieltitle;
      this.rpg_description = response.spielbeschreibung;
      this.genre = response.spielgenre;
      this.adminID = response.admin;
    });

    this.players = [];

    this.http.get(this.global.serverHost + '/settings').pipe(
      map(res => res.json())
    ).subscribe(response => {
      let arrayLength = response.length;
      for (let i = 0; i < arrayLength; i++) {

        if(response[i].admin){
          this.admin = response[i].spielername;
        }

        var char_id = response[i].Characters[0];
        var spielername = response[i].spielername;

        if(char_id == undefined) {
          console.log("undefined Id");
        }else {

          let insert = {
            "teilnehmer": spielername,
            "charID": char_id
          };

          console.log(insert);

          this.http.post(this.global.serverHost + '/find_character', {id: char_id}).pipe(
            map(res => res.json())
          ).subscribe(response => {
            insert["character"] = response.CharacterName;
          });
          this.players.push(insert);
        }
      }
      console.log(this.players);
    });
  }

}
