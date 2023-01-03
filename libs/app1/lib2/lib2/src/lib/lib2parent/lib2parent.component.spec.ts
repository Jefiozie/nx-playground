import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lib2parentComponent } from './lib2parent.component';

describe('Lib2parentComponent', () => {
  let component: Lib2parentComponent;
  let fixture: ComponentFixture<Lib2parentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lib2parentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Lib2parentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
