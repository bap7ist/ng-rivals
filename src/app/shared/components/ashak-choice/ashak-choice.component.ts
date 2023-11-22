
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ashakChoice } from 'src/app/store/actions/app.actions';
import { TranslateModule } from '@ngx-translate/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-ashak-choice',
    templateUrl: './ashak-choice.component.html',
    styleUrls: ['./ashak-choice.component.scss'],
    animations: [
        trigger('fadeInImg', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(1000, style({ opacity: 0.4 }))
            ])
        ]),
        trigger('fadeIn', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(700, style({ opacity: 1 }))
            ])
        ])
    ],
    standalone: true,
    imports: [NgClass, TranslateModule],
})
export class AshakChoiceComponent implements OnInit, OnDestroy {

  @Output() closeAshakChoice = new EventEmitter<string>()
  onLeave: boolean
  showQikaa: boolean
  showAtmos: boolean

  constructor(private store: Store) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  selectAshak(ashakName: string): void {
    this.store.dispatch(ashakChoice({ashakName: ashakName}))
    this.closeAshakChoice.emit()
    this.onLeave = true
  }

}






