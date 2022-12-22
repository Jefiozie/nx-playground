import { Component, Input, Output } from '@angular/core';

@Component({
  selector: 'nx-playground-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'app';
  @Input() input1!: string;
  @Input() input2!: string;
  @Input() input3!: string;
  @Input() input4!: string;
  @Input() input5!: string;

  @Output() output1!: string;
  @Output() output2!: string;
  @Output() output3!: string;
  @Output() output4!: string;
  @Output() output5!: string;
  @Output() output6!: string;
}
