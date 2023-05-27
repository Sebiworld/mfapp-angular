import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { ApiDefaultPage } from '@services/pages/+store/api-default-page.model';

@Component({
  selector: 'app-page-card',
  templateUrl: './page-card.component.html',
  styleUrls: ['./page-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageCardComponent implements OnInit {

  @Input() data: ApiDefaultPage;
  @Input() classes?: string;
  @Input() horizontalLayout: boolean | 'auto' = false;
  @Input() index: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
