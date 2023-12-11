const fs = require('fs');
// eslint-disable-next-line import/extensions
const packageJson = require('../package.json');

fs.readFile('scripts/dependencies.json', 'utf8', (err) => {
  // verify file was loaded.
  if (err) {
    // eslint-disable-next-line no-console
    return console.log(err);
  }

  // initialize dependencies object
  const dependencies = [];

  const removeTrailingSlash = (string) => string.replace(/\/$/, '');

  const removeLeadingSlash = (string) => string.replace(/^\//, '');

  // eslint-disable-next-line max-len
  const createURL = (path, filename, isRootPath) => `${(isRootPath) ? '/' : ''}${removeTrailingSlash(path)}/${removeLeadingSlash(filename)}`;

  // function to add dependencies to the dependencies object
  const addDependency = (category, url, attrs) => {
    const filename = url.split('/')?.pop();
    if (filename?.endsWith('.css')) {
      dependencies.push({
        type: 'css',
        href: url,
        attrs,
      });
    } else if (filename?.endsWith('.js')) {
      dependencies.push({
        category,
        type: 'js',
        src: url,
        attrs,
      });
    }
  };

  // loop through the dependencies and add them to the dependencies object
  packageJson.copyDependencies.forEach((dependency) => {
    const { to, fileIncludes } = dependency;
    if (Array.isArray(fileIncludes)) {
      fileIncludes.forEach((fileInclude) => {
        const url = createURL(to, fileInclude.file, true);
        addDependency(fileInclude.category, url, fileInclude.attributes);
      });
    } else if (typeof fileIncludes === 'object') {
      const url = createURL(to, fileIncludes.file, true);
      addDependency(fileIncludes.category, url, fileIncludes.attributes);
    } else if (typeof fileIncludes === 'string') {
      const url = createURL(to, fileIncludes, true);
      addDependency(undefined, url);
    }
  });

  packageJson.externalDependencies.forEach((dependency) => {
    const { name, url, attributes } = dependency;
    addDependency(name, url, attributes, true);
  });

  // write the dependencies object to the dependencies.json file
  fs.writeFile('scripts/dependencies.json', JSON.stringify(dependencies), 'utf8', (errr) => {
    // eslint-disable-next-line no-console
    if (err) return console.log(errr);
    // eslint-disable-next-line no-console
    return console.log('Successfully updated scripts/dependencies.json');
  });

  return true;
});
