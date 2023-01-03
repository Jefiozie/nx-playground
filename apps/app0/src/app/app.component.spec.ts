import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { Lib0parentComponent } from '@nx-playground/app0/lib0/lib0';
import { Lib1parentComponent } from '@nx-playground/app0/lib1/lib1';
import { Lib2parentComponent } from '@nx-playground/app0/lib2/lib2';
import { Lib3parentComponent } from '@nx-playground/app0/lib3/lib3';
import { Lib4parentComponent } from '@nx-playground/app0/lib4/lib4';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent, NxWelcomeComponent],
      imports: [
        Lib0parentComponent,
        Lib1parentComponent,
        Lib2parentComponent,
        Lib3parentComponent,
        Lib4parentComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'app0'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('app0');
  });
});
