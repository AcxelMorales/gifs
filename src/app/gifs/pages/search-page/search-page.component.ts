import { Component, inject, signal } from '@angular/core';

import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

import { GifsService } from '../../services/gifs.service';

import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: [],
  imports: [GifsListComponent]
})
export default class SearchPageComponent {

  gifsService = inject(GifsService);

  gifs = signal<Gif[]>([]);

  onSearch(query: string): void {
    this.gifsService.searchGifs(query).subscribe((res): void => {
      this.gifs.set(res);
    });
  }

}
