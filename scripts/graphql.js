import { getBearerToken } from './security.js';
import { getAdminConfig } from './site-config.js';

export async function graphqlAllCampaigns() {

  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'getAllCampaigns'; //Todo Shivani will rename query to allCampaigns
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}`;
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


async function getGraphqlEndpoint() {
    const result = await getAdminConfig();
    return result.aemGraphqlEndpoint;
}
