import {
  Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ChangeDetectorRef,
  OnChanges, SimpleChanges, ComponentRef
} from '@angular/core';
import { camelCase as _camelCase, kebabCase as _kebapCase, upperFirst as _upperFirst } from 'lodash-es';

import { ContentInterface } from '@models/content/content-interface.model';

import { ContentBlockHostDirective } from './content-block-host.directive';
import { ContentComponent } from './content-component.interface';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentBlockComponent implements OnInit, OnChanges {

  @ViewChild(ContentBlockHostDirective, { static: true }) blockHost!: ContentBlockHostDirective;

  @Input() depth: number = 0;
  @Input() data: ContentInterface;

  @Input() darkMode = false;
  @Input() locale: string;

  @Input() contentComponents: { [key: string]: () => Promise<any> } = {};

  private componentRef: ComponentRef<ContentComponent>;
  private initializing: boolean = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.componentRef?.instance) {
      if (changes.depth && this.depth) {
        this.componentRef.instance.depth = this.depth;
      }
      if (changes.data && this.data) {
        this.componentRef.instance.data = this.data;
      }
      if (changes.darkMode && this.darkMode) {
        this.componentRef.instance.darkMode = this.darkMode;
      }
      if (changes.locale && this.locale) {
        this.componentRef.instance.locale = this.locale;
      }
    } else {
      this.init();
    }
  }

  private async init() {
    if (this.initializing) { return; }

    this.initializing = true;
    try {
      await this.loadComponent(this.data);
      this.initializing = false;
    } catch (e) {
      console.log("e", e);
      this.initializing = false;
    }
  }

  private async loadComponent(data: ContentInterface) {
    if (!data || !data.type) { return; }

    const viewContainerRef = this.blockHost.viewContainerRef;
    viewContainerRef.clear();

    const componentPromise = this.contentComponents[data.type];
    if (!componentPromise) { return; }

    const component = await componentPromise();
    if (!component) { return; }

    this.componentRef = viewContainerRef.createComponent<ContentComponent>(component);
    this.componentRef.instance.depth = this.depth;
    this.componentRef.instance.data = data;
    this.componentRef.instance.darkMode = this.darkMode;
    this.componentRef.instance.locale = this.locale;

    this.changeDetectorRef.detectChanges();
  }

}
