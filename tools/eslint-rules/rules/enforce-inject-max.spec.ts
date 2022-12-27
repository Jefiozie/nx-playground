import { TSESLint } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './enforce-inject-max';
const messageId: MessageIds = 'enforceInjectMax';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [`const example = true;`],
  invalid: [
    {
      code: `
      @Component()
      export class AppComponent {
        prop1 = inject(ChangeDetectorRef);
        prop2 = inject(ChangeDetectorRef);
        prop3 = inject(ChangeDetectorRef);
        prop4 = inject(ChangeDetectorRef);
        prop5 = inject(ChangeDetectorRef);
        prop6 = inject(ChangeDetectorRef);
      }
`,
      errors: [
        {
          messageId,
          line: 4,
          column: 9,
        },
        {
          messageId,
          line: 5,
          column: 9,
        },
        {
          messageId,
          line: 6,
          column: 9,
        },
        {
          messageId,
          line: 7,
          column: 9,
        },
        {
          messageId,
          line: 8,
          column: 9,
        },
        {
          messageId,
          line: 9,
          column: 9,
        },
      ],
    },
    {
      code: `
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

        #prop1 = inject(ChangeDetectorRef);
        prop2 = inject(ChangeDetectorRef);
        private prop3 = inject(ChangeDetectorRef);
        prop4 = inject(ChangeDetectorRef);
        #prop5 = inject(ChangeDetectorRef);
        #prop6 = inject(ChangeDetectorRef);

        constructor(
          private readonly injector: Injector,
          private readonly zone: NgZone,
          private readonly ref: ChangeDetectorRef,
          @Inject('test') private readonly test: string,
          @Inject('test2') private readonly test2: string,
          @Inject('test3') private readonly test3: string
        ) {}
      }
`,
      errors: [
        {
          messageId,
          line: 22,
          column: 9,
        },
        {
          messageId,

          line: 23,
          column: 9,
        },
        {
          messageId,
          line: 24,
          column: 9,
        },
        {
          messageId,
          line: 25,
          column: 9,
        },
        {
          messageId,
          line: 26,
          column: 9,
        },
        {
          messageId,
          line: 27,
          column: 9,
        },
      ],
    },
  ],
});
