import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static notBeforeToday(control: AbstractControl): ValidationErrors | null {
    let date = control.value;
    if (date > new Date()) {
      return { notBefore: { date: new Date() } };
    }
    return null;
  }

  // fonction qui appelle une fonction => permet de passer des argument mais doit être appelée avec des parenthèses
  static listLength(min: number, max: number){
    return (control: AbstractControl): ValidationErrors | null => {
      let list = control.value;
      if (list.length < min || list.length > max) {
        return { listlength: { min: min, max: max } };
      }
      return null;
    };
  }
}
