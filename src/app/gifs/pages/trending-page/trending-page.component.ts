import { Component, inject, OnInit } from '@angular/core';

import { GifsListComponent } from '../../components/gifs-list/gifs-list.component';

import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
  imports: [GifsListComponent]
})
export default class TrendingPageComponent implements OnInit {

  gifService = inject(GifsService);

  ngOnInit() {
    this.gifService.loadTrendingGifs();
  }

}
