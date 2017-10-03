import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { SQLitePorter } from '@ionic-native/sqlite-porter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sqlstorage: SQLite;
  database: SQLiteObject;
  items: Array<Object>;

  private options = { name: "data.db", location: 'default', createFromLocation: 1 };
  private createdbsql= "CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER);";
  private dbfill1 ="INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4')";
  private dbfill2 ="INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2')";
  private dbfill3 ="INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5')";

  constructor(public navCtrl: NavController, private sqlite: SQLite, 
    private sqliteObject:SQLiteObject, private sqliteporter:SQLitePorter ) {

    this.sqlstorage = new SQLite();

    this.sqlstorage.create(this.options).then( (db: SQLiteObject) => {
      db.executeSql(this.createdbsql,{});
      this.database =db;
      console.log("Db created.....");
      this.addItem(this.dbfill1);
      this.addItem(this.dbfill2);
      this.addItem(this.dbfill3);
      console.log("data inserted....");

    });
  }

  public addItem(  inputq: string ) {
    this.database.executeSql(inputq,{}).then((data) => {
        console.log("Success");
    }, (e) => {
        console.log("Error :  " + JSON.stringify(e.err));
    });
  }

  public findAll() {
    this.database.executeSql("SELECT * FROM developer", []).then((data) => {
        this.items = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                this.items.push(data.rows.item(i));
                console.log(data.rows.item(i));
            }
        }
    }, (e) => {

        console.log("Errot: " + JSON.stringify(e));
    });
  }

}
