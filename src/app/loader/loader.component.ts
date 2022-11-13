
import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ashakChoice } from '../store/actions/app.actions';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {

  constructor(private store: Store) { }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }
}
