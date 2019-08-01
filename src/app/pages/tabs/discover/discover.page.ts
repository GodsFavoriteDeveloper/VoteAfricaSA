import { Officials } from './../../../models/officials.interface';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
  officials: Officials[];
  officials$: Subscription;
  count = [1, 2, 3, 4, 5, 6];
  // Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 4.2,
    spaceBetween: 5
  };

  slideOpts2 = {
    initialSlide: 1,
    speed: 400,
    slidesPerView: 1.1,
    spaceBetween: 5
  };

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.officials$ = this.dataService.getOfficials().subscribe(data => {
      this.officials = data;
      console.log(data);
    });
  }

  ngOnDestroy() {
    if (this.officials$) {
      this.officials$.unsubscribe();
    }
  }

}
