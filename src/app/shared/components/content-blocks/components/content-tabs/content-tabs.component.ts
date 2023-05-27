import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ContentTabs } from '@models/content/content-tabs.model';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-tabs',
  templateUrl: './content-tabs.component.html',
  styleUrls: ['./content-tabs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentTabsComponent implements OnInit, ContentComponent {

  @Input() depth: number = 0;
  @Input() data: ContentTabs;

  @Input() darkMode = false;
  @Input() locale: string;

  public activeIndex = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
