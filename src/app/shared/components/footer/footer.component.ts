import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { social } from '../../models/social';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  socials: Array<social>;


  @Input() ashak: string

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchSocialMedia().subscribe((socials) => {
      this.socials = socials
    })
  }

  fetchSocialMedia(): Observable<Array<social>> {
    return this.http.get('assets/data/socials.json') as Observable<Array<social>>;
  }
}
