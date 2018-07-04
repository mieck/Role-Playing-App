import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {SettingsPage} from "../settings/settings";
import {CharacterPage} from "../character/character";
import {GlobalProvider} from "../../provider/global";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})

export class PostsPage {

  public posts: Array<any>;
  public text: String;
  public charactername: String;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {

    this.posts = [];

    this.text = "";
  }

  goToCharacter(charID) {
    this.global.otherCharID = charID;
    this.navCtrl.push(CharacterPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  sendPost(){

    var char_id = window.sessionStorage.getItem("char_id");

    let post = {
      "text": this.text,
      "avatar": "assets/imgs/ProfileImage.png",
      "character": char_id,
      "name": this.charactername
    };

    this.http.post(this.global.serverHost + '/send_post', post).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.posts.push(post);
      this.text = "";
      this.decrease();
    });
  }

  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    var text = this.myInput.nativeElement.value;
    var lines = text.split("\n");
    if(lines.length >=6){
      this.myInput.nativeElement.style.height = lines.length * 17 + 'px';
    }
    //this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';

  }
  decrease(){
    this.myInput.nativeElement.style.height = 100 + 'px';
  }

  ionViewWillEnter(){
    this.posts = [];
    var char_id = window.sessionStorage.getItem("char_id");

    this.http.post(this.global.serverHost + '/find_character', {id: char_id}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.charactername = response.CharacterName;
    });

    this.http.get(this.global.serverHost + '/list_posts').pipe(
      map(res => res.json())
    ).subscribe(response => {
      for (let i = 0; i < response.length; i++) {
        let post = {
          "text": response[i].text,
          "avatar": "assets/imgs/ProfileImage.png",
          "character": response[i].character,
          "name": response[i].name
        }
        this.posts.push(post);
      }
    });
  }

}
