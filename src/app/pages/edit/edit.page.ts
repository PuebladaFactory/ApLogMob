import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { FirestoreService } from "src/app/services/data/firestore.service";

@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"],
})
export class EditPage implements OnInit {
  nota: any;
  otherFields: string[] = [];
  editMode: boolean = false; // variable para cambiar entre modo vista y modo edición
  editNota: any; // variable para almacenar los cambios de edición
  notaForm: FormGroup;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    const notaId: string = this.route.snapshot.paramMap.get("id");
    this.firestoreService.getNotaDetail(notaId).subscribe((nota) => {
      this.nota = nota;
      this.nota.id = notaId;

      // Obtener los nombres de los campos adicionales
      this.otherFields = Object.keys(nota).filter(
        (key) => key !== "titulo" && key !== "comentario"
      );

      // Crear el formulario con valores iniciales
      const formControls = {
        titulo: [this.nota.titulo, Validators.required],
        comentario: [this.nota.comentario, Validators.required],
      };
      // Agregar los campos adicionales al formulario
      this.otherFields.forEach((field) => {
        formControls[field] = this.formBuilder.control(this.nota[field]);
      });
      this.notaForm = this.formBuilder.group(formControls);
    });
  }

  toggleEditMode() {
    // Cambiar entre modo vista y modo edición
    this.editMode = !this.editMode;
    // Clonar la nota para que los cambios en el formulario no afecten a la vista
    this.editNota = { ...this.nota };
  }

  agregarCampo() {
    const fieldName = `Campo ${this.otherFields.length + 1}`;
    const newFieldControl = this.formBuilder.control("");
    this.notaForm.addControl(fieldName, newFieldControl);
    this.otherFields.push(fieldName);
  }

  eliminarCampo(fieldName: string) {
    this.notaForm.removeControl(fieldName);
    this.otherFields.splice(this.otherFields.indexOf(fieldName), 1);
  }

  onSubmit(): void {
    console.log("editado", this.nota);
  }

  changeImage() {}

  // deleteNota(notaId: string, titulo: string) {
  //   console.log(this.nota);
  // }
  async deleteNota(notaId: string, titulo: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `Seguro de borrar ? ${titulo}?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          handler: (blah) => {
            console.log("Confirma cancelacion");
          },
        },
        {
          text: "Ok",
          handler: () => {
            this.firestoreService.deleteNota(notaId).then(() => {
              this.router.navigateByUrl("home/notas");
            });
          },
        },
      ],
    });

    await alert.present();
  }

  // saveChanges() {
  //   // Actualizar la nota con los cambios realizados en el formulario
  //   this.nota = { ...this.editNota };
  //   // Guardar la nota actualizada en la base de datos
  //   this.firestoreService.updateNota(this.nota).then(() => {
  //     // Cambiar de vuelta a modo vista
  //     this.editMode = false;
  //   });
  // }

  // onSubmit(): void {
  //   console.log("editado", this.nota)
  // Actualizar la nota con los valores del formulario
  //   const notaId: string = this.route.snapshot.paramMap.get('id');
  //   this.nota = { ...this.nota, ...this.notaForm.value };
  //   this.firestoreService.updateNota(notaId, this.nota).then(() => {
  //     this.router.navigateByUrl('home/notas');
  //   });
  // }
}
