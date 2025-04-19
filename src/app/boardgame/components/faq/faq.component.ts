import { Component } from '@angular/core';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
  link?: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [FooterComponent, CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  activeIndices: number[] = [];

  faqItems: FaqItem[] = [
    {
      question: "Je n'ai que 18 marqueurs (cubes dorés), est-ce normal ?",
      answer: "Oui. Nous avons fait une erreur dans le livret de règles. Seulement 3 cubes par joueur sont nécessaires."
    },
   
    // Ajoutez vos autres questions/réponses ici
  ];

  toggleAccordion(index: number): void {
    const currentIndex = this.activeIndices.indexOf(index);
    if (currentIndex === -1) {
      // Si l'index n'est pas dans le tableau, on l'ajoute
      this.activeIndices.push(index);
    } else {
      // Si l'index est déjà dans le tableau, on le retire
      this.activeIndices.splice(currentIndex, 1);
    }
  }

  isActive(index: number): boolean {
    return this.activeIndices.includes(index);
  }
}
