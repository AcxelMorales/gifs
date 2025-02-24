import { Component, input, InputSignal } from '@angular/core';

@Component({
  selector: 'app-gifs-list-item',
  templateUrl: './gifs-list-item.component.html',
})
export class GifsListItemComponent {

  url = input.required<string>();

}
