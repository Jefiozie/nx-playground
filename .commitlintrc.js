const {
  utils: { getProjects },
} = require('@commitlint/config-nx-scopes');
console.error(
  ...(await getProjects(ctx, ({ name, projectType }) => !name.includes('e2e') && projectType == 'application')),
);
module.exports = {
  extends: ['@commitlint/config-conventional', '@commitlint/config-nx-scopes'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [...(await getProjects(ctx, ({ name, projectType }) => !name.includes('e2e') && projectType == 'application'))],
    ],
  },
};
