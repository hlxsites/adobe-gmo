import { getBearerToken } from './security.js';
import {
  getBackendApiKey
} from './polaris.js';

//import sdk from './libs/aio-lib-events/index.js';
//

//import sdk from '@adobe/aio-lib-events';
export async function sdkTest() {

const sdk = require('@adobe/aio-lib-events');

  console.log('sdkTest()');
  const accessToken = await getBearerToken();

  console.log('accessToken');
  console.log(accessToken);

  // Todo put the organizationId as an entry in admin-config.xlsx and write code to get it, hard code for now
  const organizationId = '3E692814636C53B60A495EC3@AdobeOrg';
  // Hardcode for now
  const backendApiKey ='eyJhbGciOiJSUzI1NiIsIng1dSI6Imltc19uYTEta2V5LWF0LTEuY2VyIiwia2lkIjoiaW1zX25hMS1rZXktYXQtMSIsIml0dCI6ImF0In0.eyJpZCI6IjE3MDIzMzQyNDk3MDlfNjk4ODE4NDktYjFhYS00YWYxLThkYzktNDhkMjYxOWFiMGE4X3VlMSIsIm9yZyI6IjNFNjkyODE0NjM2QzUzQjYwQTQ5NUVDM0BBZG9iZU9yZyIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiIxN2FmMjRmYWIxNWQ0NjVjYmU1Njk4NWU2MjA2NTdiZiIsInVzZXJfaWQiOiIxRTAzMUYzQzY0QjE4NUU5MEE0OTVGOUZAdGVjaGFjY3QuYWRvYmUuY29tIiwiYXMiOiJpbXMtbmExIiwiYWFfaWQiOiIxRTAzMUYzQzY0QjE4NUU5MEE0OTVGOUZAdGVjaGFjY3QuYWRvYmUuY29tIiwiY3RwIjozLCJtb2kiOiIyMGQ0ZTI1ZiIsImV4cGlyZXNfaW4iOiI4NjQwMDAwMCIsImNyZWF0ZWRfYXQiOiIxNzAyMzM0MjQ5NzA5Iiwic2NvcGUiOiJhZG9iZWlvX2FwaSxvcGVuaWQscmVhZF9jbGllbnRfc2VjcmV0LEFkb2JlSUQsYWRkaXRpb25hbF9pbmZvLnJvbGVzLG1hbmFnZV9jbGllbnRfc2VjcmV0cyxyZWFkX29yZ2FuaXphdGlvbnMsYWRkaXRpb25hbF9pbmZvLnByb2plY3RlZFByb2R1Y3RDb250ZXh0In0.Q9HswXl6Qf3PkJH_kkt5fDtIf10rNr1wDIkAzj_6ezKj9BNfYq2_DyDz0hBcELjxPwkqKV32b5dHnOnNg_khnGIwLLFRLFheLZ1EqMdkV4Y9mhE6AAR0hrgdAvBvOZTLcHn8UyD9XN5mtKseQdrOr1MQQ0Pr9rzaDERn5oqJZtxRIJ_qOoiuL6kO-plkf5Xvzym0XVOJ3nEHQlAR5XL1x5Fopx3y1NtitFN5etK79J76gXrWix14GNpNoSrFwu7oRPEHAi5c2utKOLdfJ2bBqOflEKF6YGqLTfKkUCaWaQT59opFFKiZHVKg4QOpn94dKNLTjRcUuRKxLmxYojpcKg';
  //initialize sdk
  //const client = await sdk.init(organizationId, getBackendApiKey(), accessToken, '<httpOptions>');
  const client = await sdk.init(organizationId, getBackendApiKey(), accessToken);

  //const client = await aioLibEvents.init(organizationId, getBackendApiKey(), accessToken);

  console.log('SDK Client');
  console.log(client);
}
