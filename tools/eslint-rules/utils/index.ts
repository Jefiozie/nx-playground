import { ASTUtils, AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils';

export function isCallExpression(node: TSESTree.Node): node is TSESTree.CallExpression {
  return node.type === AST_NODE_TYPES.CallExpression;
}

export const getDecoratorArgument = ({ expression }: TSESTree.Decorator): TSESTree.ObjectExpression | undefined => {
  if (!isCallExpression(expression) || expression.arguments.length === 0) {
    return undefined;
  }
  const [arg] = expression.arguments;
  return isObjectExpression(arg) && arg.properties ? arg : undefined;
};
export function isObjectExpression(node: TSESTree.Node): node is TSESTree.ObjectExpression {
  return node.type === AST_NODE_TYPES.ObjectExpression;
}

export const getDecoratorProperty = (decorator: TSESTree.Decorator, name: string): TSESTree.Property | undefined => {
  return getDecoratorArgument(decorator)
    ?.properties.filter(isProperty)
    .find(({ key }) => ASTUtils.isIdentifier(key) && key.name === name);
};

export const getDecoratorPropertyValue = (
  decorator: TSESTree.Decorator,
  name: string,
): TSESTree.Property['value'] | undefined => {
  return getDecoratorProperty(decorator, name)?.value;
};

export function isProperty(node: TSESTree.Node): node is TSESTree.Property {
  return node.type === AST_NODE_TYPES.Property;
}
