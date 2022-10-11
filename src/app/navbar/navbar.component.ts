import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() showLanguage = new EventEmitter<boolean>()
  @Input() ashak: string

  switchModal : boolean

  constructor() { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.switchModal = !this.switchModal
    this.showLanguage.emit(this.switchModal)
  }

}
