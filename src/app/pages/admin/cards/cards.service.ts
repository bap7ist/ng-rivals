import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RivalsCard } from './models/RivalsCard';
import { environment } from 'src/environments/environment';
import { CloudinaryImage } from './models/cloudinary-image.interface';
import { CardComment } from './models/card-comment.interface';
import { Category } from './models/category.interface';

@Injectable({
  providedIn: 'root',
})
export class RivalsCardService {
  private apiUrl = `${environment.apiUrl}/cards`; 

  private _http = inject(HttpClient);
  // Créer une nouvelle carte
  public createCard$(card: RivalsCard): Observable<RivalsCard> {
    return this._http.post<RivalsCard>(this.apiUrl, card);
  }

  public uploadImage$(image: File): Observable<{ imageUrl: string }> {
    const formData = new FormData();
    formData.append('image', image);
    return this._http.post<{ imageUrl: string }>(
      `${this.apiUrl}/upload-image`,
      formData
    );
  }

  public getAllImages$(): Observable<CloudinaryImage[]> {
    return this._http.get<CloudinaryImage[]>(`${this.apiUrl}/images`);
  }

  // Récupérer toutes les cartes
  public getAllCards$(): Observable<RivalsCard[]> {
    return this._http.get<RivalsCard[]>(this.apiUrl);
  }

  // Récupérer une carte par son ID
  public getCardById$(id: string): Observable<RivalsCard> {
    return this._http.get<RivalsCard>(`${this.apiUrl}/${id}`);
  }

  // Mettre à jour une carte
  public updateCard$(id: string, card: RivalsCard): Observable<RivalsCard> {
    return this._http.patch<RivalsCard>(`${this.apiUrl}/${id}`, card);
  }

  // Supprimer une carte
  public deleteCard$(id: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/${id}`);
  }

  public deleteAllCards$(): Observable<void> {
    return this._http.delete<void>(this.apiUrl);
  }

  // Créer une nouvelle catégorie
  public createCategory$(category: Category): Observable<Category> {
    return this._http.post<any>(`${this.apiUrl}/categories`, category);
  }

  // Supprimer une catégorie
  public deleteCategory$(categoryId: string): Observable<void> {
    // const encodedCategory = encodeURIComponent(categoryId);
    return this._http.delete<void>(`${this.apiUrl}/categories/${categoryId}`);
  }

  // Récupérer toutes les catégories
  public getAllCategories$(): Observable<Category[]> {
    return this._http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  // Créer un commentaire
  public createComment$(cardId: string, text: string): Observable<CardComment> {
    return this._http.post<any>(`${this.apiUrl}/${cardId}/comments`, { text });
  }

  // Récupérer les commentaires d'une carte
  public getCardComments$(cardId: string): Observable<CardComment[]> {
    return this._http.get<any[]>(`${this.apiUrl}/${cardId}/comments`);
  }

  // Liker un commentaire
  public likeComment$(commentId: string): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/comments/${commentId}/like`, {});
  }

  // Unliker un commentaire
  public unlikeComment$(commentId: string): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/comments/${commentId}/like`);
  }

  // Supprimer un commentaire
  public deleteComment$(commentId: string): Observable<void> {
    return this._http.delete<void>(`${this.apiUrl}/comments/${commentId}`);
  }

  // Accepter une carte
  public acceptCard$(cardId: string): Observable<RivalsCard> {
    return this._http.post<RivalsCard>(`${this.apiUrl}/${cardId}/accept`, {});
  }

  // Retirer l'acceptation d'une carte
  public removeCardAcceptance$(cardId: string): Observable<RivalsCard> {
    return this._http.delete<RivalsCard>(`${this.apiUrl}/${cardId}/accept`);
  }
}
