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
  setDoc,
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  constructor(private readonly firestore: Firestore, 
    ) {}

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

  // este metodo solo registra modificaiones, no  deja borrar campos
  updateNota(nota: any): Promise<void> {
    console.log(nota);
    const noteDocRef = doc(this.firestore, `notas/${nota.id}`);
    try {
      return updateDoc(noteDocRef, nota);
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      throw error;
    }
  }
  
  // este metodo reemplaza la nota con el obj que le pasamos (permite borrar campos)


  updateNota2(notaId: string, nota: any): Promise<void> {
    const notaDocRef = doc(this.firestore, `notas/${notaId}`);
    return setDoc(notaDocRef, nota);
  }
}
