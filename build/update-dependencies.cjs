/* eslint-disable no-console */

const packageJson = require('../package.json');
const { execSync } = require('child_process');
const { readFileSync, rmSync} = require('fs');

for (const dependency of packageJson.copyDependencies) {
  console.log('deleting', dependency.to)
  rmSync(dependency.to, { recursive: true, force: true });
}

console.log('building webpack...')
console.log(execSync('webpack --mode production').toString());
console.log(execSync('node build/buildDependencies.cjs').toString());
