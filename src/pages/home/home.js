var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
//import { SQLitePorter } from '@ionic-native/sqlite-porter';
var HomePage = (function () {
    function HomePage(navCtrl, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.options = { name: "data.db", location: 'default' };
        this.createdbsql = "CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER)";
        this.dbfill1 = "INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4')";
        this.dbfill2 = "INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2')";
        this.dbfill3 = "INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5')";
        platform.ready().then(function () {
            _this.sqlstorage = new SQLite();
            _this.sqlstorage.create(_this.options).then(function (db) {
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
                db.executeSql("SELECT * FROM developer", {}).then(function (data) {
                    _this.items = [];
                    if (data.rows.length > 0) {
                        for (var i = 0; i < data.rows.length; i++) {
                            _this.items.push({ name: data.rows.item(i).name });
                            // alert(data.rows.item(i));
                        }
                    }
                }, function (e) {
                    console.log("Errot: " + JSON.stringify(e));
                });
                // console.log("data inserted....");
                // this.findAll();
            });
        });
    }
    HomePage.prototype.addItem = function (inputq) {
        this.database.executeSql(inputq, {}).then(function (data) {
            console.log("Success");
        }, function (e) {
            console.log("Error :  " + JSON.stringify(e.err));
        });
    };
    HomePage.prototype.findAll = function () {
        var _this = this;
        this.database.executeSql("SELECT * FROM developer", []).then(function (data) {
            _this.items = [];
            if (data.rows.length > 0) {
                for (var i = 0; i < data.rows.length; i++) {
                    _this.items.push({ name: data.rows.item(i).name });
                    alert(data.rows.item(i));
                }
            }
        }, function (e) {
            console.log("Errot: " + JSON.stringify(e));
        });
    };
    return HomePage;
}());
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, Platform])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map