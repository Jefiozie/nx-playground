import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/enforce-constructor-di-max"
export const RULE_NAME = 'enforce-constructor-di-max';
export type MessageIds = 'enforceConstructorDIMax';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: `A component should have not more then 5 dependencies injected.`,
      recommended: 'warn',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxDI: {
            type: 'number',
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      enforceConstructorDIMax: `This component has too many dependencies injected. Maximum allowed: {{maxDI}}`,
    },
  },
  defaultOptions: [{ maxDI: 5 }],
  create(context, [{ maxDI }]) {
    return {
      'ClassDeclaration MethodDefinition[key.name="constructor"] FunctionExpression'(
        node: TSESTree.FunctionExpression
      ): void {
        if (node.params.length > maxDI) {
          node.params.forEach((node) => {
            context.report({
              messageId: 'enforceConstructorDIMax',
              node,
              data: {
                maxDI: maxDI,
              },
            });
          });
        }
      },
    };
  },
});
