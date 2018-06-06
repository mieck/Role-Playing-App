import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {CharacterPage} from "../pages/character/character";
import {RegisterPage} from "../pages/register/register";
import {ProfilePage} from "../pages/profile/profile";
import {CharacterEditPage} from "../pages/character-edit/character-edit";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    TabsPage,
    RegisterPage,
    CharacterPage,
    ProfilePage,
    CharacterEditPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    LoginPage,
    TabsPage,
    RegisterPage,
    CharacterPage,
    ProfilePage,
    CharacterEditPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
