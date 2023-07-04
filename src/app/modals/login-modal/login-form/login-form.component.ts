import { ChangeDetectionStrategy, Component, DestroyRef, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, tap } from 'rxjs';

import { AuthService } from '@services/auth/auth.service';
import { AuthStoreFacade } from '@services/auth/+store/auth-store.facade';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  @Input() isStartup: boolean = false;
  @Input() loading: boolean = false;

  @Output() dismiss = new EventEmitter<void>();
  @Output() navigateToRegister = new EventEmitter<void>();

  public readonly loginResponse$ = this.authStoreFacade.loginResponse$;

  public myForm: FormGroup;
  private lastAttempt: number;

  constructor(
    private formBuilder: FormBuilder,
    private authStoreFacade: AuthStoreFacade,
    private authService: AuthService
  ) {
    this.myForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loginResponse$.pipe(
      filter(data => data?.type === 'error' && data.timestamp === this.lastAttempt),
      tap(() => this.myForm.patchValue({ password: '' })),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  shouldDismiss(): void {
    this.dismiss.emit();
  }

  shouldNavigateToRegister() {
    this.navigateToRegister.emit();
  }

  onSubmit(): void {
    if (!this.myForm.valid) { return; }
    this.lastAttempt = (new Date()).getTime();
    this.authService.login(
      this.myForm.value.email,
      this.myForm.value.password,
      this.lastAttempt
    );
  }
}
