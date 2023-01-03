import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { Lib0parentComponent } from '@nx-playground/app2/lib0/lib0';
import { Lib1parentComponent } from '@nx-playground/app2/lib1/lib1';
import { Lib2parentComponent } from '@nx-playground/app2/lib2/lib2';
import { Lib3parentComponent } from '@nx-playground/app2/lib3/lib3';
import { Lib4parentComponent } from '@nx-playground/app2/lib4/lib4';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    Lib0parentComponent,
    Lib1parentComponent,
    Lib2parentComponent,
    Lib3parentComponent,
    Lib4parentComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
