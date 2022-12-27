import { readProjectConfiguration, Tree } from '@nrwl/devkit';
import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';

import { generator } from './generator';
import { AngularLibGeneratorSchema } from './schema';

describe('Angular Library generator', () => {
  let appTree: Tree;
  const appProjectName = 'company1-domain1-feature-test';
  const options: AngularLibGeneratorSchema = {
    name: 'test',
    type: 'feature',
    domain: 'domain1',
    scope: 'company1',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, appProjectName);
    expect(config).toBeDefined();
  });
  it('should run successfully with type all flag', async () => {
    await generator(appTree, { ...options, type: 'all' });
    const ALL_TYPES = ['feature', 'ui', 'util', 'data-access'];
    for (const type of ALL_TYPES) {
      const projectname = `company1-domain1-${type}-test`;
      const config = readProjectConfiguration(appTree, projectname);
      expect(config).toBeDefined();
    }
  });
  it('should run have default tags', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, appProjectName);
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['scope:company1', 'domain:domain1', 'type:feature']);
  });

  it('should run and have extra tags', async () => {
    const extraTagOptions = { ...options, tags: 'team:a, team:company1' };
    await generator(appTree, extraTagOptions);
    const config = readProjectConfiguration(appTree, appProjectName);
    expect(config).toBeDefined();
    expect(config.tags).toEqual(['team:a', 'team:company1', 'scope:company1', 'domain:domain1', 'type:feature']);
  });

  it('should update the eslint rules', async () => {
    await generator(appTree, options);
    const project = readProjectConfiguration(appTree, appProjectName);
    expect(project.targets.lint).toEqual({
      ...project.targets.lint,
      configurations: {
        ...project.targets.lint.configurations,
        ci: {
          format: 'json',
          outputFile: 'dist/lint/company1/domain1/feature/test/report.json',
        },
      },
    });
  });
});
