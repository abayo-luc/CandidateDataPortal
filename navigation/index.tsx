import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import { Text, View } from '../components';

import { FarmListScreen } from '../screens/FarmList';
import {
  MapRecording,
  RecordingHeaderBack,
  RecordingHeaderRecord,
} from '../screens/Recording';

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={
        colorScheme === 'dark' ? DarkTheme : DefaultTheme
      }
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack =
  createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Root'
        component={FarmListScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='Recording'
        component={MapRecording}
        options={{
          headerTransparent: true,
          title: '',
          headerLeft: () => <RecordingHeaderBack />,
          headerRight: () => <RecordingHeaderRecord />,
        }}
      />
    </Stack.Navigator>
  );
}
