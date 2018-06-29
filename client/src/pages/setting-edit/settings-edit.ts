import { Component } from '@angular/core';
import {AlertController, Loading, LoadingController, NavController} from 'ionic-angular';
import {RegisterPage} from "../register/register";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";

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
  loading: Loading;

  constructor(private http: Http, public navCtrl: NavController, private alertCtrl: AlertController, public global: GlobalProvider, public loadingCtrl: LoadingController){

    this.players = [];
    this.rpg_name = "rpg";
    this.genre = "Action";
    this.rpg_description  = "A rpg";

    this.genres = ["Action", "Romance", "Comedy", "Fantasy", "Sci-Fi", "Slice of Life", "Horror", "Drama"]

  }

  deletePlayer(index, charID) {
    if (this.admin != this.players[index].spielerID)
      this.presentAlertDelete(index);
    else
      this.presentAlertAdmin();
  }

  saveEdits() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
    });
    this.loading.present();

    let data = {
      "spieltitle": this.rpg_name,
      "spielbeschreibung": this.rpg_description,
      "spielgenre": this.genre,
      "admin": this.admin,
    }

    setTimeout(() => {
      this.loading.dismiss();
      this.http.post('http://localhost:8080/update_spiel', data).pipe(
        map(res => res.json())
      ).subscribe(response => {
        this.navCtrl.pop();
      });

      if(this.admin != this.adminID) {
        let settingAdmin = {
          "admin": true,
          "spielerId": this.admin,
        };

        this.http.post('http://localhost:8080/set_admin', settingAdmin).pipe(
          map(res => res.json())
        ).subscribe(response => {
          console.log(response);
        });

        let removingOldAdmin = {
          "admin": false,
          "spielerId": this.adminID,
        };

        this.http.post('http://localhost:8080/set_admin', removingOldAdmin).pipe(
          map(res => res.json())
        ).subscribe(response => {
          console.log(response);
          this.global.isAdmin = false;
        });
      }
    }, 2000)

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
          this.admin = response[i]._id;
        }
        var spieler_id = response[i]._id;
        var char_id = response[i].Characters[0];
        var spielername = response[i].spielername;

        if(char_id == undefined) {
          console.log("undefined Id");
        }else{
          let insert = {"teilnehmer": spielername,
            "charID": char_id,
          "spielerID": spieler_id};
          console.log(insert);

          this.http.post('http://localhost:8080/find_character', {id: char_id}).pipe(
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
