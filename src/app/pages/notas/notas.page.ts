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

  notasList: Observable<any[]> = this.firestoreService.getNotasList();
  constructor(
    private firestoreService: FirestoreService
  ) { }

  
}
