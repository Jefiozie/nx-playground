import { TSESLint } from '@typescript-eslint/utils';
import { MessageIds, rule, RULE_NAME } from './prefer-standalone-component';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      code: `@Component({ selector: 'my-component', standalone: true, template: '<div></div>' }) class MyComponent {}`,
    },
  ],
  invalid: [
    {
      code: `@Component({ selector: 'my-component', styleUrls: ['./something.css'] }) class MyComponent {}`,
      errors: [
        {
          messageId: 'standaloneComp',
          line: 1,
          column: 1,
          suggestions: [
            {
              messageId: 'addStandalone',
              output: `@Component({ selector: 'my-component', standalone: true, styleUrls: ['./something.css'] }) class MyComponent {}`,
            },
          ],
        },
      ],
    },
  ],
});
