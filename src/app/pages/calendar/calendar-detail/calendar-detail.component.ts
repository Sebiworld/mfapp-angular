import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-calendar-detail',
  templateUrl: './calendar-detail.component.html',
  styleUrls: ['./calendar-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDetailComponent {

  public readonly id$ = this.activatedRoute.params.pipe(
    map(data => data?.id)
  );

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.id$.subscribe(id => console.log('ID', id));
  }

}
