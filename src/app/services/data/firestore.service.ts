import { Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  collectionData,
  docData,
  onSnapshot,
  setDoc
} from "@angular/fire/firestore";
import { Observable, BehaviorSubject, of } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private notasCacheSubject = new BehaviorSubject<any>(null);

  constructor(private readonly firestore: Firestore) {}

  createNota(nota: any): Promise<any> {
    console.log("Adding new nota to Firestore:", nota);
    return addDoc(collection(this.firestore, "notas"), nota);
  }

  getNotasList(): Observable<any[]> {
    const notasRef = collection(this.firestore, "notas");
    return collectionData(notasRef, { idField: "id" }).pipe(
      tap((notas) => {
        console.log("Fetching list of notas from Firestore:", notas);
        this.notasCacheSubject.next(notas);
      }),
      shareReplay(1)
    );
  }
  
  getNotaDetail(notaId: string): Observable<any> {
    const notaRef = doc(this.firestore, `notas/${notaId}`);
    return docData<any>(notaRef, { idField: "id" }).pipe(
      tap((nota) => {
        console.log("Fetching nota detail from Firestore:", nota);
        const cachedNotas = this.notasCacheSubject.value;
        if (cachedNotas) {
          const cachedNotaIndex = cachedNotas.findIndex(n => n.id === notaId);
          if (cachedNotaIndex !== -1) {
            cachedNotas[cachedNotaIndex] = nota;
            this.notasCacheSubject.next(cachedNotas);
          }
        }
      }),
      shareReplay(1)
    );
  }

  deleteNota(notaId: string): Promise<void> {
    console.log("Deleting nota from Firestore:", notaId);
    const notaDocRef = doc(this.firestore, `notas/${notaId}`);
    return deleteDoc(notaDocRef);
  }

  // solo agrega las modificaciones, no cambia el doc original.
  updateNota(nota: any): Promise<void> {
    console.log("Updating nota in Firestore:", nota);
    const noteDocRef = doc(this.firestore, `notas/${nota.id}`);
    try {
      return updateDoc(noteDocRef, nota);
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      throw error;
    }
  }

  // Reemplaza el doc existente con el provisto
  updateNota2(notaId: string, nota: any): Promise<void> {
    console.log("Updating nota in Firestore:", nota);
    const notaDocRef = doc(this.firestore, `notas/${notaId}`);
    try {
      return setDoc(notaDocRef, nota);
    } catch (error) {
      console.error("Error al actualizar la nota:", error);
      throw error;
    }
  }
}