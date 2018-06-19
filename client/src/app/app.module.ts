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

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {File} from "@ionic-native/file";
import { Camera, CameraOptions } from '@ionic-native/camera';
import {CharacterEditPage} from "../pages/character-edit/character-edit";
import {SettingsPage} from "../pages/settings/settings";
import {CreateRPGPage} from "../pages/createRPG/createRPG";
import {PostsPage} from "../pages/posts/posts";
import {ChatPage} from "../pages/chat/chat";
import {GlobalProvider} from "../provider/global";
import {CharRegistrPage} from "../pages/charRegistr/charReg";
import {SettingsEditPage} from "../pages/setting-edit/settings-edit";


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
    SettingsPage,
    CreateRPGPage,
    PostsPage,
    ChatPage,
    CharRegistrPage,
    SettingsEditPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'})
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
    SettingsPage,
    CreateRPGPage,
    PostsPage,
    ChatPage,
    CharRegistrPage,
    SettingsEditPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    File,
    Camera,
    FileTransfer,
    GlobalProvider
  ]
})
export class AppModule {}
