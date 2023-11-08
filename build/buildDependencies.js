const fs = require('fs');
// eslint-disable-next-line import/extensions
const packageJson = require('../package.json');

fs.readFile('scripts/dependencies.json', 'utf8', (err, data) => {
  // verify file was loaded.
  if (err) {
    return console.log(err);
  }

  // initialize dependencies object
  const dependencies = [];

  // function to add dependencies to the dependencies object
  const addDependency = (destinationPath, filename) => {
    if (filename.endsWith('.css')) {
      dependencies.push({
        type: 'css',
        href: `/${destinationPath}${filename}`,
      });
    } else if (filename.endsWith('.js')) {
      dependencies.push({
        type: 'js',
        src: `/${destinationPath}${filename}`,
        attrs: ['defer'],
      });
    }
  };

  // loop through the dependencies and add them to the dependencies object
  packageJson.copyDependencies.forEach((dependency) => {
    const filename = dependency.fileInclude;
    if (Array.isArray(filename)) {
      filename.forEach((file) => {
        addDependency(dependency.to, file);
      });
    } else {
      addDependency(dependency.to, filename);
    }
  });

  // write the dependencies object to the dependencies.json file
  fs.writeFile('scripts/dependencies.json', JSON.stringify(dependencies), 'utf8', (errr) => {
    if (err) return console.log(errr);
    return console.log('The file was saved!');
  });

  return true;
});
