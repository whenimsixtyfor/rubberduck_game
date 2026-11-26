import { Component, viewChild,signal,OnDestroy,ElementRef } from '@angular/core';
import { Cat } from './cat/cat';
@Component({
  selector: 'app-root',
  imports: [Cat],
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnDestroy {
  counter= signal(0);
  jumping= signal(false);
  showCat= signal(false);
  toggle() {
       this.showCat.update(v=> !v); 
      }
      
  private timeoutId: ReturnType<typeof setTimeout> | null = null;
 private readonly quackSound = viewChild.required<ElementRef<HTMLAudioElement>>('quackSound');
  quack() {
     this.counter.set(this.counter() + 1);
    this.jumping.set(true);
    const audioElement = this.quackSound().nativeElement;
    audioElement.currentTime = 0;
    audioElement.play().catch();
    this.timeoutId = setTimeout(() => {
      this.jumping.set(false);
      this.timeoutId=null;
    }, 500);
   
    
   
  }
  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
  
}
