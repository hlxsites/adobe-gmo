import { getBearerToken } from './security.js';
import { getAdminConfig } from './site-config.js';
import { logError } from './scripts.js';

const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
const projectId = 'gmo';

export function graphqlCampaignCount(filter = {}) {
  const queryName = 'getTotalPrograms';
  const encodedSemiColon = encodeURIComponent(';');
  const encodedFilter = encodeURIComponent(JSON.stringify(filter));
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}filter=${encodedFilter}`;

  return getBearerToken()
    .then(jwtToken => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: jwtToken,
        },
      };

      return fetch(`${graphqlEndpoint}`, options);
    })
    .then(response => {
      if (response.status === 200) {
        return response.json().then(responseBody => responseBody.data.programList.items.length);
      } else if (response.status === 404) {
        return response.json().then(errorResponse => {
          throw new Error(`Failed to get graphqlCampaignCount (404): ${errorResponse.detail}`);
        });
      } else {
        throw new Error(`Failed to retrieve graphqlCampaignCount: ${response.status} ${response.statusText}`);
      }
    })
    .catch(error => {
      logError('graphqlCampaignCount', error);
      throw error;
    });
}

export async function graphqlAllCampaignsFilter(first,cursor,filter) {
  const queryName = 'getAllCampaigns';
  const encodedFirst = encodeURIComponent(first);
  const encodedSemiColon = encodeURIComponent(';');
  const encodedCursor = encodeURIComponent(cursor);
  const encodedFilter = encodeURIComponent(JSON.stringify(filter));
  const graphqlEndpoint = `${baseApiUrl}/${projectId}/${queryName}${encodedSemiColon}first=${encodedFirst}${encodedSemiColon}cursor=${encodedCursor}${encodedSemiColon}filter=${encodedFilter}`;
  //Performance logging
  const startTime = performance.now();
  const jwtToken = await getBearerToken();

  try {
    const options = {
      method: 'GET',
      headers: {
        Authorization: jwtToken,
      },
    };
    const response = await fetch(`${graphqlEndpoint}`, options);
    //Performance logging
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    console.debug(`getAllCampaigns Execution Time: ${executionTime} ms`);

    // Handle response codes
    if (response.status === 200) {
      const responseBody = await response.json();
      return responseBody;
    } if (response.status === 404) {
      // Handle 404 error
      const errorResponse = await response.json();
      throw new Error(`Failed to get graphqlAllCampaignsFilter (404): ${errorResponse.detail}`);
    } else {
      // Handle other response codes
      throw new Error(`Failed to retrieve graphqlAllCampaignsFilter: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    // Handle network or other errors
    logError('graphqlAllCampaignsFilter', error);
    throw error;
  }

}

export async function graphqlProgramByName(programName) {
  const queryName = 'getProgramNameFilter';
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
      // handle not-equal operator (!==)
      if (param.operator === "EQUALS_NOT") {
        expression._operator = "EQUALS_NOT";
        expression._ignoreCase = true;
      }

      // Add the expression object to the _expressions array for the corresponding parameter name
      result[param.type]._expressions.push(expression);
  });

  // Convert the result object to JSON
  const jsonResult = JSON.stringify(result,null,4);

  return result;
}

// general function for executing graphql queries
export async function executeQuery(queryString) {
  const baseApiUrl = `${await getGraphqlEndpoint()}/graphql/execute.json`;
  const projectId = 'gmo';
  const queryEndpoint = `${baseApiUrl}/${projectId}/${queryString}`;
  //Performance logging
  const startTime = performance.now();
  const jwtToken = await getBearerToken();

  return fetch(queryEndpoint, {
    method: 'GET',
    headers: {
        Authorization: jwtToken,
    },
  }).then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      //Performance logging
      const endTime = performance.now();
      const executionTime = endTime - startTime;
      console.debug(`executeQuery for ${queryString} Execution Time: ${executionTime} ms`);

      return response.json();
  }).then(data => {
      return data; // Make sure to return the data so that the promise resolves with it
  }).catch(error => {
      console.error('Error fetching data: ', error);
      throw error; // Rethrow or handle error as appropriate
  });
};