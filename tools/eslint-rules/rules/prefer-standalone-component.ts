import { ASTUtils, AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { getDecoratorPropertyValue } from '../utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/prefer-standalone-component"
export const RULE_NAME = 'prefer-standalone-component';
export type MessageIds = 'standaloneComp';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'suggestion',
    docs: {
      description: `This will warn if a component is not using the standalone: true option.`,
      recommended: 'warn',
    },
    hasSuggestions: true,
    schema: [],
    messages: {
      ['standaloneComp']: 'Prefer standalone Angular components.',
      ['addStandalone']: 'Add standalone: true to the @Component decorator',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ['ClassDeclaration > Decorator[expression.callee.name="Component"]'](node: TSESTree.Decorator) {
        const standaloneSelector = getDecoratorPropertyValue(node, 'standalone');
        if (standaloneSelector) return;
        if (!standaloneSelector) {
          context.report({
            node: node,
            messageId: 'standaloneComp',
            suggest: [
              {
                messageId: 'addStandalone',
                fix: (fixer) => {
                  const selectorNode = getDecoratorPropertyValue(node, 'selector');
                  return [fixer.insertTextAfter(selectorNode, ', standalone: true')];
                },
              },
            ],
          });
        }
      },
    };
  },
});
