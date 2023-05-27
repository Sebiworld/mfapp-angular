/*
authors: ["Wolfgang Sauer"]
color: "3D2712"
contents: (2) [{…}, {…}]
created: 1569067699
datetime_from: 1569067680
httpUrl: "https://musical-fabrik.local/projekte/der-medicus/aktuelles/der-kartenverkauf-hat-begonnen/"
id: 5054
intro: "Heute morgen begann der Kartenverkauf für unser aktuelles Musical „Der Medicus“.
        Gegen 7.00 Uhr standen die ersten Musical-Liebhaber vor dem Ticketbüro der Flora Westfalica,
        um die begehrten Karten zu ergattern."
isProjectPage: true
main_image: {
  basename: "promotiontour_karten_verkaufsstart-5-1.jpg",
  name: "promotiontour_karten_verkaufsstart-5-1.jpg",
  description: "",
  created: 1569070624,
  modified: 1569070624,
  …
}
modified: 1572966781
name: "der-kartenverkauf-hat-begonnen"
project: {id: 3478, name: "der-medicus", title: "Der Medicus", created: 1530812595, modified: 1572966740, …}
tags: (2) [{…}, {…}]
template: {id: 63, name: "article", label: "Beitrag"}
title: "Der Kartenverkauf hat begonnen"
url: "/projekte/der-medicus/aktuelles/der-kartenverkauf-hat-begonnen/"
*/

import { ApiPage } from './api-page.model';
import { ApiImage } from './api-image.model';
import { ContentBlock } from './content/content-block.model';

export interface ApiArticle extends ApiPage {
  project: ApiPage;
  datetime_from: number;
  main_image: ApiImage;
  intro: string;
  contents: ContentBlock[];
  authors: string[];
  tags: ApiPage[];
  detailsLoaded: boolean;
}
