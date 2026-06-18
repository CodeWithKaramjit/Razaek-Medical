/* eslint-env jest */

require('react-native-gesture-handler/jestSetup');

jest.mock('react-native-safe-area-context', () => {
  const React = require('react');
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };

  return {
    SafeAreaConsumer: ({ children }) => children(inset),
    SafeAreaProvider: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    SafeAreaView: ({ children }) =>
      React.createElement(React.Fragment, null, children),
    useSafeAreaInsets: () => inset,
  };
});

jest.mock('react-native-screens', () => {
  const { View } = require('react-native');

  return {
    enableScreens: jest.fn(),
    Screen: View,
    ScreenContainer: View,
    NativeScreen: View,
    NativeScreenNavigationContainer: View,
  };
});
