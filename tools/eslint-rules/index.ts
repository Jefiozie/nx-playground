import {
  RULE_NAME as preferStandaloneComponentName,
  rule as preferStandaloneComponent,
} from './rules/prefer-standalone-component';
import { RULE_NAME as enforceInjectMaxName, rule as enforceInjectMax } from './rules/enforce-inject-max';
import { RULE_NAME as enforceDiMaxName, rule as enforceDiMax } from './rules/enforce-constructor-di-max';
import { RULE_NAME as enforceOutputMaxName, rule as enforceOutputMax } from './rules/enforce-output-max';
import { RULE_NAME as enforceInputMaxName, rule as enforceInputMax } from './rules/enforce-input-max';
/**
 * Import your custom workspace rules at the top of this file.
 *
 * For example:
 *
 * import { RULE_NAME as myCustomRuleName, rule as myCustomRule } from './rules/my-custom-rule';
 *
 * In order to quickly get started with writing rules you can use the
 * following generator command and provide your desired rule name:
 *
 * ```sh
 * npx nx g @nrwl/linter:workspace-rule {{ NEW_RULE_NAME }}
 * ```
 */

module.exports = {
  /**
   * Apply the imported custom rules here.
   *
   * For example (using the example import above):
   *
   * rules: {
   *  [myCustomRuleName]: myCustomRule
   * }
   */
  rules: {
    [enforceInputMaxName]: enforceInputMax,
    [enforceOutputMaxName]: enforceOutputMax,
    [enforceDiMaxName]: enforceDiMax,
    [enforceInjectMaxName]: enforceInjectMax,
    [preferStandaloneComponentName]: preferStandaloneComponent,
  },
};
