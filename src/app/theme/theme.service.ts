import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/*import { Theme, light, dark } from "./theme";
export const darkTheme = { 
  'dark-mode-elements': 'hsl(209, 23%, 22%)',
  'dark-mode-background': 'hsl(207, 26%, 17%)',
  'dark-mode-text': 'hsl(0, 0%, 100%)'
  
};

export const lightTheme = { 
  'light-mode-text': 'hsl(200, 15%, 8%)',
  'light-mode-input': 'hsl(0, 0%, 52%)',
  'light-mode-background': 'hsl(0, 0%, 98%)',
  'light-mode-elements': 'hsl(0, 0%, 100%)'
}; */

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  constructor() { }

  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }
/*  toggleDark() {
    this.setTheme(darkTheme);
  }

  toggleLight() {
    this.setTheme(lightTheme);
  }

  private setTheme(theme: {}) {
    Object.keys(theme).forEach(k =>
      document.documentElement.style.setProperty(`--${k}`, theme[k])
    );
  }*/
  
}
