import { Component } from '@angular/core';
import { signal } from '@angular/core';
import {OnDestroy} from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})

export class App implements OnDestroy {
  counter= signal(0);
  jumping= signal(false);
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  quack() {
     this.counter.set(this.counter() + 1);
    this.jumping.set(true);
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
