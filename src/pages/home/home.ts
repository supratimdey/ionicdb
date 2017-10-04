import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {SQLite,SQLiteObject} from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';

//import { SQLitePorter } from '@ionic-native/sqlite-porter';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sqlstorage: SQLite;
  private database: SQLiteObject; 

  items: Array<Object>;

  private options = { name: "data.db", location: 'default' };
  private createdbsql= "CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER)";
  private dbfill1 ="INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4')";
  private dbfill2 ="INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2')";
  private dbfill3 ="INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5')";
  
  
  constructor(public navCtrl: NavController ) 
  {
    this.sqlstorage = new SQLite();
    
        this.sqlstorage.create(this.options).then( (db: SQLiteObject) => {
         // db.executeSql(this.createdbsql,{});
         // this.database =db;
        //  console.log("Db created.....");

        db.executeSql(this.createdbsql,{}).then(() => alert('Executed  create table SQL'))
        .catch(e => console.log(e));
        
        db.executeSql(this.dbfill1,{}).then(() => alert('Executed  insert 1  SQL'))
        .catch(e => console.log(e));

        db.executeSql(this.dbfill2,{}).then(() => alert('Executed  insert 1  SQL'))
        .catch(e => console.log(e));

        db.executeSql(this.dbfill3,{}).then(() => alert('Executed  insert 1  SQL'))
        .catch(e => console.log(e));

         
         // console.log("data inserted....");
          this.findAll();
    
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
                this.items.push({name: data.rows.item(i).name} );
               // alert(data.rows.item(i));
            }
        }
    }, (e) => {

        console.log("Errot: " + JSON.stringify(e));
    });
  }

  

}
