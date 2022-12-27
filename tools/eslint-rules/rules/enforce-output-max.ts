import { ESLintUtils, TSESTree } from '@typescript-eslint/utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/enforce-output-max"
export const RULE_NAME = 'enforce-output-max';
export type MessageIds = 'enforceOutputMax';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: 'A component should have not more then 5 output decorators.',
      recommended: 'warn',
    },
    messages: {
      enforceOutputMax: 'This component has too many @Output decorators. Maximum allowed: {{maxOutputs}}',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maxOutputs: {
            type: 'number',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ maxOutputs: 5 }],
  create(context, [{ maxOutputs }]) {
    const maximumAllowedOutputs = maxOutputs;
    return {
      ClassBody(node): void {
        const parent = node.parent as TSESTree.ClassDeclaration | TSESTree.ClassExpression | undefined;

        if (!parent || parent.superClass) {
          return;
        }
        const inputDecorators = node.body.filter((property) => {
          const prop = property as TSESTree.PropertyDefinition;
          if (!prop.decorators) {
            return false;
          }
          const identifier = (prop.decorators[0].expression as TSESTree.CallExpression).callee as TSESTree.Identifier;
          return identifier.name === 'Output';
        });

        if (inputDecorators.length > maximumAllowedOutputs) {
          inputDecorators.forEach((node) => {
            context.report({
              messageId: 'enforceOutputMax',
              node,
              data: {
                maxOutputs: maximumAllowedOutputs,
              },
            });
          });
        }
      },
    };
  },
});
