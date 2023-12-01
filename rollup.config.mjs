import resolve from '@rollup/plugin-node-resolve';
import commonjs from "@rollup/plugin-commonjs";

// https://www.npmjs.com/package/@adobe/exc-app is currently only available as a CommonJS module.
// I created a ticket to have it published as an ES module as well: https://jira.corp.adobe.com/browse/EXC-34144
// Until then, we need to use a workaround to convert CommonJS to ES modules.

export default [
  {
    input: ['build/rollup-entrypoints/exc-app.js'],
    output: {
      dir: 'scripts/libs/exc-app/',
      format: 'esm'
    },
    treeshake: false,
    plugins: [commonjs(), resolve()]
  }
];



