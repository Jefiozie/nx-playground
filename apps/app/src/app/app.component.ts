import { ChangeDetectorRef, Component, inject, Inject, Injector, Input, NgZone, Output } from '@angular/core';

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
  // @Input() input6!: string;

  @Output() output1!: string;
  @Output() output2!: string;
  @Output() output3!: string;
  @Output() output4!: string;
  @Output() output5!: string;
  // @Output() output6!: string;

  #prop1 = inject(ChangeDetectorRef);
  prop2 = inject(ChangeDetectorRef);
  private prop3 = inject(ChangeDetectorRef);
  prop4 = inject(ChangeDetectorRef);
  #prop5 = inject(ChangeDetectorRef);
  // #prop6 = inject(ChangeDetectorRef);

  constructor(
    private readonly injector: Injector,
    private readonly zone: NgZone,
    private readonly ref: ChangeDetectorRef,
    @Inject('test') private readonly test: string,
    @Inject('test2') private readonly test2: string,
  ) // @Inject('test3') private readonly test3: string
  {}
}
