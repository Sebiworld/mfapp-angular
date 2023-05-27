import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { environment } from '@env/environment';
import { ContentImage } from '@models/content/content-image.model';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-image',
  templateUrl: './content-image.component.html',
  styleUrls: ['./content-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentImageComponent implements ContentComponent {

  @Input() depth: number = 0;
  @Input() data: ContentImage;

  @Input() darkMode = false;
  @Input() locale: string;

  public readonly apiUrl = environment.apiUrl;

  constructor() { }
}
