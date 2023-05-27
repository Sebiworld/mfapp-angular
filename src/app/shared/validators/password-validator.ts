import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export class PasswordValidator {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return null;
      }

      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);

      // if true, return no error (no error), else return error passed in the second parameter
      return valid ? null : error;
    };
  }

  static passwordMatchValidator(control: AbstractControl) {
    const password: string = control.get('password').value; // get password from our password form control
    const passwordRepeat: string = control.get('passwordRepeat').value; // get password from our confirmPassword form control
    // compare is the password math
    if (password !== passwordRepeat) {
      // if they don't match, set an error in our confirmPassword form control
      control.get('passwordRepeat').setErrors({ passwordsDoNotMatch: true });
    }
  }

  static apiPasswordWrong(apiPasswordWrong$: Observable<boolean>): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => apiPasswordWrong$.pipe(
      map(pwWrong => pwWrong ? { apiPasswordWrong: true } : null),
      take(1)
      // tap(data => console.log('PW WRONG? ', data))
    );
  }
}
