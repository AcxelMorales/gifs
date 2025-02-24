import { Component } from '@angular/core';

import { GifsSideMenuHeaderComponent } from './gifs-side-menu-header/gifs-side-menu-header.component';
import { GifsSideMenuOptionsComponent } from './gifs-side-menu-options/gifs-side-menu-options.component';

@Component({
  selector: 'app-gifs-side-menu',
  templateUrl: './gifs-side-menu.component.html',
  imports: [
    GifsSideMenuHeaderComponent,
    GifsSideMenuOptionsComponent
  ]
})
export class GifsSideMenuComponent {}
