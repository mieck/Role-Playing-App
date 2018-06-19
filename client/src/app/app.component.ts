import { Component } from '@angular/core';
import {App, Events, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {TabsPage} from "../pages/tabs/tabs";
import { GlobalProvider } from "../provider/global";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public events: Events, public appCtrl: App, public global: GlobalProvider) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.global.registrationComplete = false;

    this.events.subscribe('user:logout', (data)  => {
      //console.log(data);
      this.appCtrl.getRootNav().setRoot(LoginPage);
    });

    this.events.subscribe('user:login', (data)  => {
      //console.log(data);
      this.appCtrl.getRootNav().setRoot(TabsPage);
      this.global.registrationComplete = true;
    });

  }
}
