import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-successful',
  templateUrl: './successful.page.html',
  styleUrls: ['./successful.page.scss'],
})
export class SuccessfulPage implements OnInit {

    constructor(public navCtrl: NavController)
    {
    }

  ngOnInit() {
  }

    goHome()
    {
        this.navCtrl.navigateRoot('home');
    }

}
