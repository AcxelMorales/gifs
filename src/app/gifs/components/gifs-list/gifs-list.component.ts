import { Component, input } from '@angular/core';

import { GifsListItemComponent } from './gifs-list-item/gifs-list-item.component';

import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-gifs-list',
  templateUrl: './gifs-list.component.html',
  imports: [GifsListItemComponent]
})
export class GifsListComponent {

  gifs = input.required<Gif[]>();

}
