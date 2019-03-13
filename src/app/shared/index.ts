import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { APP_SHARED_COMPONENTS } from './components';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const modules = [
  CommonModule,
  FlexLayoutModule,
  MaterialModule
];

@NgModule({
  declarations: [...APP_SHARED_COMPONENTS],
  imports: [...modules, ReactiveFormsModule, HttpClientModule],
  exports: [...modules, ...APP_SHARED_COMPONENTS]
})
export class SharedModule { }
