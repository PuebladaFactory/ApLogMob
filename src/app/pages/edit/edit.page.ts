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
  ) {}

  ngOnInit() {
    this.documentId = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getNotaDetail(this.documentId).subscribe(document => {
      this.documentData = document;
      this.createForm();
    });
  }

  createForm() {
    const formControls = {};
    for (const key in this.documentData) {
      if (this.documentData.hasOwnProperty(key)) {
        formControls[key] = new FormControl(this.documentData[key]);
      }
    }
    this.documentForm = new FormGroup(formControls);
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
}
