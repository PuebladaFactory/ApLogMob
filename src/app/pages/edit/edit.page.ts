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

  nota: any;
  campos: any[] = [];

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
      id:["", Validators.required]
    });
  }
    
  agregarCampo() {
    const nuevoCampo = {
      label: 'Nuevo campo',
      nombre: `campo_${this.campos.length}`,
      placeholder: 'Ingrese el valor del campo'
    };
    this.campos.push(nuevoCampo);
    this.editNotaForm.addControl(nuevoCampo.nombre, this.formBuilder.control(''));
  }

  ngOnInit() {
    const notaId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNotaDetail(notaId).subscribe(nota => {
      this.nota = nota;
      this.editNotaForm.patchValue({
        titulo: nota.titulo,
        comentario: nota.comentario,
        id: nota.id
      });
      console.log(this.nota)
    });
  }


  async editarNota() {
    const loading = await this.loadingCtrl.create();

    const nota = this.editNotaForm.value;
  

  this.firestoreService.updateNota(nota).then(
    () => {
      loading.dismiss().then(() => {
        this.router.navigateByUrl("/home/notas");
      });
    },
    (error) => {
      loading.dismiss().then(() => {
        console.error(error);
      });
    }
  );

  return await loading.present();
}


}

