import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-2',
  imports: [NgClass],
  templateUrl: './button-2.component.html',
  styleUrl: './button-2.component.scss'
})
export class Button2Component {

  public width = input<number>()
  public active = input<boolean>()

}
