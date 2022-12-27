export type libTypes = 'feature' | 'ui' | 'util' | 'data-access' | 'all';
export type libScopes = 'company1' | 'company2' | 'company3' | 'shared';
export type domains = 'domain1' | 'domain2' | 'domain3' | 'domain4';
export interface AngularLibGeneratorSchema {
  name: string;
  tags?: string;
  directory?: string;
  importPath?: string;
  domain?: domains;
  scope: libScopes;
  type: libTypes;
}
