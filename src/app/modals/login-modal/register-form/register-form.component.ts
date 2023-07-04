import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

import { AuthService } from '@services/auth/auth.service';
import { TranslationService } from '@services/translation.service';
import { PasswordValidator } from '@shared/validators/password-validator';
import { filter, tap } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  @Input() isStartup: boolean = false;
  @Input() loading: boolean = false;

  @Output() dismiss = new EventEmitter<void>();
  @Output() navigateToLogin = new EventEmitter<void>();

  public myForm: FormGroup;
  public locale = this.translationService.locale;
  private lastAttempt: number;

  constructor(
    private formBuilder: FormBuilder,
    private authStoreFacade: AuthStoreFacade,
    private authService: AuthService,
    private translationService: TranslationService
  ) {
    this.myForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [
        null,
        Validators.compose([
          Validators.required,
          // // check whether the entered password has a number
          PasswordValidator.patternValidator(/\d/, {
            hasNumber: true
          }),
          // check whether the entered password has any letters
          PasswordValidator.patternValidator(/[A-Za-z]/, {
            hasLetters: true
          }),
          // check whether the entered password has upper case letter
          // PasswordValidator.patternValidator(/[A-Z]/, {
          //   hasCapitalCase: true
          // }),
          // check whether the entered password has a lower case letter
          // PasswordValidator.patternValidator(/[a-z]/, {
          //   hasSmallCase: true
          // }),
          // // check whether the entered password has a special character
          // PasswordValidator.patternValidator(
          //   /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          //   {
          //     hasSpecialCharacters: true
          //   }
          // ),
          Validators.minLength(6)
        ])
      ],
      passwordRepeat: [null, Validators.required],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      nickname: [null],
      birthdate: [null, Validators.required],
      rolestext: [null]
    }, { validator: PasswordValidator.passwordMatchValidator } as AbstractControlOptions);
  }

  ngOnInit(): void {
    this.authStoreFacade.registrationResponse$.pipe(
      filter(data => data?.type === 'success'),
      tap(() => this.shouldDismiss()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  shouldDismiss(): void {
    this.dismiss.emit();
  }

  shouldNavigateToLogin() {
    this.navigateToLogin.emit();
  }

  onSubmit(): void {
    if (!this.myForm.valid) { return; }
    this.lastAttempt = (new Date()).getTime();
    this.authService.registration(
      this.myForm.value.email, this.myForm.value.password,
      this.myForm.value.firstname, this.myForm.value.lastname, this.myForm.value.birthdate,
      this.lastAttempt,
      this.myForm.value.nickname, this.myForm.value.rolestext
    );
  }
}
