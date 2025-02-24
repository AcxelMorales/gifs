import { Component } from '@angular/core';

import { environment } from '@envs/environment.development';

@Component({
  selector: 'app-gifs-side-menu-header',
  templateUrl: './gifs-side-menu-header.component.html',
})
export class GifsSideMenuHeaderComponent {

  envs = environment;

}
