// __mocks__/globals.js
import { jest } from '@jest/globals';

export function mockGlobals() {
    global.alert = jest.fn();
    global.confirm = jest.fn(() => true);
  
    delete window.location;
    window.location = {
      hostname: "localhost"
    };
  }
  
  export function setHostname(hostname) {
    window.location.hostname = hostname;
  }
  