import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  song: any;
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const songId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getSongDetail(songId).subscribe(song => {
      this.song = song;
    });
  }
}
