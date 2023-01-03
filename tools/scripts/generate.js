const cp = require('child_process');
const fs = require('fs');

const INIT_APP_INDEX = 0;
const NUMBER_OF_APPS = 5;
const NUMBER_OF_LIBS = 5;
const NUMBER_OF_CHILD_LIBS = 0;
const NUMBER_OF_COMPONENTS = 10;

function generate() {
  const appNames = [];

  for (let i = INIT_APP_INDEX; i < INIT_APP_INDEX + NUMBER_OF_APPS; ++i) {
    appNames.push(`app${i}`);
  }

  appNames.forEach((appName) => generateApp(appName));
}

function generateApp(appName) {
  cp.execSync(`npx nx g @nrwl/angular:application ${appName} --no-interactive`);
  setTimeout(() => {}, 5);

  const libNames = [];

  for (let i = 0; i < NUMBER_OF_LIBS; ++i) {
    libNames.push(`lib${i}`);
  }

  libNames.forEach((libName) => {
    generateParentLib(appName, libName);
  });

  const selectors = libNames.map((c) => `<nx-playground-${c}parent></nx-playground-${c}parent>`).join('\n');
  fs.writeFileSync(
    `apps/${appName}/src/app/app.component.html`,
    `
    <div>
      ${selectors}
    </div>
  `,
  );

  const imports = libNames
    .map((libName) => `import { ${moduleName(libName)} } from '@nx-playground/${appName}/${libName}/${libName}';`)
    .join('\n');

  const moduleImports = libNames.map((childLibName) => moduleName(childLibName)).join(', ');

  fs.writeFileSync(
    `apps/${appName}/src/app/app.module.ts`,
    `
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

${imports}

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ${moduleImports}],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

`,
  );
}

function generateParentLib(appName, libName) {
  cp.execSync(
    `npx nx g @nrwl/angular:library ${libName} --directory=${appName}/${libName} --simpleModuleName --buildable`,
  );
  setTimeout(() => {}, 5);

  const libNames = [];

  for (let i = 0; i < NUMBER_OF_CHILD_LIBS; ++i) {
    libNames.push(`childlib${i}`);
  }

  libNames.forEach((childLibName) => {
    generateChildLib(appName, libName, childLibName);
  });

  cp.execSync(`npx nx g @nrwl/angular:component ${libName}parent --project=${appName}-${libName}-${libName} --export`);
  setTimeout(() => {}, 5);

  const selectors = libNames
    .map((c) => `<nx-playground-${libName}${c}parent></nx-playground-${libName}${c}parent>`)
    .join('\n');
  fs.writeFileSync(
    `libs/${appName}/${libName}/${libName}/src/lib/${libName}parent/${libName}parent.component.html`,
    `
    <div>
      ${selectors}
    </div>
  `,
  );
}

function generateChildLib(appName, libName, childLibName) {
  cp.execSync(`npx nx g @nrwl/angular:library ${childLibName} --directory=${appName}/${libName} --simpleModuleName`);
  setTimeout(() => {}, 5);

  const componentNames = [];

  for (let i = 0; i < NUMBER_OF_COMPONENTS; ++i) {
    componentNames.push(`${libName}${childLibName}component${i}`);
  }

  componentNames.forEach((componentName) => {
    cp.execSync(`npx nx g @nrwl/angular:component ${componentName}  --project=${appName}-${libName}-${childLibName}`);
  });
  setTimeout(() => {}, 5);

  cp.execSync(
    `npx nx g @nrwl/angular:component ${libName}${childLibName}parent --project=${appName}-${libName}-${childLibName} --export`,
  );
  setTimeout(() => {}, 5);

  const selectors = componentNames.map((c) => `<nx-playground-${c}></nx-playground-${c}>`).join('\n');

  fs.writeFileSync(
    `libs/${appName}/${libName}/${childLibName}/src/lib/${libName}${childLibName}parent/${libName}${childLibName}parent.component.html`,
    `
    <div>
      ${selectors}
    </div>
  `,
  );
}

function moduleName(libName) {
  return libName.charAt(0).toUpperCase() + libName.slice(1) + 'parentComponent';
}

generate();
