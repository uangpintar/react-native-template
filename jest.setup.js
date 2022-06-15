/* eslint-disable @typescript-eslint/no-var-requires */
import 'whatwg-fetch';
import 'react-native-gesture-handler/jestSetup';
import AbortController from 'abort-controller';
import { fetch, Headers, Request, Response } from 'cross-fetch';

global.fetch = fetch;
global.Headers = Headers;
global.Request = Request;
global.Response = Response;
global.AbortController = AbortController;

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers),
  };
});

jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@react-native-firebase/app');

// jest.mock('react-native-notifications');

// jest.mock('@react-native-firebase/database');

// jest.mock('@react-native-firebase/messaging', () => () => ({
//   hasPermission: jest.fn(() => Promise.resolve(true)),
//   subscribeToTopic: jest.fn(),
//   unsubscribeFromTopic: jest.fn(),
//   requestPermission: jest.fn(() => Promise.resolve(true)),
//   getToken: jest.fn(() => Promise.resolve('myMockToken')),
//   onTokenRefresh: jest.fn((callback) => callback(Promise.resolve('Example'))),
// }));
jest.mock('@react-native-firebase/remote-config', () => () => ({
  fetchAndActivate: jest.fn().mockReturnValue(Promise.resolve()),
  fetch: jest.fn().mockReturnValue(Promise.resolve()),
  getAll: jest.fn().mockReturnValue({
    eva: { value: true },
    eva_hmg: { value: false },
  }),
}));
jest.mock('@react-native-firebase/crashlytics', () => () => ({
  recordError: jest.fn(),
  logEvent: jest.fn(),
  log: jest.fn(),
  setUserProperties: jest.fn(),
  setUserId: jest.fn(),
  setCurrentScreen: jest.fn(),
}));

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

require('jest-fetch-mock').enableMocks();
