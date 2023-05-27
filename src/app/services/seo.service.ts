import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { isElement as _isElement } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    @Inject(DOCUMENT) private document,
    private titleService: Title
  ) { }

  setSeo(seo: { [key: string]: string } = {}, urls: { [key: string]: string }) {
    this.titleService.setTitle(seo.title ?? 'Musical-Fabrik');

    const alternateLinks = [];
    for (const key in urls) {
      if (!urls[key]) { continue; }
      const language = key === 'default' ? 'x-default' : key;
      const url = urls[key];
      alternateLinks.push({
        tag: 'link',
        selector: 'link[rel="alternate"][hreflang="' + language + '"]',
        attributeValues: {
          rel: 'alternate',
          hreflang: language,
          href: 'https://app.musical-fabrik.de' + url
        }
      });
    }

    this.setHeadTags([
      {
        tag: 'link',
        selector: 'link[rel="canonical"]',
        attributeValues: { rel: 'canonical', href: seo.canonical ?? '' }
      },
      ...alternateLinks,
      {
        tag: 'meta',
        selector: 'meta[name="description"]',
        attributeValues: { name: 'description', content: seo.description ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:title"]',
        attributeValues: { property: 'og:title', content: seo['og:title'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:type"]',
        attributeValues: { property: 'og:type', content: seo['og:type'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:description"]',
        attributeValues: { property: 'og:description', content: seo['og:description'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:url"]',
        attributeValues: { property: 'og:url', content: seo['og:url'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:site_name"]',
        attributeValues: { property: 'og:site_name', content: seo['og:site_name'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:image"]',
        attributeValues: { property: 'og:image', content: seo['og:image'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:image:type"]',
        attributeValues: { property: 'og:image:type', content: seo['og:image:type'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:image:width"]',
        attributeValues: { property: 'og:image:width', content: seo['og:image:width'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[property="og:image:height"]',
        attributeValues: { property: 'og:image:height', content: seo['og:image:height'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[name="twitter:card"]',
        attributeValues: { name: 'twitter:card', content: seo['twitter:card'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[name="twitter:site"]',
        attributeValues: { name: 'twitter:site', content: seo['twitter:site'] ?? '' }
      },
      {
        tag: 'meta',
        selector: 'meta[name="twitter:creator"]',
        attributeValues: { name: 'twitter:creator', content: seo['twitter:creator'] ?? '' }
      },
    ]);
  }

  setHeadTags(tags: {
    tag: string;
    selector: string;
    attributeValues: { [key: string]: string };
  }[]) {
    const head: HTMLElement = this.document.querySelector('head');
    if (!_isElement(head)) { return; }

    for (const tag of tags) {
      if (!tag.selector || !tag.attributeValues) { continue; }
      let el = head.querySelector(tag.selector);
      if (!_isElement(el)) {
        // Create Element
        el = this.document.createElement(tag.tag);
        head.appendChild(el);
      }
      for (const attributeKey in tag.attributeValues) {
        if (!tag.attributeValues[attributeKey]) { continue; }
        const attributeVal = tag.attributeValues[attributeKey];
        el.setAttribute(attributeKey, attributeVal);
      }
    }
  }
}
