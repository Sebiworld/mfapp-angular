import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContentText } from '@models/content/content-text.model';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-text',
  templateUrl: './content-text.component.html',
  styleUrls: ['./content-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTextComponent implements ContentComponent {

  @Input() depth: number = 0;
  @Input() data: ContentText;

  @Input() darkMode = false;
  @Input() locale: string;

  constructor() { }
}
