import { NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-ashaks',
  imports: [NgClass, TranslateModule],
  templateUrl: './ashaks.component.html',
  styleUrl: './ashaks.component.scss',
})
export class AshaksComponent implements OnInit {
  public selectedAshak = signal<string>('qikaa');

  private _router = inject(Router);
  private _route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this._route.queryParams
      .pipe(
        filter(params => params['ashak'])
      )
      .subscribe(params => {
        this.selectedAshak.set(params['ashak']);
      });
  }

  public selectAshak(ashak: string): void {
    this.selectedAshak.set(ashak);
    this._router.navigate([], {
      queryParams: { ashak },
      queryParamsHandling: 'merge',
    });
  }
}
