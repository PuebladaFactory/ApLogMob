import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/data/firestore.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  nota: any

  editNotaForm: FormGroup;


  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    this.editNotaForm = formBuilder.group({
      titulo: ["", Validators.required],
      comentario: ["", Validators.required],
    });
  }
    
  // ngOnInit() {
  //   const notaId: string = this.route.snapshot.paramMap.get('id');
  //   this.firestoreService.getNotaDetail(notaId).subscribe(nota => {
  //     this.nota = nota;
  //   });
  // }

editarNota(){}
  ngOnInit() {
    const notaId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNotaDetail(notaId).subscribe(nota => {
      this.nota = nota;
      this.editNotaForm.patchValue({
        titulo: nota.titulo,
        comentario: nota.comentario
      });
    });
  }

}

