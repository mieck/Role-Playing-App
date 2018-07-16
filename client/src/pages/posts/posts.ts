import {Component, ElementRef, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {SettingsPage} from "../settings/settings";
import {CharacterPage} from "../character/character";
import {GlobalProvider} from "../../provider/global";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {ChooseAvatarPage} from "../chooseAvatar/chooseAvatar";

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})

export class PostsPage {

  public posts: Array<any>;
  public text: String;
  public charactername: String;
  public avatar: String;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {
    this.posts = [];
    this.text = "";
    this.avatar = this.global.avatar;
  }

  goToCharacter(charID) {
    this.global.otherCharID = charID;
    this.navCtrl.push(CharacterPage);
  }

  playerCharacter(){
    var char_id = window.sessionStorage.getItem("char_id");
    this.global.otherCharID = char_id;
    this.navCtrl.push(CharacterPage);
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  sendPost(){
    var char_id = window.sessionStorage.getItem("char_id");

    this.removeWhiteSpace();

    let post = {
      "text": this.text,
      "avatar": this.avatar,
      "character": char_id,
      "name": this.charactername
    };

    if(this.text != undefined && this.text != ""){

      this.http.post(this.global.serverHost + '/send_post', post).pipe(
        map(res => res.json())
      ).subscribe(response => {
        this.posts.push(post);
        this.text = "";
        this.decrease();
      },(err) => {
        console.log(err);
      });
    }
  }

  chooseAvatar(){
    this.navCtrl.push(ChooseAvatarPage);
  }

  @ViewChild('myInput') myInput: ElementRef;
  removeWhiteSpace(){
    var input = this.myInput.nativeElement.value;
    this.text = input.replace(/^\s*|\s*$/g,'');
  }

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
    this.avatar = this.global.avatar;
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
      if (response.length > 0){
        for (let i = 0; i < response.length; i++) {
          let post = {
            "text": response[i].text,
            "avatar": response[i].avatar,
            "character": response[i].character,
            "name": response[i].name
          }
          this.posts.push(post);
        }
      }
    });
  }

}
