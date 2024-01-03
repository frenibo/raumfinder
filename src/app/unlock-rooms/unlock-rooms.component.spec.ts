import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockRoomsComponent } from './unlock-rooms.component';

describe('UnlockRoomsComponent', () => {
  let component: UnlockRoomsComponent;
  let fixture: ComponentFixture<UnlockRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnlockRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnlockRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
