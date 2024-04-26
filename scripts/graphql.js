import { getBearerToken } from './security.js';
import { getAdminConfig } from './site-config.js';
import { logError } from './scripts.js';

export async function graphqlProductList() {

  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'getProductList';
  //persisted query URLs have to be encoded together with the first semicolon
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
export async function graphqlStatusList() {

  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'getStatusList';
  //persisted query URLs have to be encoded together with the first semicolon
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
      return responseBody.data.campaignList.items.length;
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


export async function graphqlAllCampaignsFilter(first,cursor,filter) {

  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryName = 'getAllCampaigns';
  const encodedFirst = encodeURIComponent(first);
  const encodedSemiColon = encodeURIComponent(';');
  const encodedCursor = encodeURIComponent(cursor);
  //const encodedFilter = encodeURIComponent(JSON.stringify(filter));
  const encodedFilter = encodeURIComponent(JSON.stringify(filter));

  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}first=${encodedFirst}${encodedSemiColon}cursor=${encodedCursor}${encodedSemiColon}filter=${encodedFilter}`;
  console.log('graphqlEndpoint');
  console.log(graphqlEndpoint);
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



/**
 * Generates GraphQL Filter String from an array filterParams
 * @param {Array of parameter objects} filterParams -
 * Expected parameter format
 * [
 *  {type:"campignName", value:"Photo" ,operator : "CONTAINS"},
 *  {type:"status", value:"Current" ,operator : "="}
 * ]
 * operator : "CONTAINS" generates
 * "_expressions": [
 *			{
 *				"value": "<Value>",
 *				"_operator": "CONTAINS",
 *				"_ignoreCase": true
 *			}
 *		]
 * operator : "=" generates
 * "_expressions": [
 *			{
 *				"value": "<Value>",
 *			}
 *		]
 *  @returns {string} GraphQL Filter JSON Object.
 */

export function generateFilterJSON(filterParams) {

  /* Example of valid array of parameters
  [
    {type:"campignName", value:"Photo" ,operator : "CONTAINS"},
    {type:"status", value:"Current" ,operator : "="}
  ]
  */


  // Initialize an empty object to hold the final structure
  const result = {};

  // Iterate over each item in the filterParams array
  filterParams.forEach(param => {
      // Initialize the object for each parameter name if it doesn't already exist
      if (!result[param.type]) {
          result[param.type] = { _expressions: [] };
      }

      // Create the expression object based on the operator
      const expression = { value: param.value };
      if (param.operator === "CONTAINS") {
          expression._operator = "CONTAINS";
          expression._ignoreCase = true;
      }

      // Add the expression object to the _expressions array for the corresponding parameter name
      result[param.type]._expressions.push(expression);
  });

  // Convert the result object to JSON
  const jsonResult = JSON.stringify(result, null, 4); // Beautified JSON output
  // Logging the JSON to see the output
  console.log(jsonResult);

  return result;
}
