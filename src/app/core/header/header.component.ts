import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AppStateFacade } from '@store/app-state.facade';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  @Input() title: string;
  @Input() backDefault: string;
  @Input() transparent: boolean = false;

  public readonly currentLanguage$ = this.appStateFacade.currentLanguage$;
  public isMenuOpen: boolean = false;

  constructor(
    private appStateFacade: AppStateFacade
  ) { }

}
