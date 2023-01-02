import { ASTUtils, AST_NODE_TYPES, ESLintUtils, TSESTree } from '@typescript-eslint/utils';
import { getDecoratorPropertyValue } from '../utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/prefer-standalone-component"
export const RULE_NAME = 'prefer-standalone-component';
export const enum MessageIds {
  PreferInlineStyles = 'prefer-inline-styles',
  PreferInlineTemplate = 'prefer-inline-template',
}
export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [],
    messages: {
      [MessageIds.PreferInlineTemplate]: 'Prefer inline template in Angular components.',
      [MessageIds.PreferInlineStyles]: 'Prefer inline styles in Angular components.',
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      ['ClassDeclaration > Decorator[expression.callee.name="Component"]'](node: TSESTree.Decorator) {
        const styleUrlsSelector = getDecoratorPropertyValue(node, 'styleUrls');
        const templateUrlSelector = getDecoratorPropertyValue(node, 'templateUrl');
        if (!styleUrlsSelector && !templateUrlSelector) {
          return;
        }
        if (styleUrlsSelector) {
          context.report({
            node: styleUrlsSelector,
            messageId: MessageIds.PreferInlineStyles,
          });
        }
        if (templateUrlSelector) {
          context.report({
            node: templateUrlSelector,
            messageId: MessageIds.PreferInlineTemplate,
          });
        }
      },
    };
  },
});
