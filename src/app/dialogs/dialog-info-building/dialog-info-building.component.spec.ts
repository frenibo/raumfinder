import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogInfoBuildingComponent } from './dialog-info-building.component';

describe('DialogInfoBuildingComponent', () => {
  let component: DialogInfoBuildingComponent;
  let fixture: ComponentFixture<DialogInfoBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogInfoBuildingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogInfoBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
