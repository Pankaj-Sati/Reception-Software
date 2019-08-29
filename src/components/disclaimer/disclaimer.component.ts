import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss'],
})
export class DisclaimerComponent implements OnInit 
{
    hasAgreed: boolean = false; //To know whether the user has accepted the agreement
    constructor(public modalCtrl: ModalController)
    {

    }

  ngOnInit() {}

    setAgreed(value:boolean=false)
    {
        this.hasAgreed = value;
        let data =
        {
            hasAgreed: this.hasAgreed
        };
        this.modalCtrl.dismiss(data);
    }
}
