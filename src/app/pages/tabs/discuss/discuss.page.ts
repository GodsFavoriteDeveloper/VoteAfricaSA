import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discuss',
  templateUrl: './discuss.page.html',
  styleUrls: ['./discuss.page.scss'],
})
export class DiscussPage implements OnInit {

  constructor(private afs: AngularFirestore ) { }

  ngOnInit() {}


}
