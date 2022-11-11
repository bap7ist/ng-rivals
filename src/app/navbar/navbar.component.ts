import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() showLanguage = new EventEmitter<boolean>()
  @Output() sidePanelOn = new EventEmitter<boolean>()
  @Input() ashak: string
  @Input() isMobile: boolean

  switchModal : boolean
  switchPanel: boolean

  constructor() { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.switchModal = !this.switchModal
    this.showLanguage.emit(this.switchModal)
  }

  openSidePanel(): void {
    this.switchPanel = !this.switchPanel
    this.sidePanelOn.emit(this.switchPanel)
  }

}
