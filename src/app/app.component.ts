import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Pages } from './interfaces/page';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  public appPages: Array<Pages>;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _auth: AuthService,
    private _navCtrl: NavController
  ) {
    this.appPages = [
      { title: 'Lugares', url: '/home/lugares', direct: 'root', icon: 'home' },
      { title: 'Alertas', url: '/home/alertas', direct: 'forward', icon: 'information-circle-outline' },
      { title: 'Eventos', url: '/home/eventos', direct: 'forward', icon: 'cog' },
      { title: 'Usuario', url: '/usuario', direct: 'forward', icon: 'person-circle-outline' }
    ];
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout(){
    this._auth.logout();
    this._navCtrl.navigateBack('');
  }
}
