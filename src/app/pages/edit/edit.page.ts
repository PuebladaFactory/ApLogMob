import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { FirestoreService } from "src/app/services/data/firestore.service";



@Component({
  selector: "app-edit",
  templateUrl: "./edit.page.html",
  styleUrls: ["./edit.page.scss"],
})
export class EditPage implements OnInit {
  documentId: string;
  documentData: any;
  documentForm: FormGroup;
  documentSubscription: Subscription;
  guardandoCambios = false; // <--- Agrega esta propiedad

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

    this.documentForm = new FormGroup({});
  }

   ngOnInit() {
      this.documentId = this.route.snapshot.paramMap.get('id');
      this.documentSubscription = this.firestoreService.getNotaDetail(this.documentId).subscribe(document => {
        this.documentData = document;
        if (this.documentData) {
          this.createForm();
        } else {
          // Si documentData es null, redirigir al usuario a la página de notas
          this.router.navigateByUrl('home/notas');
        }
      });
    }
  createForm() {
    this.documentForm = this.formBuilder.group({});
    for (const key in this.documentData) {
      if (this.documentData.hasOwnProperty(key)) {
        this.documentForm.addControl(key, new FormControl(this.documentData[key]));
      }
    }
  }

  addField() {
    // Add a new field to the form
    const fieldName = `field${Object.keys(this.documentForm.controls).length}`;
    this.documentForm.addControl(fieldName, new FormControl(''));
  }

  removeField(fieldName: string) {
    // Remove a field from the form
    this.documentForm.removeControl(fieldName);
  }

  // onSubmit() {
  //   const updatedDocument = this.documentForm.value;
  //   console.log('Updated document:', updatedDocument);
  //   // Send the updated document to the server
  //   // this.myDataService.updateDocument(this.documentId, updatedDocument).subscribe();
  // }


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
              // Cancelar la suscripción y establecer documentData en null
              this.documentSubscription.unsubscribe();
              this.documentData = null;
              this.router.navigateByUrl('home/notas');
            });
          },
        },
      ],
    });
  
    await alert.present();
  }


  async guardarCambios() {
    this.guardandoCambios = true; // deshabilitar el botón "Guardar"
    const updatedDocument = this.documentForm.value;
    console.log('Updated document:', updatedDocument);
    try {
      const notaActualizada = {id: this.documentId, ...updatedDocument};
      await this.firestoreService.updateNota2(notaActualizada.id, notaActualizada);
      console.log('Document updated successfully');
      this.guardandoCambios = false; // habilitar el botón "Guardar"
      // Opcionalmente, mostrar un mensaje de éxito al usuario
    } catch (error) {
      console.error('Error updating document:', error);
      this.guardandoCambios = false; // habilitar el botón "Guardar"
      // Opcionalmente, mostrar un mensaje de error al usuario
    }
  }

}
