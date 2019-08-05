import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.page.html',
  styleUrls: ['./register-user.page.scss'],
})
export class RegisterUserPage implements OnInit {
  appUser: any;
  selectedProvince: string;
  fullName: string;
  photoUrl = 'https://miro.medium.com/fit/c/160/160/1*y_DtDowvjVeT84HPQe4qtw.jpeg';
  age: any;


  constructor(
    private dataService: DataService,
    private afs: AngularFirestore,
    private router: Router,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    console.log(this.dataService.getExtras());
    this.appUser = this.dataService.getExtras();
  }

  showValue() {
    console.log(this.selectedProvince);
  }

  submitUser() {
    const userId = this.appUser.result.user.uid;
    this.afs.collection('users').doc(userId).set({
      full_name: this.fullName,
      province: this.selectedProvince,
      id: this.appUser.result.user.uid,
      email: this.appUser.result.user.email,
      photoUrl: this.photoUrl,
      age: this.age
    }).then(res => {
      this.router.navigateByUrl('/start/tabs/discover');
      console.log(res);
    }).catch(err => {
      this.toastCtrl.create({
        message: 'Failed to save. Please try again!!!'
      }).then(res => {
        res.present();
      });
      console.log(err);
    });
  }

}
