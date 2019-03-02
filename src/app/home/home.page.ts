import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  percent:number = 0;
  radius:number = 100;
  fullTime: any = '00:01:30';

  timer: any = false;
  progress: any = 0;
  minute: number = 1;
  second: any = 30;
  //diler Object
  dial:any= {
    h: '00',
    m: '00',
    s: '00',
  };
  Totaltimer: any = false;
  // Tap Timer Starts here
  startTime() {
    console.log(this.fullTime);
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (!this.Totaltimer) {
      this.ProgressTimer();
    }
    this.timer = false;
    this.progress = 0;
    this.percent = 0;
    let timeSplit = this.fullTime.split(':');
    this.minute = timeSplit[1];
    this.second = timeSplit[2];
    // tslint:disable-next-line: radix
    let totalSecond = Math.floor(this.minute * 60) + parseInt(this.second);
    // setting the interval calling for the circle progress
    this.timer = setInterval(() => {
      if (this.percent == this.radius) {
        clearInterval(this.timer);
      }
      this.percent = Math.floor((this.progress / totalSecond) * 100);
      this.progress++;
    }, 1000);
  }
  ProgressTimer() {
    let godTime = new Date();
    this.Totaltimer = setInterval(() => {
      let now = new Date().getTime();
      let diffrence = now - godTime.getTime();
      // timer Render
      this.dial.h = Math.floor((diffrence % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.dial.m = Math.floor((diffrence % (1000 * 60 * 60)) / (1000 * 60));
      this.dial.s = Math.floor((diffrence % (1000 * 60)) / 1000);
      // setting to a dual digit number
      this.dial.h = this.dualDigit(this.dial.h, 2);
      this.dial.m = this.dualDigit(this.dial.m, 2);
      this.dial.s = this.dualDigit(this.dial.s, 2);
    }, 1000);
  }
  // For Dual Digit Number Display
  dualDigit(h: any, arg1: number) {
    let TempValue = '' + h;
    while ( TempValue.length < arg1) {
      TempValue = '0' + TempValue;
    }
    return TempValue;
  }
  // reseting The Wholse Process
  stopTime(){
    clearInterval(this.timer);
    clearInterval(this.Totaltimer);
    this.Totaltimer = false;
    this.timer = false;
    this.percent = 0;
    this.progress = 0;
    this.dial = {
      h: '00',
      m: '00',
      s: '00',
    };
  }
}
