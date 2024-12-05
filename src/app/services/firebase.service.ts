import { Inject, inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail } from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc, getDoc,addDoc,collection,collectionData,query,updateDoc,deleteDoc } from '@angular/fire/firestore';
import { UtilsService } from './utils.service';
import {AngularFireStorage} from '@angular/fire/compat/storage';
import{getStorage,uploadString,ref,getDownloadURL,deleteObject} from "firebase/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);
  storage = inject(AngularFireStorage);
  utilsSvc = inject(UtilsService);

  // ::: Autenticación :::

  getAuth() {
    return getAuth();
  }

  // .- Ingresar.

  signIn(user: User) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // .- Registrarse.

  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // .- Actualizar.

  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser, {displayName});
  }

  // .- Recuperar contraseña.

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // .- Cerrar sesión.

  signOut() {
    getAuth().signOut();
    localStorage.removeItem('user');
    this.utilsSvc.routerLink('/auth');
  }

  // ::: Base de Datos :::

  // .- Documneto.

  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  async getDocument(path: string) {
    return (await getDoc(doc(getFirestore(), path))).data();
  }

  addDocument(path: string, data: any) {
    return addDoc(collection(getFirestore(), path), data);
  }

  updateDocument(path: string, data: any) {
    return updateDoc(doc(getFirestore(), path), data);
  }

  deleteDocument(path: string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  getCollectionData(path: string,collectionQuery?:any){
    const ref=collection(getFirestore(), path);
    return collectionData(query(ref,collectionQuery),{idField:'id'});
  }

  // Almacenamiento.

  async uploadImage(path: string, data_url: string) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    })
  }

  async getFilePath(url:string){
    return ref(getStorage(),url).fullPath
  
  }

  deleteFile(path:string){
    return deleteObject(ref(getStorage(),path))
  }
  

}
