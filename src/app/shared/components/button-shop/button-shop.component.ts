import { Component, input } from '@angular/core';

@Component({
  selector: 'app-button-shop',
  imports: [],
  templateUrl: './button-shop.component.html',
  styleUrl: './button-shop.component.scss'
})
export class ButtonShopComponent {

  imageSrc = input<string>();
}
