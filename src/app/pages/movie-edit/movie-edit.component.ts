import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './movie-edit.component.html',
  styleUrl: './movie-edit.component.scss',
})
export class MovieEditComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    title: [null, [Validators.required, Validators.maxLength(100)]],
    director: this.formBuilder.group(
      {
        lastName: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
      },
      { validators: [] }
    ),
    duration: [null, [Validators.min(1), Validators.max(999999)]],
    actors: this.formBuilder.array([], { validators: [Validators.min(1)] }),
    categories: this.formBuilder.array([], {
      validators: [
        (control) =>
          control.value.length < 1 || control.value.every((v: any) => !v)
            ? { minlength: true }
            : null,
      ],
    }),
  });

  constructor() {
    // console.log(this.form.value);
    // console.log(this.form.valid);
    // console.log(this.form.errors);
    // console.log(this.form.controls['title'].errors);
  }

  addActor() {
    (this.form.controls['actors'] as FormArray).push(
      this.formBuilder.group({
        lastName: [null, [Validators.required]],
        firstName: [null, [Validators.required]],
      })
    );
  }

  removeActor(index: number) {
    (this.form.controls['actors'] as FormArray).removeAt(index);
  }

  addCategory() {
    this.form.controls['categories'].push(this.formBuilder.control(null));
  }

  removeCategory(index: number) {
    this.form.controls['categories'].removeAt(index);
  }

  submit() {
    console.log(this.form.value);
  }
}
