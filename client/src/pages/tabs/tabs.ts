import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { LoginPage } from '../login/login';
import {CharacterPage} from "../character/character";
import {RegisterPage} from "../register/register";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = LoginPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = CharacterPage;
  tab5Root = RegisterPage;

  constructor() {

  }
}
