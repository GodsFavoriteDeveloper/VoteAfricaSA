import { AngularFirestore } from '@angular/fire/firestore';
import { LoginResponse } from './../models/login-response.interface';
import { Account } from './../models/account.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userAuthenticated = true;
  user;

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) {
    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Auth stuff
  login() {
    this.userAuthenticated = true;
  }

  logout() {
    this.userAuthenticated = false;
  }

  getAuthenticatedUser() {
    // return this.afAuth.auth.currentUser;
    return this.afAuth.authState;
  }

  async createUserWithEmailAndPassword(account: Account) {
    try {
    return {
    result: await this.afAuth.auth.createUserWithEmailAndPassword(account.email, account.password)
    } as LoginResponse;
    } catch (e) {
      return {
        error: e
      } as LoginResponse;
    }
  }

  async signInWithEmailAndPassword(account: Account) {
    try {
      return {
        result: await this.afAuth.auth.signInWithEmailAndPassword(account.email, account.password)
      };
    } catch (e) {
      return {
        error: e
      };
    }
  }

  async resetPassword(email: string) {
    try {
      return {
        result: await this.afAuth.auth.sendPasswordResetEmail(email)
      };
    } catch (e) {
      return  {
        error: e
      };
    }
  }

  async signOut() {
    try {
      return {
        result: await this.afAuth.auth.signOut()
      };
    } catch (e) {
      console.error(e);
    }
  }

}
