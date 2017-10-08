import { Component } from '@angular/core';
import { NavController,ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  name: string;
  skill: string;
  dataconneciton: DatabaseProvider;
  toast :ToastController;
  
  constructor(public navCtrl: NavController, public db:DatabaseProvider,private toastController: ToastController) {
    this.dataconneciton= db;
    this.toast = toastController;
  }

  public add() {

    if (this.dataconneciton.dbReady) {

        this.toast.create({
          message: 'going to add data', duration: 3000 
        }).present();

         this.dataconneciton.addItem(this.name,this.skill);
    }
  }

}
