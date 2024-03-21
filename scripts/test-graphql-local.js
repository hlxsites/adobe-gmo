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

