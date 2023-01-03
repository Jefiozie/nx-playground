import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nx-playground-lib0parent',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lib0parent.component.html',
  styleUrls: ['./lib0parent.component.css'],
})
export class Lib0parentComponent {
  @Input() abc!: string;
}
