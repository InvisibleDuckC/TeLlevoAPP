import { Injectable } from '@angular/core';
import { Firestore, collectionData, docData, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { addDoc, deleteDoc, updateDoc, doc, collection } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private collectionRef: CollectionReference;

  constructor(private firestore: Firestore) {
    // Define la colección que vas a usar
    this.collectionRef = collection(this.firestore, 'tu-coleccion'); // Cambia 'tu-coleccion' por el nombre de tu colección
  }

  // Obtener todos los documentos
  getItems(): Observable<any[]> {
    return collectionData(this.collectionRef, { idField: 'id' });
  }

  // Obtener un solo documento por ID
  getItemById(id: string): Observable<any> {
    const itemDocRef: DocumentReference = doc(this.firestore, `tu-coleccion/${id}`);
    return docData(itemDocRef, { idField: 'id' });
  }

  // Crear un nuevo documento
  addItem(data: any) {
    return addDoc(this.collectionRef, data);
  }

  // Actualizar un documento existente
  updateItem(id: string, data: any) {
    const itemDocRef: DocumentReference = doc(this.firestore, `tu-coleccion/${id}`);
    return updateDoc(itemDocRef, data);
  }

  // Eliminar un documento
  deleteItem(id: string) {
    const itemDocRef: DocumentReference = doc(this.firestore, `tu-coleccion/${id}`);
    return deleteDoc(itemDocRef);
  }
}
