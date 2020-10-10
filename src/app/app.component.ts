import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})


export class AppComponent {
  
  navMenu: any[] = [
    {
      title: "Perfil",
      url: "/profile",
      icon: "person-outline"
    },{
      title: "Ayuda",
      url: "/help",
      icon: "help-outline"
    },{
      title: "Perfil",
      url: "/profile",
      icon: "settings-outline"
    }
  ]
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
