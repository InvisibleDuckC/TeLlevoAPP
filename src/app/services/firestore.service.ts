import { Injectable, OnInit } from '@angular/core';
import { Firestore, collectionData, docData, CollectionReference, DocumentReference } from '@angular/fire/firestore';
import { addDoc, deleteDoc, updateDoc, doc, collection, query, QuerySnapshot, where, getDocs, DocumentData, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService implements OnInit {

  private collectionRef!: CollectionReference;

  constructor(private firestore: Firestore) {

  }
  ngOnInit() {
    console.log('Firestore instance:', this.firestore);
    try {
      this.collectionRef = collection(this.firestore, 'users');
    } catch (error) {
      console.error('Error al llamar a collection():', error);
    }
    this.collectionRef = collection(this.firestore, 'users');
  }
  


  // Obtener todos los documentos
  getItems(): Observable<any[]> {
    return collectionData(this.collectionRef, { idField: 'id' });
  }

  // Obtener un solo documento por ID
  getItemById(id: string): Observable<any> {
    const itemDocRef: DocumentReference = doc(this.firestore, `users/${id}`);
    return docData(itemDocRef, { idField: 'id' });
  }

  // Crear un nuevo documento
  addItem(data: any) {
    return addDoc(this.collectionRef, data);
  }

  // Cambia el tipo de retorno a Promise<DocumentReference>
  addUser(user: any): Promise<DocumentReference<any>> {
    const usersCollection = collection(this.firestore, 'users');
    return addDoc(usersCollection, user);
  }

  // Actualizar un documento existente
  updateItem(id: string, data: any) {

    const itemDocRef: DocumentReference = doc(this.firestore, `users/${id}`);
    return updateDoc(itemDocRef, data);
  }

  // Eliminar un documento
  deleteItem(id: string) {
    const itemDocRef: DocumentReference = doc(this.firestore, `users/${id}`);
    return deleteDoc(itemDocRef);
  }

  // Método para verificar si un usuario existe
  async userExists(usuario: string): Promise<boolean> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('usuario', '==', usuario));
    const querySnapshot: QuerySnapshot<any> = await getDocs(q);
    return !querySnapshot.empty; // Devuelve true si el usuario existe, false en caso contrario
  }

  // Método para obtener los datos del usuario
  async getUserData(usuario: string): Promise<DocumentData | null> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('usuario', '==', usuario));
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q);
      
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      return { id: userDoc.id, ...userDoc.data() }; // Retorna el documento con el ID
    }
      
    return null; // Si no se encuentra, retorna null
  }

    // Método para actualizar el usuario
  async updateUser(userId: string, userData: any): Promise<void> {
    const userDocRef = doc(this.firestore, 'users', userId);
    await setDoc(userDocRef, userData, { merge: true }); // Actualiza solo los campos proporcionados
  }
}
