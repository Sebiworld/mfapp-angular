import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '@env/environment';
import { ApiService } from '@services/api/api.service';

import { ApiImage } from '@models/api-image.model';

@Pipe({
  name: 'fileUrl'
})
export class FileUrlPipe implements PipeTransform {

  constructor(
    private apiService: ApiService
  ) { }

  transform(apiImage: ApiImage, opts: { [key: string]: any } = {}, ...args: any[]): any {
    if (!apiImage) { return; }
    const params: { [key: string]: any } = {
      api_key: environment.apiKey,
      file: apiImage.basename
    };

    if (opts?.width) {
      params.width = opts.width;
    }
    if (opts?.height) {
      params.height = opts.height;
    }
    if (opts?.webp) {
      params.webp = opts.webp;
    }

    return this.apiService.getFileUrl('' + apiImage.page_id, params);
  }

}
