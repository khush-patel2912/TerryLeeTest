import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HipaaListComponent } from './hipaa-list.component';

describe('HipaaListComponent', () => {
  let component: HipaaListComponent;
  let fixture: ComponentFixture<HipaaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HipaaListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HipaaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
