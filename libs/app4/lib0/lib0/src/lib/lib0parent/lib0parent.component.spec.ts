import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lib0parentComponent } from './lib0parent.component';

describe('Lib0parentComponent', () => {
  let component: Lib0parentComponent;
  let fixture: ComponentFixture<Lib0parentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lib0parentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Lib0parentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
