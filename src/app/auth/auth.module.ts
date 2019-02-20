import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SettingsComponent } from './settings/settings.component';
import { MaterialFireModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CoreModule } from '../core';
import { LogoutComponent } from './logout.component';

@NgModule({
  declarations: [SignupComponent, LoginComponent, SettingsComponent, LogoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    CoreModule,
    MaterialFireModule,
    ReactiveFormsModule,
    AngularFireAuthModule,
    AuthRoutingModule,
    FlexLayoutModule,
  ]
})
export class AuthModule { }
