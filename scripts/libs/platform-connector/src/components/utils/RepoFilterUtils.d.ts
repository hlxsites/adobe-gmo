/**
 * @module platform-connector
 */
export declare const REPOSITORY_ID_KEY = "repo:repositoryId";
/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @returns {Object[]} the list of valid 'author' repository objects, filtered from the discovery response.
 * Use getAllRepoList to get all valid repository objects of all aemTierType.
 */
export declare const getRepoList: (discoveryResponse: any, orgId: any) => any;
/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @param preferredRepoId {String} the repo ID to validate and use as default selection
 * @returns {Object} the first valid repo ID from the repo list or undefined in case no valid repo was found
 */
export declare const getDefaultSelectedRepo: (discoveryResponse: any, orgId: any, preferredRepoId: any) => any;
/**
 * @param discoveryResponse {Object} the JSON payload of the discovery response
 * @param orgId {String} the IMS org ID to use for filtering the repos from the discovery response
 * @returns {Object[]} the list of valid repository objects of all aemTierType, filtered from the discovery response
 */
export declare const getAllRepoList: (discoveryResponse: any, orgId: any) => any;
