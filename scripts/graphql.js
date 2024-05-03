import { getBearerToken } from './security.js';
import { getAdminConfig } from './site-config.js';

export async function graphqlCampaignCount() {
  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'campaign-names';
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}`;
  const jwtToken = await getBearerToken();

  try {
    const options = {
      method: 'GET',
      headers: {
        Authorization: jwtToken,
      },
    };
    const response = await fetch(`${graphqlEndpoint}`, options);
    // Handle response codes
    if (response.status === 200) {
      const responseBody = await response.json();
      return responseBody.data.programList.items.length;
    } if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to get graphqlCampaignCount (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to retrieve graphqlCampaignCount: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('graphqlCampaignCount', error);
    throw error;
  }

}

export async function graphqlAllCampaigns(first,cursor) {
  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'getAllCampaigns';
  const encodedFirst = encodeURIComponent(first);
  const encodedSemiColon = encodeURIComponent(';');
  const encodedCursor = encodeURIComponent(cursor);

  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}first=${encodedFirst}${encodedSemiColon}cursor=${encodedCursor}`;
  const jwtToken = await getBearerToken();

  try {
    const options = {
      method: 'GET',
      headers: {
        Authorization: jwtToken,
      },
    };
    const response = await fetch(`${graphqlEndpoint}`, options);
    // Handle response codes
    if (response.status === 200) {
      const responseBody = await response.json();
      return responseBody;
    } if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to get graphqlCampaignPaginated (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to retrieve graphqlCampaignPaginated: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('graphqlCampaignPaginated', error);
    throw error;
  }

}

export async function graphqlCampaignByName(campaignName) {

  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'campaign-name-in-param';
  const encodedCampaignName = encodeURIComponent(campaignName);
  const encodedSemiColon = encodeURIComponent(';');
  //persisted query URLs have to be encoded together with the first semicolon
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}campaignName=${encodedCampaignName}`;
  const jwtToken = await getBearerToken();

  // Return the fetch promise chain so that it can be awaited outside
  return fetch(graphqlEndpoint, {
      method: 'GET',
      headers: {
          Authorization: jwtToken,
      },
  }).then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  }).then(data => {
      return data; // Make sure to return the data so that the promise resolves with it
  }).catch(error => {
      console.error('Error fetching data: ', error);
      throw error; // Rethrow or handle error as appropriate
  });
}

export async function graphqlFilterOnMarketingInitiative(marketingInitiative) {

  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'filter-on-marketing-initiative';
  const encodedMarketingInitiative = encodeURIComponent(marketingInitiative);
  const encodedSemiColon = encodeURIComponent(';');
  //persisted query URLs have to be encoded together with the first semicolon
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}marketingInitiative=${encodedMarketingInitiative}`;
  const jwtToken = await getBearerToken();

  // Return the fetch promise chain so that it can be awaited outside
  return fetch(graphqlEndpoint, {
      method: 'GET',
      headers: {
          Authorization: jwtToken,
      },
  }).then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  }).then(data => {
      return data; // Make sure to return the data so that the promise resolves with it
  }).catch(error => {
      console.error('Error fetching data: ', error);
      throw error; // Rethrow or handle error as appropriate
  });
}

async function getGraphqlEndpoint() {
    const result = await getAdminConfig();
    return result.aemGraphqlEndpoint;
}

export async function getProgramDetails(programName) {
  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'getProgramDetails';
  const encodedProgramName = encodeURIComponent(programName);
  const encodedSemiColon = encodeURIComponent(';');
  //persisted query URLs have to be encoded together with the first semicolon
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}programName=${encodedProgramName}`;
  const jwtToken = await getBearerToken();

  // Return the fetch promise chain so that it can be awaited outside
  return fetch(graphqlEndpoint, {
      method: 'GET',
      headers: {
          Authorization: jwtToken,
      },
  }).then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  }).then(data => {
      return data; // Make sure to return the data so that the promise resolves with it
  }).catch(error => {
      console.error('Error fetching data: ', error);
      throw error; // Rethrow or handle error as appropriate
  });
}
