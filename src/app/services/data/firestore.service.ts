import { Injectable } from "@angular/core";
import {
  collectionData,
  collection,
  addDoc,
  Firestore,
  doc,
  docData,
  deleteDoc,
  updateDoc,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private readonly firestore: Firestore) {}

  // createNota(titulo: string, comentario: string): Promise<any> {
  //   return addDoc(collection(this.firestore, "notas"), {
  //     titulo,
  //     comentario,
  //   });
  // }

  createNota(nota: any): Promise<any> {
    return addDoc(collection(this.firestore, "notas"), nota);
  }

  // We create the function:
  getNotasList(): Observable<any[]> {
    return collectionData<any>(collection(this.firestore, "notas"), {
      idField: "id",
    });
  }

  getNotaDetail(notaId: string): Observable<any> {
    const notaRef = doc(this.firestore, `notas/${notaId}`);
    return docData<any>(notaRef, {
      idField: "id",
    });
  }

  deleteNota(notaId: string): Promise<void> {
    const notaDocRef = doc(this.firestore, `notas/${notaId}`);
    return deleteDoc(notaDocRef);
  }

  updateNota(nota: any): Promise<void> {
    const noteDocRef = doc(this.firestore, `notas/${nota.id}`);
    return updateDoc(noteDocRef, nota);
  }
  
}
