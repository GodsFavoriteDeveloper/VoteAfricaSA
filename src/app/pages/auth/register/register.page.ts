import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';
import { Account } from './../../../models/account.interface';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  account = {} as Account;

  constructor(private authService: AuthService, private toastCtrl: ToastController, private afs: AngularFirestore) {
    this.account.email = 'test@test.com';
    this.account.password = 'saber24teeth';
  }

  ngOnInit() {
  }

  async register() {
    const result = await this.authService.createUserWithEmailAndPassword(this.account);
    if (!result.error) {
        console.log(result.result.uid);
      } else {
        console.log(result.error);
        this.toastCtrl.create({
          message: `${result.error.message}`,
          duration: 3000,
          position: 'bottom'
        }).then(toast => {
          toast.present();
        });
      }

}

}
