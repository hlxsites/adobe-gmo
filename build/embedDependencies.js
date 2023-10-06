const fs = require('fs');
// eslint-disable-next-line import/extensions
const packageJson = require('../package.json');

fs.readFile('head.html', 'utf8', (err, data) => {
  if (err) {
    return console.log(err);
  }

  let tags = '<!-- Generated code -->\n';
  const addHTML = (destinationPath, filename) => {
    if (filename.endsWith('.css')) {
      tags += `<link rel="stylesheet" href="/${destinationPath}${filename}">\n`;
    } else if (filename.endsWith('.js')) {
      tags += `<script src="/${destinationPath}${filename}" defer></script>\n`;
    }
  };
  packageJson.copyDependencies.forEach((dependency) => {
    const filename = dependency.fileInclude;
    if (Array.isArray(filename)) {
      filename.forEach((file) => {
        addHTML(dependency.to, file);
      });
    } else {
      addHTML(dependency.to, filename);
    }
  });
  tags += '<!-- End of Generated code -->';

  const startTag = '<!-- Generated code -->';
  const endTag = '<!-- End of Generated code -->';
  const startTagIndex = data.indexOf(startTag);
  const endTagIndex = data.indexOf(endTag);

  let result;
  if (startTagIndex !== -1 && endTagIndex !== -1) {
    // If the start and end tags are found, replace the existing generated code
    // avoid adding an extra newline char
    result = `${data.substring(0, startTagIndex)}${tags}${data.substring(endTagIndex + endTag.length)}`;
  } else {
    // If the start and end tags are not found, insert the generated code at the specified location
    result = data.replace('<!-- scripts will be inserted here -->', tags);
  }

  fs.writeFile('head.html', result, 'utf8', (errr) => {
    if (err) return console.log(errr);
    return console.log('The file was saved!');
  });
  return true;
});
