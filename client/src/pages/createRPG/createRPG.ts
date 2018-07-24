import { Component } from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import {CharacterEditPage} from "../character-edit/character-edit";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GlobalProvider} from "../../provider/global";

@Component({
  selector: 'page-createRPG',
  templateUrl: 'createRPG.html'
})


export class CreateRPGPage {

  public rpg_name: String;
  public genre: String;
  public rpg_description: String;
  public genres: Array<String>;
  public rpg:any;

  constructor(public navCtrl: NavController, private http: Http, public global: GlobalProvider, public platform: Platform) {

    this.genres = ["Action", "Romance", "Comedy", "Fantasy", "Sci-Fi", "Slice of Life", "Horror", "Drama"]
    this.platform = platform;
    this.rpg = new FormGroup({
      rpg_name: new FormControl('', Validators.required),
      rpg_description: new FormControl('', Validators.required),
      genre: new FormControl('', Validators.required)
    });

  }

  save() {
    var id = window.sessionStorage.getItem("id");
    let data = {
      "spieltitle": this.rpg.controls.rpg_name.value,
      "spielbeschreibung": this.rpg.controls.rpg_description.value,
      "admin": id,
      "spielgenre": this.rpg.controls.genre.value
    }

    this.http.post(this.global.serverHost + '/new_spiel', data).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log('POST Response:', response);
      window.sessionStorage.setItem("rpgid", response._id);
      this.global.isAdmin = true;
      this.navCtrl.setRoot(CharacterEditPage);
      this.navCtrl.popToRoot();
    });
  }

  abort(){
    this.platform.exitApp()
    console.log("App closed")
  }

}
