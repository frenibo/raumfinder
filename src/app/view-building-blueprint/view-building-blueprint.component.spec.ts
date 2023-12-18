import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBuildingBlueprintComponent } from './view-building-blueprint.component';

describe('ViewBuildingBlueprintComponent', () => {
  let component: ViewBuildingBlueprintComponent;
  let fixture: ComponentFixture<ViewBuildingBlueprintComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewBuildingBlueprintComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewBuildingBlueprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
