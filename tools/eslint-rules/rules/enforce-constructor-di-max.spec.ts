import { TSESLint } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './enforce-constructor-di-max';

const messageId: MessageIds = 'enforceConstructorDIMax';
const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
    @Component({
      selector: 'nx-playground-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
    })
    export class AppComponent {

      constructor(
        private  injector: Injector,
        private  zone: NgZone,
        private  ref: ChangeDetectorRef,
        @Inject('test') private  test: string,
        @Inject('test2') private  test2: string
      ) {}
    }
    	      `,
    },
  ],
  invalid: [
    {
      code: `
    @Component({
      selector: 'nx-playground-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
    })
    export class AppComponent {

      constructor(
        private  injector: Injector,
        private  zone: NgZone,
      ) {}
    }
    `,
      errors: [
        {
          messageId,
          line: 10,
          column: 9,
        },
        {
          messageId,
          line: 11,
          column: 9,
        },
      ],
      options: [{ maxDI: 1 }],
    },
    {
      code: `
    @Component({
      selector: 'nx-playground-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css'],
    })
    export class AppComponent {

      constructor(
        private  injector: Injector,
        private  zone: NgZone,
        private  ref: ChangeDetectorRef,
        @Inject('test') private  test: string,
        @Inject('test2') private  test2: string,
        @Inject('wrong') private  wrong: string
      ) {}
    }
    `,
      errors: [
        {
          messageId,
          line: 10,
          column: 9,
        },
        {
          messageId,
          line: 11,
          column: 9,
        },
        {
          messageId,
          line: 12,
          column: 9,
        },
        {
          messageId,
          line: 13,
          column: 9,
        },
        {
          messageId,
          line: 14,
          column: 9,
        },
        {
          messageId,
          line: 15,
          column: 9,
        },
      ],
    },
  ],
});
