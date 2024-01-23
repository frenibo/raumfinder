import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoUnlockComponent } from './dialog-info-unlock.component';

describe('DialogInfoUnlockComponent', () => {
  let component: DialogInfoUnlockComponent;
  let fixture: ComponentFixture<DialogInfoUnlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogInfoUnlockComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogInfoUnlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
