import { Component, Input, OnInit,  } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() width: number;
  @Input() innerWidth: number;
  @Input() height: number;
  @Input() innerHeight: number;
  @Input() fontSize: number;
  @Input() ashak: string;

  constructor() {}

  ngOnInit(): void {
  }

}
