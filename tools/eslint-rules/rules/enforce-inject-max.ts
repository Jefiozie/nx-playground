import {
  ESLintUtils,
  TSESTree,
  AST_NODE_TYPES,
} from '@typescript-eslint/utils';
// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/enforce-inject-max"
export const RULE_NAME = 'enforce-inject-max';
export type MessageIds = 'enforceInjectMax';
const CALLEE_NAME = 'inject';
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
      enforceInjectMax: `This component has too many dependencies injected. Maximum allowed: {{maxDI}}`,
    },
  },
  defaultOptions: [{ maxDI: 5 }],
  create(context, [{ maxDI }]) {
    return {
      ClassBody(node: TSESTree.ClassBody): void {
        const nodes = node.body.filter(
          (node) =>
            node.type === AST_NODE_TYPES.PropertyDefinition &&
            node.value &&
            node.value.type === AST_NODE_TYPES.CallExpression &&
            node.value.callee.type === AST_NODE_TYPES.Identifier &&
            node.value.callee.name === CALLEE_NAME
        );
        if (nodes.length > maxDI) {
          nodes.forEach((node) => {
            context.report({
              messageId: 'enforceInjectMax',
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
