export interface CardComment {
    _id: string;
    cardId: string;
    text: string;
    likes: Author[];
    author: Author;
    createdAt: string;
    updatedAt: string;
  }

  export interface Author {
    _id: string;
    email: string;
    nom: string;
    dateCreation: string;
  }
