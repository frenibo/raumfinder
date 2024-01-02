import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFreeRoomsComponent } from './list-free-rooms.component';

describe('ListFreeRoomsComponent', () => {
  let component: ListFreeRoomsComponent;
  let fixture: ComponentFixture<ListFreeRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListFreeRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListFreeRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
