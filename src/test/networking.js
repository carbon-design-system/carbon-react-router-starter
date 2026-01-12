/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Creates a networking utility for tracking and managing test requests.
 * Provides methods to add, remove, verify, and clear running requests
 * with optional console logging.
 *
 * @returns {Object} Networking utility object
 * @returns {Function} returns.addRequests - Add a request to tracking
 * @returns {Function} returns.removeRequest - Remove a request from tracking
 * @returns {Function} returns.verifyRunningRequests - Verify no requests are running
 * @returns {Function} returns.clearRunningRequests - Clear all tracked requests
 * @returns {Function} returns.getRunningRequestCount - Get count of running requests
 *
 * @example
 * const networking = getNetworking();
 * networking.addRequests('/api/post/1');
 * networking.removeRequest('/api/post/1');
 * networking.verifyRunningRequests();
 */
export const getNetworking = () => {
  const runningRequests = new Set();

  const addRequests = (path) => {
    if (!process.env.HIDE_NETWORK_LOGGING)
      console.log('Calling BFF endpoint: ', path);
    runningRequests.add(path);
  };

  const removeRequest = (path) => {
    if (!process.env.HIDE_NETWORK_LOGGING) console.log('Request done: ', path);
    runningRequests.delete(path);
  };

  const verifyRunningRequests = () => {
    if (runningRequests.size > 0) {
      const allPaths = Array.from(runningRequests).join(' , ');
      console.error(
        'There are running requests after the test is completed: ',
        allPaths,
      );
      expect(runningRequests.size).toStrictEqual(0);
    } else {
      console.log('No running requests!');
    }
  };

  const clearRunningRequests = () => runningRequests.clear();

  const getRunningRequestCount = () => runningRequests.size;

  return {
    addRequests,
    removeRequest,
    verifyRunningRequests,
    clearRunningRequests,
    getRunningRequestCount,
  };
};
