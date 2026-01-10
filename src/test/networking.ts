/**
 * Copyright IBM Corp. 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

export interface Networking {
  addRequests: (path: string) => void;
  removeRequest: (path: string) => void;
  verifyRunningRequests: () => void;
  clearRunningRequests: () => void;
  getRunningRequestCount: () => number;
}

export const getNetworking = (): Networking => {
  const runningRequests = new Set<string>();

  const addRequests = (path: string): void => {
    if (!process.env.HIDE_NETWORK_LOGGING)
      console.log('Calling BFF endpoint: ', path);
    runningRequests.add(path);
  };

  const removeRequest = (path: string): void => {
    if (!process.env.HIDE_NETWORK_LOGGING) console.log('Request done: ', path);
    runningRequests.delete(path);
  };

  const verifyRunningRequests = (): void => {
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

  const clearRunningRequests = (): void => runningRequests.clear();

  const getRunningRequestCount = (): number => runningRequests.size;

  return {
    addRequests,
    removeRequest,
    verifyRunningRequests,
    clearRunningRequests,
    getRunningRequestCount,
  };
};

// Made with Bob
