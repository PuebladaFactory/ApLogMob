import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/data/firestore.service";

@Component({
  selector: "app-create",
  templateUrl: "./create.page.html",
  styleUrls: ["./create.page.scss"],
})
export class CreatePage implements OnInit {

  createNotaForm: FormGroup;
  campos: { nombre: string; label: string; placeholder: string }[] = [];

  constructor(
    private readonly loadingCtrl: LoadingController,
    private readonly alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.createNotaForm = formBuilder.group({
      titulo: ["", Validators.required],
      comentario: ["", Validators.required],
    });
  }

  ngOnInit() {}

  agregarCampo() {
    const nombre = `campo${this.campos.length + 1}`;
    const label = `Campo ${this.campos.length + 1}`;
    const placeholder = `Valor ${this.campos.length + 1}`;

    this.createNotaForm.addControl(nombre, new FormControl("", Validators.required));
    this.campos.push({ nombre, label, placeholder });
  }

  eliminarCampo(index: number) {
    const campo = this.campos[index];
    this.createNotaForm.removeControl(campo.nombre);
    this.campos.splice(index, 1);
  }

  async createNota() {
    const loading = await this.loadingCtrl.create();

    const nota = this.createNotaForm.value;

    // Agregar el siguiente código para eliminar los campos que haya agregado el usuario:
    const camposAEliminar = Object.keys(nota).filter((campo) => {
      return !["titulo", "comentario"].includes(campo);
    });

    camposAEliminar.forEach((campo) => {
      this.createNotaForm.removeControl(campo);
    });

    this.firestoreService.createNota(nota).then(
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
