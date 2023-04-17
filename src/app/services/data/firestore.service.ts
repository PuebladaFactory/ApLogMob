import { Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  collectionData, // import collectionData
  docData,
  onSnapshot
} from "@angular/fire/firestore";
import { Observable, BehaviorSubject, of } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class FirestoreService {
  private notasCache: any = {};
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
        this.notasCache = notas.reduce((acc, nota) => {
          acc[nota.id] = nota;
          return acc;
        }, {});
        this.notasCacheSubject.next(this.notasCache);
      }),
      shareReplay(1)
    );
  }
  


  getNotaDetail(notaId: string): Observable<any> {
    if (this.notasCache[notaId]) {
      console.log("Fetching nota detail from cache:", this.notasCache[notaId]);
      return of(this.notasCache[notaId]);
    } else {
      const notaRef = doc(this.firestore, `notas/${notaId}`);
      return docData<any>(notaRef, { idField: "id" }).pipe(
        tap((nota) => {
          console.log("Fetching nota detail from Firestore:", nota);
          this.notasCache[notaId] = nota;
          this.notasCacheSubject.next(this.notasCache);
        }),
        shareReplay(1)
      );
    }
  }



  deleteNota(notaId: string): Promise<void> {
    console.log("Deleting nota from Firestore:", notaId);
    const notaDocRef = doc(this.firestore, `notas/${notaId}`);
    return deleteDoc(notaDocRef);
  }

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

  updateNota2(notaId: string, nota: any): Promise<void> {
    console.log("Updating nota in Firestore:", nota);
    const notaDocRef = doc(this.firestore, `notas/${notaId}`);
    return updateDoc(notaDocRef, nota);
  }
}
