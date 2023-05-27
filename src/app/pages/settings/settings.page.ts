import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Subject, takeUntil, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { UtilService } from '@services/util.service';
import { AppStateFacade } from '@store/app-state.facade';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, AfterViewInit {

  public readonly initialized$ = this.appStateFacade.initialized$;
  public readonly darkMode$ = this.appStateFacade.darkMode$;

  form: FormGroup = this.formBuilder.group({
    darkMode: ['off', Validators.required],
  });

  constructor(
    private utilService: UtilService,
    private appStateFacade: AppStateFacade,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    const darkModeValue = await firstValueFrom(this.darkMode$);
    if (darkModeValue) {
      this.form.setValue({ darkMode: darkModeValue });
    }

    this.form.valueChanges.pipe(
      tap(changes => {
        if (changes.darkMode) {
          this.utilService.setDarkMode(changes.darkMode);
        }
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  async ngAfterViewInit() {
    // const darkModeValue = await firstValueFrom(this.darkMode$);
    // console.log('darkModeValue', darkModeValue);
    // if (darkModeValue) {
    //   this.form.setValue({ darkMode: darkModeValue });
    // }
  }
}
