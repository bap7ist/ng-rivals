
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ashakChoice } from '../store/actions/app.actions';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  animations: [
    trigger('fadeInImg', [ 
      transition('void => *', [
        style({ opacity: 0 }), 
        animate(1000, style({opacity: 0.4}))
      ]) 
    ]),
  trigger('fadeIn', [ 
    transition('void => *', [
      style({ opacity: 0 }), 
      animate(300, style({opacity: 1}))
    ]) 
  ])
],

  
})
export class LoaderComponent implements OnInit, OnDestroy {

  @Output() closeLoader = new EventEmitter<string>()
  onLeave: boolean
  showQikaa: boolean
  showAtmos: boolean

  constructor(private store: Store) { }
  ngOnDestroy(): void {
    document.body.style.overflowY = ""
  }

  ngOnInit(): void {
    document.body.style.overflowY = 'hidden'
  }

  selectAshak(ashakName: string): void {
    this.store.dispatch(ashakChoice({ashakName: ashakName}))
    this.closeLoader.emit(ashakName)
    this.onLeave = true
  }

}
