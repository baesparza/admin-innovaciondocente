import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// firebase imports
import { firebaseConfig } from 'src/environments/firebaseConfig';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig, 'admin-innovaciondocente'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
  ],
})
export class FirebaseModule { }
