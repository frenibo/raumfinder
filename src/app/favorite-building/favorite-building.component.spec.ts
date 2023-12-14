import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteBuildingComponent } from './favorite-building.component';

describe('FavoriteBuildingComponent', () => {
  let component: FavoriteBuildingComponent;
  let fixture: ComponentFixture<FavoriteBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoriteBuildingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FavoriteBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
