import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import {ProfilePage} from "../profile/profile";
import { Socket } from 'ng-socket-io';
import {map} from "rxjs/operators";
import {Http} from "@angular/http";
import {GlobalProvider} from "../../provider/global";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage {
  messages = [];
  nickname = '';
  message = '';

  constructor(private http: Http, private navCtrl: NavController, private navParams: NavParams, private socket: Socket, private toastCtrl: ToastController, public global: GlobalProvider) {

    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
  }

  goToProfile() {
    this.navCtrl.push(ProfilePage);
  }

  sendMessage() {
    this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    this.socket.disconnect();
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  ionViewWillEnter(){
    var id = window.sessionStorage.getItem("id");

    this.http.post(this.global.serverHost + '/checkprofile', {id: id}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      console.log("Got username");
      this.socket.connect();
      this.nickname = response.spielername;
      this.socket.emit('set-nickname', this.nickname);
    });
  }

}
