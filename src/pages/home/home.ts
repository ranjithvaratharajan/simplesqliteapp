import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import { WebService } from '../../providers/web-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: any[] = [];
  database: any;
  itemcount: number = 0;
  constructor(
    public navCtrl: NavController,
    public webSrv: WebService,
    public toastCtrl: ToastController) {
    this.webSrv.getDataFromSQLlite().then(data => {
      this.itemcount = data.rows.length;
    });
  }
  syncFromWeb() {
    this.webSrv.getData().subscribe(data => {
      this.items = getRandom(data, 10);
      this.webSrv.InsertData(this.items).then(data => {
        this.webSrv.getDataFromSQLlite().then(data => {
          this.itemcount = data.rows.length;
        });
        console.log(data);
      })
    });
  }
  syncFromDb() {
    this.items = [];
    this.webSrv.getDataFromSQLlite().then(data => {
      var count = data.rows.length;
      this.itemcount = count;
      for (var i = 0; i < count; i++) {
        this.items.push(data.rows.item(i));
      }
    });
  }
  clearDB() {
    this.webSrv.ClearDB().then(data => {
      console.log(data);
      this.webSrv.getDataFromSQLlite().then(data => {
        this.itemcount = data.rows.length;
      });
    });
  }
  clearList() {
    this.items = [];
    this.webSrv.getDataFromSQLlite().then(data => {
      this.itemcount = data.rows.length;
    });
  }

}
function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len;
  }
  return result;
}
