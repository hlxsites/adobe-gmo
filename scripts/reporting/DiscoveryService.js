const REPOSITORY_ID_KEY = 'repo:repositoryId';
const VALID_REPO_DATE = new Date('2021-04-01T00:00:00.000Z');

/**
 * Get initial discovery object (entry point)
 * @param {string} bearerToken - the bearer token
 * @return {object} response JSON of discovery
 * @public
 */
// eslint-disable-next-line import/prefer-default-export
export async function getDiscovery(bearerToken) {
  // eslint-disable-next-line no-useless-catch
  try {
    const url = 'https://aem-discovery.adobe.io/';
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'content-at-adobe',
        Authorization: bearerToken,
      },
    };
    let discoverableAssetsResponse;
    const response = await fetch(url, options);
    if (response.status === 200) {
      const json = await response.json();
      // eslint-disable-next-line no-underscore-dangle
      const indexJsonLink = json?.children?.find((child) => child['repo:name'] === 'Index.json')
        ?._links['http://ns.adobe.com/adobecloud/rel/primary']?.href;

      if (indexJsonLink) {
        discoverableAssetsResponse = await fetch(
          indexJsonLink,
          options,
        );
      }
      if (discoverableAssetsResponse?.status === 200) {
        return await discoverableAssetsResponse.json();
      }
    }
    // Handle other response codes
    throw new Error(`Failed to make discovery call: ${response.status} ${response.statusText}`);
  } catch (error) {
    throw error;
  }
}

// For older orgs, we still have to filter via date
const REPOSITORY_FILTERS = (filteredOnlyAuthor) => [
  (repoLink, repoMetadataLink) => (
    new Date(repoMetadataLink['repo:modifyDate'] || repoMetadataLink['repo:createDate'])
      > VALID_REPO_DATE
  ),
  (repoLink, repoMetadataLink, orgId) => {
    if (!orgId) {
      return true;
    }
    return repoLink['repo:owner']?.id === orgId;
  },
  filteredOnlyAuthor ? (repoLink) => repoLink['aem:tier'] === 'author' : () => true,
];

// eslint-disable-next-line no-underscore-dangle
const getRepoLink = (repo) => repo._embedded?.['http://ns.adobe.com/adobecloud/rel/repository'];

// eslint-disable-next-line no-underscore-dangle
const getRepoMetadataLink = (repo) => repo._embedded?.['http://ns.adobe.com/adobecloud/rel/metadata/repository'];

const getRepoId = (repo) => getRepoLink(repo)?.[REPOSITORY_ID_KEY];

/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @returns {Object[]} the list of valid 'author' repository objects, filtered from the discovery response.
 * Use getAllRepoList to get all valid repository objects of all aemTierType.
 */
const getRepoList = (discoveryResponse, orgId) => {
  const children = discoveryResponse?.children ? discoveryResponse.children : [];

  return children.filter((repo) => REPOSITORY_FILTERS(true).every(
    (filter) => Boolean(getRepoLink(repo))
        && Boolean(getRepoMetadataLink(repo))
        && filter(getRepoLink(repo), getRepoMetadataLink(repo), orgId),
  ));
};

/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @param preferredRepoId {String} the repo ID to validate and use as default selection
 * @returns {Object} the first valid repo ID from the repo list or undefined in case no valid repo was found
 */
export const getDefaultSelectedRepo = (discoveryResponse, orgId, preferredRepoId) => {
  const repoList = getRepoList(discoveryResponse, orgId);
  if (preferredRepoId) {
    const repoMatchingStoredRepoId = repoList.filter(
      (repo) => getRepoLink(repo)?.[REPOSITORY_ID_KEY] === preferredRepoId,
    );
    if (repoMatchingStoredRepoId.length > 0) {
      return repoMatchingStoredRepoId[0] && getRepoId(repoMatchingStoredRepoId[0]);
    }
  }

  const filteredByPreferredEnv = repoList.filter((repo) => {
    const repoLink = getRepoLink(repo);
    return repoLink && repoLink['repo:environment'] === 'prod' && !repoLink['aem:sandbox'];
  });
  if (filteredByPreferredEnv.length > 0) {
    return filteredByPreferredEnv[0] && getRepoId(filteredByPreferredEnv[0]);
  }

  return repoList[0] && getRepoId(repoList[0]);
};
