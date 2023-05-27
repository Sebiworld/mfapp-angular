import { Component, Input, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

import { environment } from '@env/environment';

import { ContentLottie } from '@models/content/content-lottie.model';
import { ApiService } from '@services/api/api.service';

import { ContentComponent } from '../content-block/content-component.interface';

@Component({
  selector: 'app-content-lottie',
  templateUrl: './content-lottie.component.html',
  styleUrls: ['./content-lottie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentLottieComponent implements OnInit, ContentComponent {

  @Input() depth: number = 0;
  @Input() data: ContentLottie;

  @Input() darkMode = false;
  @Input() locale: string;

  options: AnimationOptions = {
    path: '/assets/animation.json',
  };

  public readonly apiUrl = environment.apiUrl;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    const params: { [key: string]: any } = {
      api_key: environment.apiKey,
      file: this.data.json.basename
    };

    this.options = {
      ...this.options,
      path: this.apiService.getFileUrl('' + this.data.json.page_id, params)
    };
  }
}
