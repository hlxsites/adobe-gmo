const fetchCache = {};

/**
 * Fetches a URL and returns the response as JSON or text
 * @param {*} url - URL to fetch
 * @param {*} options - fetch options
 * @param {*} failOverURL - URL to fetch if the first one fails
 * @returns {Object|String} response as JSON or text
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
 * @returns {Object|String} response as JSON or text
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

/**
 * Fetches a URL and returns the response as JSON or text. In case of error retries the fetch
 * @param {*} url - URL to fetch
 * @param {*} options - fetch options
 * @param {*} retryOptions - retry config
 * @returns {Object|String} response as JSON or text
 */
export async function fetchWithRetryAndBackoffOnErrors(url, options, retryOptions) {
  const defaultMaxRetries = 3;
  const defaultBaseDelay = 1000;
  // there will be no retries on non 200 response by default, if retry error codes are not given
  const defaultRetryErrorCodes = [];

  const {
    maxRetries = defaultMaxRetries,
    baseDelay = defaultBaseDelay,
    retryErrorCodes = defaultRetryErrorCodes,
  } = retryOptions || {};

  let retryCount = 0;

  const waitWithExponentialBackoff = async (baseDelay, retryCount) => {
    const delayTime = baseDelay * 2 ** retryCount * Math.random();
    console.log(`Retrying...Attempt ${retryCount} with delay ${delayTime}`);
    await new Promise((resolve) => setTimeout(resolve, delayTime));
  };

  const attemptFetch = async () => {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const shouldRetry = retryErrorCodes.some((code) => response.status === code);
        if (shouldRetry && retryCount < maxRetries) {
          await waitWithExponentialBackoff(baseDelay, retryCount);
          retryCount++;
          return await attemptFetch();
        }
        if (response.status === 404) {
          return undefined;
        }
      } else {
        return await response.json();
      }
    } catch (error) {
      console.error('Error in fetch ', error);
      if (retryCount < maxRetries) {
        await waitWithExponentialBackoff(baseDelay, retryCount);
        retryCount++;
        return await attemptFetch();
      }
      throw error;
    }
  };

  return await attemptFetch();
}
