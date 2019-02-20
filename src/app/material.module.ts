import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import {
  MatChipsModule,
  MatButtonModule,
  MatIconModule,
  MatAutocompleteModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSliderModule,
  MatGridListModule,
  MatProgressBarModule,
  MatExpansionModule,
} from '@angular/material';

const material = [
  // Angular
  AngularFirestoreModule,
  AngularFireFunctionsModule,
  AngularFireMessagingModule,
  AngularFireStorageModule,
  // Material
  MatChipsModule,
  MatProgressBarModule,
  MatAutocompleteModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule,
  MatCheckboxModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatTabsModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatGridListModule,
  MatExpansionModule,
];
@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ...material],
  exports: material,
})
export class MaterialFireModule { }
