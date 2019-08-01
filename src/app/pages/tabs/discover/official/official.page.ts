import { Officials } from './../../../../models/officials.interface';
import { DataService } from './../../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-official',
  templateUrl: './official.page.html',
  styleUrls: ['./official.page.scss'],
})
export class OfficialPage implements OnInit {
  official: Officials;
  isFavorite = false;

  constructor(
    private dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      console.log(paramMap);
      const officialId = paramMap.get('officialId');
      console.log(officialId);
      this.dataService.getOfficial(officialId).subscribe(data => {
        this.official = data;
        this.dataService.isFavorite(this.official).then(isFav => {
          this.isFavorite = isFav;
        });
        console.log(data);
      });
    });
  }

  favoriteFilm() {
    this.dataService.favoriteFilm(this.official);
    this.isFavorite = true;
  }

  unfavoriteFilm() {
    this.dataService.unfavoriteFilm(this.official.id);
    this.isFavorite = false;
  }

}
