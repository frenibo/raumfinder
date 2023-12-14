//Source: https://stackoverflow.com/questions/51510936/how-to-set-autofocus-on-a-matinput-element-on-click-event-in-angular-6


import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { MatInput } from '@angular/material/input';
    
@Directive({
  selector: '[matInputAutofocus]',
})
export class AutofocusDirective implements OnInit {

  @Input()
  autofocusSelectValue = false;

  constructor(
    private matInput: MatInput,
    private elRef: ElementRef<HTMLInputElement>,
  ) { }

  ngOnInit(): void {
    setTimeout((ms: 600) => {
      
      this.matInput.focus();

      if (this.autofocusSelectValue) {
        this.elRef.nativeElement.setSelectionRange(0, this.elRef.nativeElement.value.length);
      }
    });
  }

}