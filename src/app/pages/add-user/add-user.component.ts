import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { FormErrorComponent } from '../../components/form-error/form-error.component';
import { last } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  imports: [CommonModule, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss',
})
export class AddUserComponent {
  isValidDate: boolean = false;

  formBuilder = inject(FormBuilder);
  userForm = this.formBuilder.group({
    lastName: [null, [Validators.required, Validators.maxLength(50)]],
    firstName: [null, [Validators.required, Validators.maxLength(50)]],
    email: [
      null,
      [Validators.required, Validators.email, Validators.maxLength(255)],
    ],
    birthdate: [null, [Validators.required, this.validateBirthdate]],
    address: this.formBuilder.group({
      street: [null, [Validators.required, Validators.maxLength(255)]],
      number: [null, [Validators.required]],
      zipCode: [
        null,
        [Validators.required, Validators.min(1000), Validators.max(9999)],
      ],
      city: [null, [Validators.required, Validators.maxLength(255)]],
    }),
    phones: this.formBuilder.array([], { validators: [Validators.min(1)] }),
  });

  constructor() {}

  phones(): FormArray {
    return this.userForm.controls['phones'] as FormArray;
  }

  addPhone() {
    this.phones().push(
      this.formBuilder.group({
        type: [null, [Validators.required]],
        number: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
      })
    );
  }

  removePhone(index: number) {
    this.phones().removeAt(index);
  }

  validateBirthdate(control: AbstractControl): { invalidDate: boolean } | null {
    const birthdate = control.value;
    if (!birthdate) {
      return null;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const birth = new Date(birthdate);
    return birth < today ? null : { invalidDate: true };
  }
}
