import { Component, OnInit } from '@angular/core';


import { Observable } from 'rxjs';
import { FirestoreService } from 'src/app/services/data/firestore.service';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {



  ngOnInit() {
  }

  songList: Observable<any[]> = this.firestoreService.getSongList();
  constructor(
    private firestoreService: FirestoreService
  ) { }

  
}
