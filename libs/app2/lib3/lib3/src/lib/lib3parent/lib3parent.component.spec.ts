import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lib3parentComponent } from './lib3parent.component';

describe('Lib3parentComponent', () => {
  let component: Lib3parentComponent;
  let fixture: ComponentFixture<Lib3parentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lib3parentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Lib3parentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
