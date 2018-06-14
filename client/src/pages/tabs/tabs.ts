import { Component } from '@angular/core';
import {PostsPage} from "../posts/posts";
import {ChatPage} from "../chat/chat";
import {SettingsPage} from "../settings/settings";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = ChatPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
