import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';
import { PhotoModalPage } from '../photo-modal/photo-modal.page';


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
    private modalController: ModalController,
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

// galeria

// photos: string[] = ["http://i.imgur.com/Dllfd.jpg"];

// addPhoto(url: string): void {
//   this.photos.push(url);
// }

// removePhoto(index: number): void {
//   this.photos.splice(index, 1);
// }

photos: string[] = ["http://i.imgur.com/9uXDB.jpg", "https://i.imgur.com/7rl4O.jpeg"];


addPhoto(url: string): void {
  this.photos.push(url);
}

removePhoto(index: number): void {
  this.photos.splice(index, 1);
}

async showPhoto(i: number) {
  const photoUrl = this.photos[i];
  const modal = await this.modalController.create({
    component: PhotoModalPage,
    componentProps: {
      photoUrl
    }
  });
  return await modal.present();
}
  changeImage(){}
}
