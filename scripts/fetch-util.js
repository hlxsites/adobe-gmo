const fetchCache = {};

/**
 * Fetches a URL and returns the response as JSON or text
 * @param {*} url - URL to fetch
 * @param {*} options - fetch options
 * @param {*} failOverURL - URL to fetch if the first one fails
 * @returns - response as JSON or text
 */
async function fetchWithErrorHandling(url, options, failOverURL) {
  if (!url) throw new Error('url is required');
  let finalResponse;
  try {
    const processResponse = async (resp) => {
      if (resp.ok) {
        const contentType = resp.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return resp.json();
        }
        return resp.text();
      }
      return undefined;
    };
    let resp = await fetch(url, options);
    finalResponse = await processResponse(resp);
    if (finalResponse === undefined && failOverURL !== undefined) {
      resp = await fetch(failOverURL, options);
      finalResponse = await processResponse(resp);
      if (finalResponse === undefined) {
        throw new Error(`Error fetching ${failOverURL}: ${resp.status} ${resp.statusText}`);
      }
    }
    if (finalResponse !== undefined) {
      return finalResponse;
    }
  } catch (error) {
    throw new Error(`Error fetching: ${error}`);
  }
  return undefined;
}

/**
 * Fetches a URL and returns the response as JSON or text
 * @param {*} url - URL to fetch
 * @param {*} options - fetch options
 * @param {*} failOverURL - URL to fetch if the first one fails
 * @returns - response as JSON or text
 */
// eslint-disable-next-line import/prefer-default-export
export async function fetchCached(url, options, failOverURL) {
  const cacheKey = JSON.stringify(
    {
      url,
      options,
    },
  );
  if (fetchCache[cacheKey] !== undefined) {
    return fetchCache[cacheKey];
  }

  fetchCache[cacheKey] = fetchWithErrorHandling(url, options, failOverURL);
  fetchCache[cacheKey] = await fetchCache[cacheKey];
  return fetchCache[cacheKey];
}
