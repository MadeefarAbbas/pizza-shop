import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, HeaderComponent],

  imports: [
     BrowserModule,
     FormsModule,
     CommonModule,
     BrowserAnimationsModule,
     SharedModule,
     RouterModule.forChild([])
  ],
  exports:[HeaderComponent]
})
export class CoreModule { }
