import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { ContentContainer } from '@models/content/content-container.model';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentContainerComponent implements ContentComponent {

  @Input() depth: number = 0;
  @Input() data: ContentContainer;

  @Input() darkMode = false;
  @Input() locale: string;

  constructor() { }
}
