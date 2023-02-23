import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { getLanguage } from 'src/app/store/selectors/app.selectors';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {

  isAStory: boolean
  isFr: boolean

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {

    const x = this.store.select(getLanguage)

    x.subscribe((language) => {
      this.isFr = language === "fr"
      })

    this.route.params.subscribe((param) => {
      let story = Object.values(param).toString();
      this.isAStory = story === "xhan"
    })

   
  }

}
