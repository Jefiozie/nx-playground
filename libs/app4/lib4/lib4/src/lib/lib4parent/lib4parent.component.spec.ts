import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lib4parentComponent } from './lib4parent.component';

describe('Lib4parentComponent', () => {
  let component: Lib4parentComponent;
  let fixture: ComponentFixture<Lib4parentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lib4parentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Lib4parentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
