import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/data/firestore.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {



  ngOnInit() {
  }

  createNotaForm: FormGroup;
constructor(
  private readonly loadingCtrl: LoadingController,
  private readonly alertCtrl: AlertController,
  private firestoreService: FirestoreService,
  formBuilder: FormBuilder,
  private router: Router
) {
  this.createNotaForm = formBuilder.group({
    titulo: ['', Validators.required],
    comentario: ['', Validators.required],
 
  });
}



async createNota() {
  const loading = await this.loadingCtrl.create();

  const titulo = this.createNotaForm.value.titulo;
  const comentario = this.createNotaForm.value.comentario;


  this.firestoreService
    .createNota(titulo, comentario)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('/home/notas');
        });
      },
      error => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );

  return await loading.present();
}

}
