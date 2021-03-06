import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Pro } from '@ionic/pro';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public deployChannel = "";
  public isBeta = false;
  public downloadProgress = 0;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
    this.checkChannel();
  }
  

  initializeApp() {
    this.platform.ready().then(() => {
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  async configureDeploy() {
    const config = {
      'appId': '8e287e75',
      'channel': 'Master'
    }
    await Pro.deploy.configure(config);
  }

  async checkChannel() {
    try {
      const res = await Pro.deploy.getConfiguration();
      this.deployChannel = res.channel;
      this.isBeta = (this.deployChannel === 'Master')
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }
  }

  async toggleBeta() {
    const config = {
      channel: (this.isBeta ? 'Master' : 'Production')
    }

    try {
      await Pro.deploy.configure(config);
      await this.checkChannel();
      await this.performManualUpdate(); // Alternatively, to customize how this works, use performManualUpdate()
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }

  }

  async performManualUpdate() {

    /*
      Here we are going through each manual step of the update process:
      Check, Download, Extract, and Redirect.

      Ex: Check, Download, Extract when a user logs into your app,
        but Redirect when they logout for an app that is always running
        but used with multiple users (like at a doctors office).
    */

    try {
      const update = await Pro.deploy.checkForUpdate();

      if (update.available){
        this.downloadProgress = 0;

        await Pro.deploy.downloadUpdate((progress) => {
          this.downloadProgress = progress;
        })
        await Pro.deploy.extractUpdate();
        await Pro.deploy.reloadApp();
      }
    } catch (err) {
      // We encountered an error.
      // Here's how we would log it to Ionic Pro Monitoring while also catching:

      // Pro.monitoring.exception(err);
    }

  }
}
