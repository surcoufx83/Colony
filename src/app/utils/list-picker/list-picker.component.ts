import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'list-picker',
  templateUrl: './list-picker.component.html',
  styleUrls: ['./list-picker.component.scss']
})
export class ListPickerComponent {

  @Input('items') listitems!: string[];
  @Output('pick') itemPicked: EventEmitter<number> = new EventEmitter();
  
  arrowRight = faAngleRight;

}
