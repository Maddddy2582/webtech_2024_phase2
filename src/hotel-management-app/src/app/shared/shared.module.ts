import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle } from '@angular/material/card';
import { MatFormFieldModule, MatLabel, MatError } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatToolbar } from '@angular/material/toolbar';



@NgModule({
  declarations: [],
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
    MatIconButton
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
    MatIconButton
  ]
})
export class SharedModule { }
