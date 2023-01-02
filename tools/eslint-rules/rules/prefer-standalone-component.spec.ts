import { TSESLint } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './prefer-standalone-component';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `@Component({ selector: 'my-component', template: '<div></div>' }) class MyComponent {}`,
    },
  ],
  invalid: [
    {
      code: `@Component({ selector: 'my-component', styleUrls: ['./something.css'] }) class MyComponent {}`,
      errors: [
        {
          messageId: MessageIds.PreferInlineStyles,
          line: 1,
          column: 51,
        },
      ],
    },
    {
      code: `@Component({ selector: 'my-component', templateUrl: './something.html' }) class MyComponent {}`,
      errors: [
        {
          messageId: MessageIds.PreferInlineTemplate,
          line: 1,
          column: 53,
        },
      ],
    },
    {
      code: `@Component({ selector: 'my-component', templateUrl: './something.html', styleUrls: ['./something.css'] }) class MyComponent {}`,
      errors: [
        {
          messageId: MessageIds.PreferInlineTemplate,
          line: 1,
          column: 53,
        },
        {
          messageId: MessageIds.PreferInlineStyles,
          line: 1,
          column: 84,
        },
      ],
    },
  ],
});
