import { libraryGenerator } from '@nrwl/angular/generators';
import { getWorkspaceLayout, names, readProjectConfiguration, Tree, updateProjectConfiguration } from '@nrwl/devkit';
import { AngularLibGeneratorSchema, libTypes } from './schema';

export interface NormalizedSchema extends AngularLibGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
}

function normalizeOptions(tree: Tree, options: AngularLibGeneratorSchema): NormalizedSchema {
  const name = names(options.name).fileName;
  options.directory = `${options.scope}/${options.domain}/${options.type}`;
  const projectDirectory = options.directory ? `${names(options.directory).fileName}/${name}` : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const defaultTags = `scope:${options.scope},domain:${options.domain},type:${options.type}`;
  const tags = options.tags ? `${options.tags},${defaultTags}` : defaultTags;
  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    tags,
  };
}
const ALL_TYPES: Array<Exclude<libTypes, 'all'>> = ['feature', 'ui', 'util', 'data-access'];

export async function generator(tree: Tree, options: AngularLibGeneratorSchema) {
  if (options.type === 'all') {
    for (const type of ALL_TYPES) {
      const normalizedOptions = normalizeOptions(tree, { ...options, type });
      const libOptions = {
        ...normalizedOptions,
        type,
      };
      await generateLibrary(tree, libOptions);
      await updateLintTarget(tree, libOptions);
    }
  } else {
    const normalizedOptions = normalizeOptions(tree, options);
    await generateLibrary(tree, normalizedOptions);
    await updateLintTarget(tree, normalizedOptions);
  }
}

async function generateLibrary(tree, options: NormalizedSchema) {
  options.directory = `${options.scope}/${options.domain}/${options.type}`;
  await libraryGenerator(tree, options);
}

async function updateLintTarget(tree: Tree, options: NormalizedSchema) {
  const project = readProjectConfiguration(tree, options.projectName);
  project.targets.lint = {
    ...project.targets.lint,
    configurations: {
      ...project.targets.lint.configurations,
      ci: { outputFile: `dist/lint/${options.projectDirectory}/report.json`, format: 'json' },
    },
  };
  updateProjectConfiguration(tree, options.projectName, project);
}
export default generator;
