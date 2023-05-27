import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ContentPages } from '@models/content/content-pages.model';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-pages',
  templateUrl: './content-pages.component.html',
  styleUrls: ['./content-pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentPagesComponent implements OnInit, ContentComponent {

  @Input() depth: number = 0;
  @Input() data: ContentPages;

  @Input() locale: string;
  @Input() darkMode = false;

  constructor() { }

  ngOnInit(): void {
  }

}
