import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/enforce-input-max"
export const RULE_NAME = 'enforce-input-max';
export type MessageIds = 'enforceInputMax';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'A component should have not more then 5 input decorators.',
      recommended: 'warn',
    },
    messages: {
      enforceInputMax:
        'This component has too many @Input decorators. Maximum allowed: {{maxInputs}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxInputs: {
            type: 'number',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ maxInputs: 5 }],
  create(context, [{ maxInputs }]) {
    return {
      ClassBody(node): void {
        const maximumAllowedInputs = maxInputs;
        const parent = node.parent as
          | TSESTree.ClassDeclaration
          | TSESTree.ClassExpression
          | undefined;

        if (!parent || parent.superClass) {
          return;
        }
        const inputDecorators = node.body.filter((property) => {
          const prop = property as TSESTree.PropertyDefinition;
          if (!prop.decorators) {
            return false;
          }
          const identifier = (
            prop.decorators[0].expression as TSESTree.CallExpression
          ).callee as TSESTree.Identifier;
          return identifier.name === 'Input';
        });

        if (inputDecorators.length > maximumAllowedInputs) {
          inputDecorators.forEach((node) => {
            context.report({
              messageId: 'enforceInputMax',
              node,
              data: {
                maxInputs: maximumAllowedInputs,
              },
            });
          });
        }
      },
    };
  },
});
