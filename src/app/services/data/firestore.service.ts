import { Injectable } from '@angular/core';
import { collectionData, collection, addDoc, Firestore, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {



  constructor(private readonly firestore: Firestore) {}

  createSong(
    albumName: string,
    artistName: string,
    songDescription: string,
    songName: string
  ): Promise<any> {
    let id:""
    return addDoc(collection(this.firestore, "notas"), {
      id,
      albumName,
      artistName,
      songDescription,
      songName,
    });
  }


  // We create the function:
getSongList(): Observable<any[]> {
  return collectionData<any>(collection(this.firestore, 'songList'), {
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