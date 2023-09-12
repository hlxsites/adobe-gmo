const configCache = {};

/**
 * Gets base path for config files
 * If it is a /drafts/{branch} path, it will return /drafts/{branch}
 * Otherwise, it will return the code base path.
 * @returns {string} Base path for config files
 */
function getBaseConfigPath() {
  if (window.location.pathname.startsWith('/drafts/')) {
    const contentBranch = window.location.pathname.split('/')[2];
    return `/drafts/${contentBranch}`;
  }

  return window.hlx.codeBasePath;
}

async function fetchConfig(filename) {
  if (!filename) throw new Error('filename is required');
  let jsonResponse;
  try {
    const json = async (resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return undefined;
    };
    let resp = await fetch(`${getBaseConfigPath()}/${filename}`);
    jsonResponse = await json(resp);
    if (jsonResponse === undefined) {
      resp = await fetch(`${window.hlx.codeBasePath}/${filename}`);
      jsonResponse = await json(resp);
      if (jsonResponse === undefined) {
        throw new Error(`${resp.status}: ${resp.statusText}`);
      }
    }
    if (jsonResponse !== undefined) {
      return jsonResponse;
    }
  } catch (error) {
    throw new Error(`Error fetching ${filename}: ${error}`);
  }
  return undefined;
}

async function getConfig(filename, configCacheKey) {
  if (configCache[configCacheKey] !== undefined) {
    return configCache[configCacheKey];
  }

  configCache[configCacheKey] = fetchConfig(filename);
  configCache[configCacheKey] = await configCache[configCacheKey];
  return configCache[configCacheKey];
}

/**
 * Get configuration by file name and worksheet ID.
 * @param {*} fileName Name of the configuration file (JSON)
 * @param {*} worksheetId Worksheet ID
 * @returns 
 */
export async function fetchConfigSheet(fileName, worksheetId) {
  const config = await getConfig(`${fileName}?sheet=${worksheetId}`, `${fileName}:${worksheetId}`);
  return config.data;
}

/**
 * Gets site config object from /site-config.json
 */
export async function fetchSiteConfig(worksheetId) {
  const config = await getConfig('site-config.json', 'globalSiteConfig');
  return config[worksheetId]?.data;
}

/**
 * Gets user submitted configurations object from /configurations.json
 * @returns {object} Window site configurations object
 */
export async function fetchUserDefinedConfig() {
  const configs = await getConfig('configurations.json', 'userDefinedSiteConfigs');
  return configs.data[0];
}
