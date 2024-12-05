import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  signal,
  computed,
} from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
  standalone: true,
})
export class BattleComponent implements OnInit {
  scrollValue = 0;
  private readonly maxScroll = 200;
  private componentTop = 0;
  private componentHeight = 0;

  public badges = [
    {
      id: 1,
      name: 'Incarnez 8 Ashaks différents',
      image: '../../../../assets/img/br/logo_rivals.png',
    },
    {
      id: 2,
      name: 'Rendez votre Ashak plus fort en lui apprenant des compétences',
      image: '../../../../assets/img/br/logo_competence.png',
    },
    {
      id: 3,
      name: 'Construisez le meilleur équipement possible',
      image: '../../../../assets/img/br/logo_pioche.png',
    },
    {
      id: 4,
      name: 'Boostez votre anticipation',
      image: '../../../../assets/img/br/logo_anticipation.png',
    },
    {
      id: 5,
      name: 'Affrontez les autres Ashaks dans la Wildtech',
      image: '../../../../assets/img/br/logo_dead.png',
    },
  ];

  boards = [
    {
      id: 1,
      name: 'Player 1 Board',
      image: '../../../../assets/img/plateaux/atmos.png',
      baseRotation: 15,
    },
    {
      id: 2,
      name: 'Player 2 Board',
      image: '../../../../assets/img/plateaux/gyaleis.png',
      baseRotation: 15,
    },
    {
      id: 3,
      name: 'Player 3 Board',
      image: '../../../../assets/img/plateaux/qikaa.png',
      baseRotation: 15,
    },
  ];

  public hexagonScale = signal(400);

  public hexagonWidth = computed(() => this.hexagonScale() + 'px');

  private _scalingInterval: NodeJS.Timeout | null = null;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.updateComponentPosition();
    this.updateScrollValue();
  }

  public startHexagonScaling() {
    if (this._scalingInterval) {
      clearInterval(this._scalingInterval);
    }
    this._scalingInterval = setInterval(() => {
      this.hexagonScale.update(scale => Math.min(scale + 20, 1000));
      console.log(this.hexagonScale());
      console.log(this.hexagonWidth());
    }, 50);
  }

  public stopHexagonScaling() {
    if (this._scalingInterval) {
      clearInterval(this._scalingInterval);
      this._scalingInterval = null;
      const descaleInterval = setInterval(() => {
        this.hexagonScale.update(scale => Math.max(scale - 20, 400));
        console.log(this.hexagonScale());
        if (this.hexagonScale() <= 400) {
          clearInterval(descaleInterval);
        }
      }, 10);
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.updateScrollValue();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateComponentPosition();
    this.updateScrollValue();
  }

  private updateComponentPosition() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    this.componentTop = rect.top + window.scrollY;
    this.componentHeight = rect.height;
  }

  private updateScrollValue() {
    const windowHeight = window.innerHeight;
    const componentRect = this.elementRef.nativeElement.getBoundingClientRect();

    const startTrigger = windowHeight * 0.2;
    const endTrigger = windowHeight * 0.05;

    const componentPosition = componentRect.top;

    const progress =
      Math.max(
        0,
        Math.min(
          1,
          (startTrigger - componentPosition) / (startTrigger - endTrigger)
        )
      ) * 0.25;

    this.scrollValue = progress * this.maxScroll;
  }

  getBoardTransform(boardId: number): string {
    const board = this.boards.find(b => b.id === boardId)!;
    const scrollProgress = this.scrollValue / this.maxScroll;

    const easeOutQuad = (t: number) => t * (2 - t);
    const smoothProgress = easeOutQuad(scrollProgress);

    const baseY = -600;
    const verticalSpacing = smoothProgress * (board.id === 1 ? 600 : 400);
    const zSpacing = smoothProgress * 300;

    const translateY = baseY + (board.id - 1) * verticalSpacing;
    const translateZ = (3 - board.id) * -zSpacing;

    const scale = 1 + translateZ * 0.00015;

    const baseRotateX = 25;
    const rotateX = baseRotateX - smoothProgress * 15;
    const rotateY = 10 - smoothProgress * 5;

    const rotate = 15 + smoothProgress * 10;

    return `
      perspective(2500px)
      translateX(-25%)
      translateY(${translateY}px)
      translateZ(${translateZ}px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(${scale})
      rotate(${rotate + board.id * 3}deg)
    `;
  }
}
