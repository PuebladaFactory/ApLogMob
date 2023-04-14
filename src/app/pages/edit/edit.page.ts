import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
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
      this.firestoreService.getNotaDetail(this.documentId).subscribe(document => {
        this.documentData = document;
        if (this.documentData) {
          this.createForm();
        } else { console.log("no data")
          // handle the case where documentData is not defined
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

  onSubmit() {
    const updatedDocument = this.documentForm.value;
    console.log('Updated document:', updatedDocument);
    // Send the updated document to the server
    // this.myDataService.updateDocument(this.documentId, updatedDocument).subscribe();
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
