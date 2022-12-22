import { TSESLint } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './enforce-input-max';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
const messageId: MessageIds = 'enforceInputMax';
ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input() label: string;
      }`,
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input() label: string;
        @Input() label: string;
        @Input() label: string;
        @Input() label: string;
        @Input() label: string;
      }`,
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input() label: string;
        @Input() label: string;
        @Input() label: string;
        @Input() label: string;
      }`,
      options: [{ maxInputs: 4 }],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
      }`,
      options: [{ maxInputs: 0 }],
    },
  ],
  invalid: [
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input() a: string;
        @Input() b: string;
        @Input() c: string;
        @Input() d: string;
        @Input() e: string;
        @Input() f: string;
        @Input() g: string;
        @Input() h: string;
      }`,
      errors: [
        { messageId, line: 4, column: 9 },
        { messageId, line: 5, column: 9 },
        { messageId, line: 6, column: 9 },
        { messageId, line: 7, column: 9 },
        { messageId, line: 8, column: 9 },
        { messageId, line: 9, column: 9 },
        { messageId, line: 10, column: 9 },
        { messageId, line: 11, column: 9 },
      ],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input() a: string;
        @Input() a: string;
      }`,
      errors: [
        { messageId, line: 4, column: 9 },
        { messageId, line: 5, column: 9 },
      ],
      options: [{ maxInputs: 1 }],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input()
          a: string;
        @Input()
        b: string;
      }`,
      errors: [
        { messageId, line: 4, column: 9 },
        { messageId, line: 6, column: 9 },
      ],
      options: [{ maxInputs: 1 }],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Input()
        set b(value: string) {
          this._b = value;
        }
        get b(): string {
          return this._b;
        }
        @Input()
        set a(value: string) {
          this._a = value;
        }
        get a(): string {
          return this._a;
        }
      }`,
      errors: [
        { messageId, line: 4, column: 9 },
        { messageId, line: 11, column: 9 },
      ],
      options: [{ maxInputs: 1 }],
    },
  ],
});
