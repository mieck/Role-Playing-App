import {Component, ElementRef, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import {CharacterPage} from "../character/character";
import {GlobalProvider} from "../../provider/global";
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {ChooseAvatarPage} from "../chooseAvatar/chooseAvatar";
import {PostEditPage} from "../post-edit/post-edit";

const postsPerPage = 15;
@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})

export class PostsPage {

  public posts: Array<any>;
  public postsToShow: Array<any>;
  public text: String;
  public charactername: String;
  public avatar: String;
  public numberOfPages: number;
  public currentPage: number;
  public lastPage: boolean;
  public noPost: boolean;

  constructor(private http: Http, public navCtrl: NavController, public global: GlobalProvider) {
    this.posts = [];
    this.postsToShow = [];
    this.text = "";
    this.avatar = this.global.avatar;
    this.numberOfPages = 1;
    this.currentPage = 1;
    this.lastPage = true;
    this.noPost = true;
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

    var rpg_id = window.sessionStorage.getItem("rpgid");

    let post = {
      "rpgid": rpg_id,
      "text": this.text,
      "avatar": this.avatar,
      "character": char_id,
      "name": this.charactername,
      "edited": false,
    };

    if(this.text != undefined && this.text != ""){

      this.http.post(this.global.serverHost + '/send_post', post).pipe(
        map(res => res.json())
      ).subscribe(response => {
        post["postID"] = response._id;
        post["ownPost"] = true;
        this.posts.push(post);
        this.postsToShow = this.posts.slice(postsPerPage*(this.numberOfPages-1), this.posts.length);
        this.text = "";
        this.decrease();
      },(err) => {
        console.log(err);
      });
    }
  }

  editPost(postID){
    this.navCtrl.push(PostEditPage, { postID: postID });
  }

  chooseAvatar(){
    this.navCtrl.push(ChooseAvatarPage);
  }

  @ViewChild('content') content: Content;
  scrollToBottom(){
    this.content.scrollToBottom();
  }

  @ViewChild('myInput') myInput: ElementRef;
  removeWhiteSpace(){
    var input = this.myInput.nativeElement.value;
    this.text = input.replace(/^\s*|\s*$/g,'');
  }

  resize() {
    var text = this.myInput.nativeElement.value;
    //var lines = text.split("\n");
    //if(lines.length >=6){
      //this.myInput.nativeElement.style.height = lines.length * 17 + 'px';
    //}
    this.myInput.nativeElement.style.height = this.myInput.nativeElement.scrollHeight + 'px';

  }
  decrease(){
    this.myInput.nativeElement.style.height = 100 + 'px';
  }

  toFirstPage(){
    this.currentPage = 1;
    if(this.currentPage != this.numberOfPages){
      this.postsToShow = this.posts.slice(postsPerPage*(this.currentPage-1), (postsPerPage*this.currentPage));
      this.lastPage = false;
    }
  }

  toPageBefore(){
    if(this.currentPage > 1 ){
      this.currentPage = this.currentPage - 1;
      if(this.currentPage != this.numberOfPages) {
        this.postsToShow = this.posts.slice(postsPerPage * (this.currentPage - 1), (postsPerPage * this.currentPage));
        this.lastPage = false;
      }
    }
  }

  toPageAfter(){
    if(this.currentPage < this.numberOfPages){
      this.currentPage = this.currentPage + 1;
      this.postsToShow = this.posts.slice(postsPerPage*(this.currentPage-1), (postsPerPage*this.currentPage));

      if(this.currentPage == this.numberOfPages)
        this.lastPage = true;
    }
  }

  toLastPage(){
    this.currentPage = this.numberOfPages;
    this.postsToShow = this.posts.slice(postsPerPage*(this.currentPage-1), (postsPerPage*this.currentPage));
    this.lastPage = true;
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
            "postID": response[i]._id,
            "text": response[i].text,
            "avatar": response[i].avatar,
            "character": response[i].character,
            "name": response[i].name,
            "edited": response[i].edited,
          }
          if(char_id == response[i].character){
            post["ownPost"] = true;
          }
          else{
            post["ownPost"] = false;
          }
          this.posts.push(post);
        }
        this.noPost = false;
        this.numberOfPages = Math.ceil(this.posts.length/postsPerPage);
        this.postsToShow = this.posts.slice(postsPerPage*(this.numberOfPages-1), this.posts.length);
        this.currentPage = this.numberOfPages;
        this.lastPage = true;
      }
    });
  }

  ionViewDidEnter(){
    this.scrollToBottom();
  }

}
