/*
export function graphqlDemoPost() {
  const graphqlEndpoint = 'http://localhost:4502/graphql/execute.json/my-project/all-teams';
  const username = 'admin';
  const password = 'admin';

  // Encode your credentials in base64 for the Authorization header
  const base64Credentials = btoa(username + ':' + password);

  // Define your GraphQL query or persisted query ID here
  // Since you're using a persisted query, you might not need to send a query body
  // However, this depends on how your AEM server is set up to handle persisted queries
  const graphqlQuery = {
      // For example, if you need to pass parameters to your persisted query, you might add them here
      // query: `your GraphQL query here`,
      // variables: {},
  };

debugger;

  // Make the POST request to the GraphQL endpoint
  fetch(graphqlEndpoint, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          // Include the Authorization header for basic auth
          'Authorization': `Basic ${base64Credentials}`,
      },
      // If your persisted query requires a request body, stringify it here
      // body: JSON.stringify(graphqlQuery),
  }).then(response => {
      if (!response.ok) {
          // Handle HTTP errors
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
  }).then(data => {
      console.log(data);
  }).catch(error => {
      console.error('Error fetching data: ', error);
  });
}
*/

export async function graphqlDemoGet() {
  const baseApiUrl = 'http://localhost:4502/graphql/execute.json';
  const projectId = 'my-project';
  const queryName = 'all-teams';
  const queryParams = ''; // Adjust if needed
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${queryParams}`;
  const username = 'admin';
  const password = 'admin';
  const base64Credentials = btoa(username + ':' + password);

  // Return the fetch promise chain so that it can be awaited outside
  return fetch(graphqlEndpoint, {
      method: 'GET',
      headers: {
          'Authorization': `Basic ${base64Credentials}`,
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
