import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class WebService {

  constructor(public http: Http,
    public sqlite: SQLite) {
    this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('create table photosDB(id INT,title VARCHAR(250),thumbnailUrl VARCHAR(250))', {})
          .then(() => {
            console.log("Database Created");
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  getData() {
    return this.http.get("https://jsonplaceholder.typicode.com/photos")
      .map(x => x.json());
  }
  getDataFromSQLlite() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        return db.executeSql('select * from photosDB', []);
      })
      .catch(e => console.log(e));
  }

  InsertData(data: any) {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        data.forEach(element => {
          db.executeSql('insert into photosDB values (?,?,?)', [element.id, element.title, "assets/icon/spongebob.png"])
            .then(() => {
              console.log("Data Inserted");
            })
            .catch(e => console.log(e));
        });
      })
      .catch(e => console.log(e));
  }
  ClearDB() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        db.executeSql('delete from photosDB', {})
          .then(() => {
            console.log("Data Cleared");
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }
}
