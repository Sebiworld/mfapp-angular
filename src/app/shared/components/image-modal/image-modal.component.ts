import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { ContentGallery } from '@models/content/content-gallery.model';
import { ApiImage } from '@models/api-image.model';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageModalComponent implements OnInit, AfterViewInit {

  @ViewChild('galleryitems', { static: true }) galleryElement: ElementRef;

  @Input()
  public image: ApiImage;

  @Input()
  public gallerydata: ContentGallery;

  sliderOpts = {
    zoom: {
      maxRatio: 3
    }
  };

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('image data: ', this.image);
  }

  ngAfterViewInit() {
  }

  zoom(zoomIn: boolean){

  }

  close(){
    this.modalController.dismiss();
  }
}
