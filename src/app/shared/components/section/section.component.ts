import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

import { Section } from '@models/section.model';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {

  @Input() data: Section;
  @Input() index: number;
  @Input() locale: string;
  @Input() darkMode = false;

  constructor() { }
}
