import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-spacer',
  templateUrl: './section-spacer.component.html',
  styleUrls: ['./section-spacer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionSpacerComponent implements OnInit {

  @Input() position: 'top' | 'bottom' = 'top';
  @Input() logo: false | 'auto' | 'wide' | 'mobile' = false;

  constructor() { }

  ngOnInit(): void {
  }

}
