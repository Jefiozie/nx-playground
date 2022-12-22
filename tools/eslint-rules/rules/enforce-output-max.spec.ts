import { TSESLint } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './enforce-output-max';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});
const messageId: MessageIds = 'enforceOutputMax';
ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Output() label: string;
      }`,
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Output() label: string;
        @Output() label: string;
        @Output() label: string;
        @Output() label: string;
        @Output() label: string;
      }`,
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Output() label: string;
        @Output() label: string;
        @Output() label: string;
        @Output() label: string;
      }`,
      options: [{ maxOutputs: 4 }],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
      }`,
      options: [{ maxOutputs: 0 }],
    },
  ],
  invalid: [
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Output() a: string;
        @Output() b: string;
        @Output() c: string;
        @Output() d: string;
        @Output() e: string;
        @Output() f: string;
        @Output() g: string;
        @Output() h: string;
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
        @Output() a: string;
        @Output() a: string;
      }`,
      errors: [
        { messageId, line: 4, column: 9 },
        { messageId, line: 5, column: 9 },
      ],
      options: [{ maxOutputs: 1 }],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Output()
          a: string;
        @Output()
        b: string;
      }`,
      errors: [
        { messageId, line: 4, column: 9 },
        { messageId, line: 6, column: 9 },
      ],
      options: [{ maxOutputs: 1 }],
    },
    {
      code: `
      @Component()
      export class UserProfileComponent {
        @Output()
        set b(value: string) {
          this._b = value;
        }
        get b(): string {
          return this._b;
        }
        @Output()
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
      options: [{ maxOutputs: 1 }],
    },
  ],
});
