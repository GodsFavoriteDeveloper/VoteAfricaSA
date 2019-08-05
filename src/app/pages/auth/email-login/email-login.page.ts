import { take } from 'rxjs/operators';
import { Account } from './../../../models/account.interface';
import { DataService } from './../../../services/data.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-email-login',
  templateUrl: './email-login.page.html',
  styleUrls: ['./email-login.page.scss'],
})
export class EmailLoginPage implements OnInit {
  account = {} as Account;

  constructor(
    private auth: AuthService,
    private router: Router,
    private dataService: DataService,
    private toastCtrl: ToastController,
    private afs: AngularFirestore
    ) {
    this.account.email = 'test@test.com';
    this.account.password = 'saber24teeth';
  }

  ngOnInit() {
  }

  login() {
    this.auth.login();
    this.router.navigateByUrl('/start/tabs/discover');
  }

  async signIn() {
    const result = await this.auth.signInWithEmailAndPassword(this.account);
    if (!result.error) {
      console.log(result.result.user.uid);
      const userId = result.result.user.uid;
      this.auth.getAuthenticatedUser().subscribe((user: User) => {
        if (user) {
          this.afs.collection('users').doc(userId).get()
            .subscribe(doc => {
              if (!doc.exists) {
                console.log('No such document!');
                this.dataService.setExtras(result);
                this.router.navigateByUrl('/register-user');
                return;
              } else {
                console.log('Document data:', doc.data());
                this.router.navigateByUrl('/start/tabs/discover');
              }
            }, error => {
              console.log(error);
            });
        }
      });
    } else {
      this.toastCtrl.create({
        message: result.error.message,
        duration: 3000
      }).then(data => {
        data.present();
        console.log(result.error);
      });
    }
  }

  navigateToRegister() {
    this.router.navigateByUrl('/register');
  }


}
