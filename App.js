/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';

import ListView from './src/Screens/ListView';
import EntryView from './src/Screens/EntryView';

const Stack = createNativeStackNavigator();

const App = () => {
  //Navigation SetUp
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'ListView'}
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="ListView" component={ListView} />
          <Stack.Screen name="EntryView" component={EntryView} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

export default App;
