import { Component } from '@angular/core';
import { NavController,Platform } from 'ionic-angular';

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

  items: any;


  private options = { name: "data.db", location: 'default' };
  private createdbsql= "CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER)";
   
  
  
  constructor(public navCtrl: NavController , platform: Platform) 
  {
    platform.ready().then(()=> {
        this.sqlstorage = new SQLite();
        
            this.sqlstorage.create(this.options).then( (db: SQLiteObject) => {
             // db.executeSql(this.createdbsql,{});
             // this.database =db;
             //  console.log("Db created.....");
    
           // db.executeSql(this.createdbsql,{}).then(() => alert('Executed  create table SQL'))
           // .catch(e => console.log(e));
            
          //  db.executeSql(this.dbfill1,{}).then(() => alert('Executed  insert 1  SQL'))
          //  .catch(e => console.log(e));
    
           // db.executeSql(this.dbfill2,{}).then(() => alert('Executed  insert 2  SQL'))
           // .catch(e => console.log(e));
    
          //  db.executeSql(this.dbfill3,{}).then(() => alert('Executed  insert 3  SQL'))
          //  .catch(e => console.log(e));
                
          db.executeSql("SELECT * FROM developer", {}).then((data) => {
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
             
             // console.log("data inserted....");
             // this.findAll();
        
            });
    });
     
  }
  
  public findAll() {
    this.database.executeSql("SELECT * FROM developer", []).then((data) => {
        this.items = [];
        if(data.rows.length > 0) {
            for(var i = 0; i < data.rows.length; i++) {
                this.items.push({name: data.rows.item(i).name} );
                alert(data.rows.item(i));
            }
        }
    }, (e) => {

        console.log("Errot: " + JSON.stringify(e));
    
    });
  }

  

}
