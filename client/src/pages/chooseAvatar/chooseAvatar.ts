import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";

@Component({
  selector: 'page-chooseAvatar',
  templateUrl: 'chooseAvatar.html'
})
export class ChooseAvatarPage {

  public attributes: Array<any>;
  public description: string;
  public images: Array<String>;
  public standardImages: Array<String>;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {

    this.standardImages = ["assets/imgs/Charakter_01_Angry.png", "assets/imgs/Charakter_01_Laughs.png", "assets/imgs/Charakter_01_Smiles.png",
      "assets/imgs/Charakter_02_Angry.png", "assets/imgs/Charakter_02_Laughs.png", "assets/imgs/Charakter_02_Smiles.png"];

  }

  chosenAvatar(file){
    this.global.avatar = file;
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    var char_id = window.sessionStorage.getItem("char_id");

    if (this.global.registrationComplete) {
      this.http.post(this.global.serverHost + '/find_character', {id: char_id}).pipe(
        map(res => res.json())
      ).subscribe(response => {
        this.images = response.avatar;
      });
    }
  }

}
