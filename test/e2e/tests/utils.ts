export function getMainPageUrl(subpath: string = '') {
  const shellSource = process.env.SHELL_SOURCE || 'stage';

  if(shellSource === 'stage') {
    return `https://experience-stage.adobe.com/?shell_ims=prod#/@skylineprodtest017/contenthub/${subpath}`;
  } else {
    return `https://experience-qa.adobe.com/?shell_ims=prod&shell_source=${shellSource}#/@skylineprodtest017/contenthub/${subpath}`;
  }

}
