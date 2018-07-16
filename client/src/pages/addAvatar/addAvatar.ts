import { Component } from '@angular/core';
import {Events, NavController} from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";

@Component({
  selector: 'page-addAvatar',
  templateUrl: 'addAvatar.html'
})
export class AddAvatarPage {

  public attributes: Array<any>;
  public description: string;
  public name: string;
  public images: Array<String>;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {
    this.images = ["assets/imgs/Charakter_01_Angry.png", "assets/imgs/Charakter_01_Laughs.png", "assets/imgs/Charakter_01_Smiles.png"];
  }
  //for (let i = 0; i < this.images.length; i++) {
  //  if (this.images.length < 8)
  //this.images.push("assets/imgs/ProfileImage.png");
  //}
}
