import { Component, input, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Patterns } from '../../constants/patterns';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-error',
  imports: [CommonModule],
  templateUrl: './form-error.component.html',
  styleUrl: './form-error.component.scss',
})
export class FormErrorComponent {
  control = input.required<AbstractControl>();

  Patterns = Patterns;
}
