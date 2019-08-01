import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  favoriteOfficials: any;
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 4.2,
    spaceBetween: 5
  };

  constructor(private storage: Storage, private dataService: DataService) { }

  ngOnInit() {
    this.dataService.favorites.subscribe(data => {
      console.log(data);
      this.favoriteOfficials = data;
    });
  }

}
