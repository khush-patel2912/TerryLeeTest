import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGridDataComponent } from './add-edit-grid-data.component';

describe('AddEditGridDataComponent', () => {
  let component: AddEditGridDataComponent;
  let fixture: ComponentFixture<AddEditGridDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGridDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGridDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
