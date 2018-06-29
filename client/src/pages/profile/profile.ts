import { Component } from '@angular/core';
import {Http} from "@angular/http";
import {map} from 'rxjs/operators';
import {LoadingController, NavController, Loading} from 'ionic-angular';
import {LoginPage} from "../login/login";
import { Events } from 'ionic-angular';
import {CharRegistrPage} from "../charRegistr/charReg";


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  name:string;
  password:string;
  mail:string;
  oldpassword:string;
  loading: Loading;
  saved:boolean;

  constructor(private http: Http, public navCtrl:NavController, public events: Events,
              public loadingCtrl: LoadingController) {
    this.saved = false;
  }

  logout(){
    this.events.publish('user:logout', 'hurray');
  }

  editProfile() {
    this.loading = this.loadingCtrl.create({
      spinner: 'ios',
    });
    this.loading.present();

    var id = window.sessionStorage.getItem("id");
    let data = {};

    console.log(this.password);
    this.saved = false;

    if(this.password == undefined) {
      data = {
        "spieleremail": this.mail,
        "spielerpasswort": this.oldpassword,
        "spielerId": id,
      };
    }else{
      data = {
        "spieleremail": this.mail,
        "spielerpasswort": this.password,
        "spielerId": id,
      };
    }

    setTimeout(() => {
      this.loading.dismiss();
      this.http.post('http://localhost:8080/update_profile', data).pipe(
        map(res => res.json())
      ).subscribe(response => {
        console.log(response);
        this.saved = true;
      });
    }, 1000)

  }

  ionViewDidLoad(){
    var id = window.sessionStorage.getItem("id");

    this.http.post('http://localhost:8080/checkprofile', {id: id}).pipe(
      map(res => res.json())
    ).subscribe(response => {
      this.name = response.spielername;
      this.mail = response.spieleremail;
      this.oldpassword = response.spielerpasswort;
    });
  }

}
