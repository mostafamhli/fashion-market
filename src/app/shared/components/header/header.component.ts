import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  @ViewChild ('searchPopupBox') searchPopupBox: ElementRef<HTMLDivElement> | undefined;
  @ViewChild ('toggleBox') toggleBox: ElementRef<HTMLDivElement> | undefined;

  isToggle:boolean=false;
  isSearchPopup:boolean=false;

  constructor() {
    
  }
  
  ngOnInit(): void {
    
  }

  navToggle(){
    this.isToggle=!this.isToggle;
    if(this.isToggle === true){
      this.searchPopupBox?.nativeElement.classList.remove('show')
    }
  }

  searchPopup(event:any){
    event.preventDefault()
    this.isSearchPopup=!this.isSearchPopup;
    if(this.isSearchPopup === true){
      this.toggleBox?.nativeElement.classList.remove('show')
    }
  }
}
