import {GlobalProvider} from "../../provider/global";
import {Http} from "@angular/http";
import {NavController, NavParams} from "ionic-angular";
import {Component, ElementRef, ViewChild} from "@angular/core";
import {map} from "rxjs/operators";
import {ProfilePage} from "../profile/profile";
import {ChooseAvatarPage} from "../chooseAvatar/chooseAvatar";
import {CharacterPage} from "../character/character";

@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html'
})

export class PostEditPage {

  private postID:String;
  private character:String;
  public text: String;
  public charactername: String;
  public avatar: String;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider, private navParams: NavParams,) {
    this.postID = this.navParams.get('postID');
    this.text = "";
    this.avatar = this.global.avatar;
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  playerCharacter(){
    var char_id = window.sessionStorage.getItem("char_id");
    this.global.otherCharID = char_id;
    this.navCtrl.push(CharacterPage);
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
    this.myInput.nativeElement.style.height = 300 + 'px';
  }

  sendPost(){

    this.removeWhiteSpace();

    let post = {
      "postID": this.postID,
      "text": this.text,
      "character": this.character,
      "avatar": this.avatar,
      "name": this.charactername,
      "edited": true,
    };

    if(this.text != undefined && this.text != ""){

      this.http.post(this.global.serverHost + '/edit_post', post).pipe(
        map(res => res.json())
      ).subscribe(response => {
        this.navCtrl.pop();
      },(err) => {
        console.log(err);
      });
    }
  }

  ionViewDidLoad() {
    this.http.post(this.global.serverHost + '/find_one_post', {id: this.postID}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.text = response.text;
      this.avatar = response.avatar;
      this.character = response.character;
      this.charactername = response.name;
    });
  }

  ionViewWillEnter() {
    this.avatar = this.global.avatar;
  }
}
