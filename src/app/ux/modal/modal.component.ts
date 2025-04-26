import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, style, transition, trigger } from '@angular/animations';
import { ModalService } from './modal.service';
import { ModalResult } from './modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (modalService.modalState$ | async; as modalState) {
      @if (modalState.isOpen) {
        <div class="modal-overlay" (click)="close(null)" [@fadeIn]>
          <div
            class="modal-container"
            (click)="$event.stopPropagation()"
            [@slideIn]>
            <div class="modal-header">
              <h1 class="modal-title">{{ modalState.config?.title }}</h1>
              <button class="close-button" (click)="close(null)">×</button>
            </div>
            <div class="modal-content">
              <p>{{ modalState.config?.message }}</p>
            </div>
            @if (modalState.config?.buttons?.length) {
              <div class="modal-footer">
                @for (button of modalState.config.buttons; track button) {
                  <button
                    [class]="button.variant || 'primary'"
                    (click)="close(button.value)">
                    {{ button.label }}
                  </button>
                }
              </div>
            }
          </div>
        </div>
      }
    }
  `,
  styles: [
    `
      .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }

      .modal-container {
        background: white;
        border-radius: 8px;
        padding: 20px;
        min-width: 300px;
        max-width: 500px;
        width: 90%;
        max-height: 90vh;
        overflow: auto;
      }

      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
      }

      .modal-title {
        margin: 0;
        font-size: 1.25rem;
      }

      .close-button {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        margin: 0;
        line-height: 1;
      }

      .modal-content {
        margin-bottom: 20px;
      }

      .modal-footer {
        display: flex;
        gap: 10px;
        justify-content: flex-end;
      }

      button {
        padding: 8px 16px;
        border-radius: 4px;
        border: none;
        cursor: pointer;
        font-weight: 500;
        transition: all 0.3s ease;
      }

      .primary {
        &:hover {
          background-color: rgb(79, 188, 132);
          color: white;
        }
      }

      .secondary {
        background-color: #9e9e9e;
        color: white;
      }

      .danger {
        &:hover {
          background-color: rgb(219, 69, 58);
          color: white;
        }
      }
    `,
  ],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('150ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('150ms', style({ opacity: 0 }))]),
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateY(-20px)', opacity: 0 }),
        animate(
          '200ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '150ms ease-in',
          style({ transform: 'translateY(-20px)', opacity: 0 })
        ),
      ]),
    ]),
  ],
})
export class ModalComponent {
  modalService = inject(ModalService);

  close(result: ModalResult) {
    this.modalService.close(result);
  }
}
