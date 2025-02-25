import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { GifsService } from '../../services/gifs.service';

import type { Gif } from '../../interfaces/gif.interface';

import { GifsListComponent } from "../../components/gifs-list/gifs-list.component";

@Component({
  selector: 'app-gif-history',
  templateUrl: './gif-history.component.html',
  imports: [GifsListComponent],
})
export default class GifHistoryComponent {

  gifService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map(params => params['query'])
    )
  );

  gifsByKey = computed((): Gif[] => this.gifService.getHistoryGifs(this.query()));

}
