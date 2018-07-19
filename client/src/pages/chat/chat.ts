import {Component, ViewChild} from '@angular/core';
import {NavController, IonicPage, NavParams, ToastController, Content} from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import { Socket } from 'ng-socket-io';
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  messages = [];
  message = '';
  spieler = this.global.spielername;
  likedBy = [];

  constructor(private http: Http, private navCtrl: NavController, private navParams: NavParams,
              private socket: Socket, private toastCtrl: ToastController, public global: GlobalProvider) {

    this.getMessages().subscribe(message => {
      if(message["likedBy"].find(x => x === this.spieler)) {
        message["alreadyLiked"] = true;
      }else{
        message["alreadyLiked"] = false;
      }
      this.messages.push(message);
    });

    this.getLikes().subscribe(message => {
      for (let i = 0; i < this.messages.length; i++){
        if (this.messages[i]._id == message["_id"]){
          this.messages[i].likes = message["likes"]+1;
        }
      }
    });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  sendMessage() {
    console.log("sendMessage test");
    this.socket.emit('new-message', { message: this.message, spieler: this.spieler});
    this.message = '';
    this.scrollToBottom();
  }

  getLikes() {
    let observable = new Observable(observer => {
      this.socket.on('refresh-like', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getMessages() {
    let observable = new Observable(observer => {
      console.log("getmessage");
      this.socket.on('refresh-messages', (data) => {
        console.log("Daten " + data);
        observer.next(data);
      });
    })
    return observable;
  }

  likeMessage(id, likedBy, index){
    this.likedBy = likedBy;
    if(!(this.likedBy.find(x => x === this.spieler))){
      this.likedBy.push(this.spieler);
      this.messages[index]["alreadyLiked"] = true;
      this.socket.emit('new-like', {id: id, spieler: this.spieler});
    }
  }

  ionViewWillLeave(){
    this.socket.emit('new-message', { message: "<< Ausgetreten", spieler: this.spieler});
    this.socket.disconnect();
  }

  @ViewChild('content') content: Content;
  scrollToBottom(){
    this.content.scrollToBottom();
  }

  ionViewWillEnter(){
    this.messages = [];
    this.socket.connect();
    this.socket.emit('new-message', { message: ">> Beigetreten", spieler: this.spieler});
  }

  ionViewDidEnter(){
    this.scrollToBottom();
  }

}
