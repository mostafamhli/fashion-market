import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartsService } from 'src/app/carts/services/carts.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  @ViewChild('searchPopupBox') searchPopupBox:
    | ElementRef<HTMLDivElement>
    | undefined;
  @ViewChild('toggleBox') toggleBox: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('sunIcon') sunIcon: ElementRef<HTMLLinkElement> | undefined;
  @ViewChild('moonIcon') moonIcon: ElementRef<HTMLLinkElement> | undefined;

  isToggle: boolean = false;
  isSearchPopup: boolean = false;
  lightThemeToggle: boolean = true;
  darkThemeToggle: boolean = false;
  userTheme = localStorage.getItem('theme');
  systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  cartNotEmpty: any = false

  constructor(private cartService:CartsService) {}

  ngOnInit(): void {
    this.themeCheck()
    if (JSON.parse(localStorage.getItem('cart')!).length > 0) {
      this.cartService.raiseDateEmitterEvent(true)
    }

    this.cartService.dataEmitter.subscribe((value)=>{
      this.cartNotEmpty=value 
    })
  }

  iconToggle() {
    this.sunIcon?.nativeElement.classList.toggle('display-none');
    this.moonIcon?.nativeElement.classList.toggle('display-none');
  }

  themeCheck() {
    if (this.userTheme === 'dark' || (!this.userTheme && this.systemTheme)) {
      document.documentElement.classList.add('dark');
      this.moonIcon?.nativeElement.classList.add('display-none');
      return;
    }
    this.sunIcon?.nativeElement.classList.add('display-none');
  }

  themeSwitch() {
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      this.iconToggle();
      return;
    }
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
    this.iconToggle();
  }

  lightIconClicked(){
    this.lightThemeToggle =! this.lightThemeToggle;
    this.darkThemeToggle =! this.darkThemeToggle;
    this.userTheme='dark';
    this.themeSwitch();
    
  }

  darkIconClicked(){
    this.lightThemeToggle =! this.lightThemeToggle;
    this.darkThemeToggle =! this.darkThemeToggle;
    this.userTheme='light';
    this.themeSwitch();
  }
  
  navToggle() {
    this.isToggle = !this.isToggle;
    if (this.isToggle === true) {
      this.searchPopupBox?.nativeElement.classList.remove('show');
    }
  }

  searchPopup(event: any) {
    event.preventDefault();
    this.isSearchPopup = !this.isSearchPopup;
    if (this.isSearchPopup === true) {
      this.toggleBox?.nativeElement.classList.remove('show');
    }
  }
}
