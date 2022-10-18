import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battleroyale',
  templateUrl: './battleroyale.component.html',
  styleUrls: ['./battleroyale.component.scss']
})
export class BattleroyaleComponent implements OnInit {

  tiles : Array<any>

  constructor() { }

  ngOnInit(): void {
    this.tiles = [
      {
        x: '0%',
        y: '10%',
        url: ''
      },
      {
        x: '14.9%',
        y: '10%',
        url: ''
      },
      {
        x: '29.8%',
        y: '10%',
        url: ''
      },
      {
        x: '2.9%',
        y: '21.2%',
        url: '',
        spin: true
      },
      {
        x: '17.8%',
        y: '21.2%',
        url: '',
        spin: true
      },
      {
        x: '32.6%',
        y: '21.2%',
        url: '',
        spin: true
      },
      {
        x: '11.1%',
        y: '29.4%',
        url: '',
      },
      {
        x: '26%',
        y: '29.4%',
        url: '',
      },
    ]
  }

}
