import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {


  nota: any;
  otherFields: string[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute, 
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    const notaId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNotaDetail(notaId).subscribe((nota: any) => {
      this.nota = nota;
      if (this.nota) {
        this.nota.id = notaId;
        // Obtener los nombres de los campos adicionales
        this.otherFields = Object.keys(nota);
      }
    });
  }




  changeImage(){}
}
