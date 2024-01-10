import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoRoomComponent } from './dialog-info-room.component';

describe('DialogInfoRoomComponent', () => {
  let component: DialogInfoRoomComponent;
  let fixture: ComponentFixture<DialogInfoRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogInfoRoomComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogInfoRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
