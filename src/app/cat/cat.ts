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
  explode= signal(false);
  private clickTimes:number[]=[];
  private respawnId: ReturnType<typeof setTimeout> | null=null;
  private rapidClick(): boolean {
    const neow= performance.now();
    this.clickTimes = this.clickTimes.filter(t => neow - t < 800);
    this.clickTimes.push(neow);
    return this.clickTimes.length >= 4;

  }
 private explosion() {
   if(this.timeoutId) clearTimeout(this.timeoutId);
   this.catJumping.set(false);
   this.explode.set(true);

   this.respawnId= setTimeout(() => {
    this.explode.set(false);
    this.clickTimes=[];
    this.respawnId= null;
   }, 3500);
  }
  meow(){
    if(this.explode()) return;
    if(this.rapidClick()) {
      this.explosion();
      return;
    }
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
    if(this.respawnId) {
      clearTimeout(this.respawnId);
    }
  }
}

