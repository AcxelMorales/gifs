import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GifsSideMenuComponent } from '../../components/gifs-side-menu/gifs-side-menu.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  imports: [
    RouterModule,
    GifsSideMenuComponent
  ],
})
export default class DashboardPageComponent {}
