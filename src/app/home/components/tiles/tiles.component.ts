import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tiles',
  imports: [NgClass],
  templateUrl: './tiles.component.html',
  styleUrl: './tiles.component.scss'
})
export class TilesComponent {
  tileHover = 0;


  public onTileEnter(tile: any) {
    console.log('Tile entered:', tile);
    this.tileHover = tile;
  }
}
