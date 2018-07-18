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
  createdAt:Date = new Date();

  constructor(private http: Http, private navCtrl: NavController, private navParams: NavParams,
              private socket: Socket, private toastCtrl: ToastController, public global: GlobalProvider) {

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  sendMessage() {
    console.log("sendMessage test");
    this.socket.emit('new-message', { message: this.message, spieler: this.spieler, createdAt: this.createdAt});
    this.message = '';
    this.scrollToBottom();
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

  ionViewWillLeave(){
    this.socket.emit('new-message', { message: "<< Ausgetreten", spieler: this.spieler});
    this.socket.disconnect();
  }

  @ViewChild('content') content: Content;
  scrollToBottom(){
    this.content.scrollToBottom();
  }

  ionViewWillEnter(){
    this.scrollToBottom();
    this.messages = [];
    this.socket.connect();
    this.socket.emit('new-message', { message: ">> Beigetreten", spieler: this.spieler});
  }

}
