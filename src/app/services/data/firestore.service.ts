import { Injectable } from '@angular/core';
import { collectionData, collection, addDoc, Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {



  constructor(private readonly firestore: Firestore) {}

  createNota(
    titulo: string,
    comentario: string,

  ): Promise<any> {
  
    return addDoc(collection(this.firestore, "notas"), {
    
   titulo, 
   comentario
    });
  }


  // We create the function:
getNotasList(): Observable<any[]> {
  return collectionData<any>(collection(this.firestore, 'notas'), {
    idField: 'id',
  });
}



getSongDetail(songId: string): Observable<any> {
  const songRef = doc(this.firestore, `songList/${songId}`);
  return docData<any>(songRef, {
    idField: 'id'
  });
}


}