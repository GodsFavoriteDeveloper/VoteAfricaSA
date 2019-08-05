import { PostData } from './../mocks/news';
import { Posts } from './../models/news.interface';
import { OfficialsData } from './../mocks/officials';
import { Officials } from './../models/officials.interface';
import { Injectable } from '@angular/core';
import { map, filter, delay, timeout, take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
const STORAGE_KEY = 'officials';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // tslint:disable-next-line: variable-name
  private _officials = new BehaviorSubject<Officials[]>(OfficialsData);
  // tslint:disable-next-line: variable-name
  private _posts = new BehaviorSubject<Posts[]>(PostData);
  // tslint:disable-next-line: variable-name
  public _isFavorite = new BehaviorSubject(null);
  // tslint:disable-next-line: variable-name
  public _favorites = new BehaviorSubject([]);
  extras;


  constructor(public storage: Storage) {
    this.storage.get(STORAGE_KEY).then(data => {
      this._favorites.next(data);
    });
  }

  public setExtras(data) {
    this.extras = data;
  }

  public getExtras() {
    return this.extras;
  }

  // officials logic

  get officials() {
    return this._officials.asObservable();
  }

  getOfficials() {
    return this.officials.pipe(
      delay(5000)
    );
  }

  getOfficial(id) {
    return this.officials.pipe(
      take(1),
      map(officials => {
        console.log(officials);
        return { ...officials.find(p => p.id === +id) };
      })
    );
  }

  // posts logic
  get posts() {
    return this._posts.asObservable();
  }

  getPosts() {
    return this.posts.pipe(
      delay(2000)
    );
  }

  getPost(id) {
    return this.posts.pipe(
      take(1),
      map(posts => {
        console.log(posts);
        return { ...posts.find(p => p.id === +id) };
      })
    );
  }

  // Favorites logic
  isFavorite(official) {
    return this.getAllFavorites().then(result => {
      console.log(result);
      return result.find((officialEl) => {
        return officialEl.id === official.id;
    });
    });
  }

  favoriteFilm(id) {
    this.getAllFavorites().then(result => {
      if (result) {
        result.push(id);
        this.storage.set(STORAGE_KEY, result);
        this._favorites.next(result);
      } else {
        this.storage.set(STORAGE_KEY, [id]);
        this._favorites.next(result);
      }
    });
  }

  /*unfavoriteFilm(id) {
    this.getAllFavorites().then(result => {
      if (result) {
        const index = result.indexOf(id);
        result.splice(index, 1);
        this.storage.set(STORAGE_KEY, result);
        this._favorites.next(result);
      }
    });
  }*/

  unfavoriteFilm(id) {
    this.getAllFavorites().then(result => {
      if (!result || result.length === 0) {
        return null;
      }
      // tslint:disable-next-line: prefer-const
      let toKeep = [];

      // tslint:disable-next-line: prefer-const
      for (let i of result) {
        if (i.id !== id) {
          toKeep.push(i);
        }
      }
      this.storage.set(STORAGE_KEY, toKeep);
      this._favorites.next(toKeep);
    });
  }

  get favorites() {
    return this._favorites.asObservable();
  }

  getAllFavorites() {
    return this.storage.get(STORAGE_KEY);
  }
}
