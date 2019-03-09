import { NgModule, Optional, SkipSelf } from '@angular/core';
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
  MatStepperModule,
  MatGridListModule,
  MatProgressBarModule,
  MatExpansionModule,
} from '@angular/material';

const material = [
  MatChipsModule,
  MatStepperModule,
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
  exports: [...material],
})
export class MaterialModule { }
