import { Subscription } from 'rxjs';
import { DataService } from './../../../../services/data.service';
import { Officials } from './../../../../models/officials.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-officials',
  templateUrl: './officials.page.html',
  styleUrls: ['./officials.page.scss'],
})
export class OfficialsPage implements OnInit, OnDestroy {
  officials: Officials[];
  officials$: Subscription;
  count = [1, 2, 3, 4, 5, 6];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.officials$ = this.dataService.officials.subscribe(data => {
      console.log(data);
      this.officials = data;
    });
  }

  ngOnDestroy() {
    if (this.officials$) {
      this.officials$.unsubscribe();
    }
  }

}
