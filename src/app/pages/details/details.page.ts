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
  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute, 
    private alertController: AlertController,
    private router: Router
  ) { }

  ngOnInit() {
    const notaId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNotaDetail(notaId).subscribe(nota => {
      this.nota = nota;
    });
  }

  async deleteNota(notaId: string, titulo: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Seguro de borrar ? ${titulo}?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: blah => {
            console.log('Confirma cancelacion');
          },
        },
        {
          text: 'Ok',
          handler: () => {
            this.firestoreService.deleteNota(notaId).then(() => {
              this.router.navigateByUrl('home/notas');
            });
          },
        },
      ],
    });
  
    await alert.present();


  }
}
