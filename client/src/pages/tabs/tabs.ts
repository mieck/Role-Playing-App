import { Component } from '@angular/core';
import {PostsPage} from "../posts/posts";
import {ChatPage} from "../chat/chat";


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PostsPage;
  tab2Root = ChatPage;

  constructor() {

  }
}
