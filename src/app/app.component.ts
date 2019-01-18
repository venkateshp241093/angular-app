import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'my-app';
  navigatedFeature = 'recipe';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyABIhB6tgQcMgumLX54_SYd8ryWKgndxGk',
      authDomain: 'ng-recipe-book-ad41b.firebaseapp.com',
      databaseURL: 'https://ng-recipe-book-ad41b.firebaseio.com',
      projectId: 'ng-recipe-book-ad41b',
      storageBucket: 'ng-recipe-book-ad41b.appspot.com',
      messagingSenderId: '451793876606'
    });
  }
}
