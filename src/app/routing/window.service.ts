import { Injectable } from '@angular/core';

const _window = (): Window => window;

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  get nativeWindow(): Window {
    return _window();
  }
}
