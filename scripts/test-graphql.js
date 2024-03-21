import { getBearerToken } from './security.js';

export async function graphqlTestCampaignGet() {
  const baseApiUrl = 'https://author-p108396-e1046543.adobeaemcloud.com/graphql/execute.json';
  const projectId = 'gmo';
  const queryName = 'test-campaign';
  const queryParams = ''; // Adjust if needed
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${queryParams}`;
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
