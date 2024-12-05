import { Component, Input, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass, UpperCasePipe } from '@angular/common';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    imports: [
        NgClass,
        UpperCasePipe,
        TranslateModule,
    ]
})
export class ButtonComponent implements OnInit {
  @Input() name: string;
  @Input() width: number;
  @Input() innerWidth: number;
  @Input() height: number;
  @Input() innerHeight: number;
  @Input() fontSize: number;
  @Input() ashak: string;
  @Input() white: boolean;

  constructor() {}

  ngOnInit(): void {}
}
