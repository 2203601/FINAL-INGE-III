// __mocks__/fetch.js
import { jest } from '@jest/globals';

export function mockFetchSuccess(data = []) {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => data
    });
  }
  
  export function mockFetchFail(status = 500) {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status,
      json: async () => ({ error: "fail" })
    });
  }
  
  export function mockFetchNetworkError() {
    global.fetch = jest.fn().mockRejectedValue(new Error("Network error"));
  }
  