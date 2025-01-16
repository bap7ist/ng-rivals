import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

interface BoardGameSeoConfig {
  title: string;
  description: string;
  gameImage?: string;
  players?: string;
  playTime?: string;
  minAge?: string;
  category?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private readonly gameName = 'Unkind Rivals';
  private readonly defaultImage =
    'https://unkindgames.com/assets/images/game-cover.jpg';
  private readonly publisher = 'Unkind Games';

  private _meta = inject(Meta);
  private _title = inject(Title);
  private _router = inject(Router);

  updateBoardGamePage(config: BoardGameSeoConfig): void {
    const fullTitle = `${config.title} | ${this.gameName}`;
    this._title.setTitle(fullTitle);

    const currentUrl = `https://unkindgames.com${this._router.url}`;

    // Meta tags spécifiques aux jeux de société
    const tags = [
      { name: 'description', content: config.description },
      { name: 'boardgame:publisher', content: this.publisher },
      { name: 'boardgame:players', content: config.players || '2-4 players' },
      {
        name: 'boardgame:playtime',
        content: config.playTime || '30-45 minutes',
      },
      { name: 'boardgame:age', content: config.minAge || '12+' },

      // Open Graph
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: config.description },
      { property: 'og:image', content: config.gameImage || this.defaultImage },
      { property: 'og:url', content: currentUrl },
      { property: 'og:type', content: 'product' },
      { property: 'og:site_name', content: this.publisher },
      { property: 'product:category', content: 'Board Games' },

      // Twitter
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: config.description },
      { name: 'twitter:image', content: config.gameImage || this.defaultImage },
    ];

    tags.forEach(tag => {
      if (tag.content) {
        const targetAttr = tag.property ? 'property' : 'name';
        this._meta.updateTag({
          [targetAttr]: tag.property || tag.name,
          content: tag.content,
        });
      }
    });

    // Schema.org pour jeu de société
    this.setBoardGameSchema({
      '@context': 'https://schema.org',
      '@type': 'Product',
      category: 'Board Game',
      name: this.gameName,
      description: config.description,
      image: config.gameImage || this.defaultImage,
      brand: {
        '@type': 'Brand',
        name: this.publisher,
      },
      offers: {
        '@type': 'Offer',
        availability: 'https://schema.org/InStock',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: 'Number of Players',
          value: config.players || '2-4 players',
        },
        {
          '@type': 'PropertyValue',
          name: 'Playing Time',
          value: config.playTime || '30-45 minutes',
        },
        {
          '@type': 'PropertyValue',
          name: 'Minimum Age',
          value: config.minAge || '12+',
        },
      ],
    });
  }

  private setBoardGameSchema(schema: any): void {
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}
