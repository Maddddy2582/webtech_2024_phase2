import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatFormFieldModule, MatLabel, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from '../customer/navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggle } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [NavBarComponent],
  imports: [
    CommonModule,
    MatToolbar,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInput,
    MatButton,
    MatCardSubtitle,
    MatIcon,
    MatIconButton,
    MatSlideToggle,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatToolbar,
    MatFormFieldModule,
    MatLabel,
    MatError,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatInput,
    MatButton,
    MatCardSubtitle,
    MatIcon,
    MatIconButton,
    BrowserAnimationsModule,
    NavBarComponent,
    FormsModule,
    MatSlideToggle,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
