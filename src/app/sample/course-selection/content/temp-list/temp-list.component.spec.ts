import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempListComponent } from './temp-list.component';

describe('TempListComponent', () => {
  let component: TempListComponent;
  let fixture: ComponentFixture<TempListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
