import { User } from "src/app/pages/admin/cards/models/user.interface";

export class Notification {
    _id: string;
    recipient: User;
    sender: User;
    card: {
      _id: string;
      name_fr: string;
      name_en: string;
    };
    type: NotificationType;
    message: string;
    isRead: boolean;
    metadata?: Record<string, any>;
    createdAt: Date;
  }

  export enum NotificationType {
    NEW_COMMENT = 'NEW_COMMENT',
    LIKE_COMMENT = 'LIKE_COMMENT',
    CARD_UPDATE = 'CARD_UPDATE'
  }