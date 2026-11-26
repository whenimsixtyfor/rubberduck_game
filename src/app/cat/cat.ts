import { Component, ElementRef, OnDestroy, signal,viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-cat',
  styleUrl: './cat.css',
  templateUrl: './cat.html',
})
export class Cat implements OnDestroy{
  catCounter= signal(0);
  catJumping=signal(false);
  private timeoutId: ReturnType<typeof setTimeout> |null = null;
  private readonly moewAudio= viewChild.required<ElementRef<HTMLAudioElement>>('meowAudio')
  meow(){
    this.catCounter.set(this.catCounter() + 1);
    this.catJumping.set(true);
    const audioElement = this.moewAudio().nativeElement;
    audioElement.currentTime=0;
    void audioElement.play().catch();
     this.timeoutId=setTimeout(()=>{
    this.catJumping.set(false);
     this.timeoutId=null;
  },500);
  }
  ngOnDestroy(): void {
    if(this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }
}

