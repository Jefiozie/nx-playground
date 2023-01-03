import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lib1parentComponent } from './lib1parent.component';

describe('Lib1parentComponent', () => {
  let component: Lib1parentComponent;
  let fixture: ComponentFixture<Lib1parentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lib1parentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Lib1parentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
