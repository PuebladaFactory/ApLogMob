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

  createSongForm: FormGroup;
constructor(
  private readonly loadingCtrl: LoadingController,
  private readonly alertCtrl: AlertController,
  private firestoreService: FirestoreService,
  formBuilder: FormBuilder,
  private router: Router
) {
  this.createSongForm = formBuilder.group({
    albumName: ['', Validators.required],
    artistName: ['', Validators.required],
    songDescription: ['', Validators.required],
    songName: ['', Validators.required],
  });
}



async createSong() {
  const loading = await this.loadingCtrl.create();

  const albumName = this.createSongForm.value.albumName;
  const artistName = this.createSongForm.value.artistName;
  const songDescription = this.createSongForm.value.songDescription;
  const songName = this.createSongForm.value.songName;

  this.firestoreService
    .createSong(albumName, artistName, songDescription, songName)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.router.navigateByUrl('');
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
