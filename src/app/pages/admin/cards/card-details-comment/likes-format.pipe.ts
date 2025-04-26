import { Pipe, PipeTransform } from '@angular/core';
import { Author } from '../models/card-comment.interface';

@Pipe({
  name: 'likesFormat',
  standalone: true
})
export class LikesFormatPipe implements PipeTransform {
  transform(likes: Author[], currentUserId: string): string {
    if (!likes || likes.length === 0) return '';
    
    // Si l'utilisateur courant a liké
    const userLike = likes.find(like => like._id === currentUserId);
    if (userLike) {
      if (likes.length === 1) {
        return 'Vous aimez';
      }
      return `Vous et ${likes.length - 1} ${likes.length === 2 ? 'autre personne aiment' : 'autres personnes aiment'}`;
    }

    // Cas standards
    if (likes.length === 1) {
      return `${likes[0].nom.split(' ')[0]} aime`;
    }
    return `${likes.length} personnes aiment`;
  }
}