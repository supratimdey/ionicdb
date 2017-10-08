import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { ToastController , Platform } from 'ionic-angular';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  sqlstorage: SQLite;
  public database: SQLiteObject; 
  public dbReady:boolean = false;

  private options = { name: "data.db", location: 'default' };
  private createDbSql= "CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER)";
  private insertValueSql ="INSERT INTO developer(name, skill) VALUES (?, ?)";

  constructor(public http: Http ,platform: Platform,private toast: ToastController)
  {
    platform.ready().then(()=> {
      this.sqlstorage = new SQLite();
      this.sqlstorage.create(this.options).then((db: SQLiteObject) => 
      {
          db.executeSql(this.createDbSql,{}).then(() => {
              this.toast.create({
                message: 'Done the  create table SQL', duration: 3000 
              }).present();
              this.dbReady=true;
              this.database=db;
          }).catch(e => console.log(e));
      });
  });
 }

  public addItem(  name:string ,skill: string ) 
  {
    this.toast.create({
      message: 'inside dataadd funciton ', duration: 3000 
    }).present();

    this.database.executeSql(this.insertValueSql,[ name,skill])
    .then((data) => {
      this.toast.create({
          message: 'Data Added Successfully', duration: 3000 
        }).present();
      }, (e) => {
         console.log("Error :  " + JSON.stringify(e.err));
         this.toast.create({
          message: 'Error '+JSON.stringify(e.err), duration: 3000 
        }).present();
    });
  }


}
