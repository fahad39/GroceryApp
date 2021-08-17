/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeBaseProvider} from 'native-base';

import ListView from './src/Screens/ListView';
import EntryView from './src/Screens/EntryView';
import {ListContext} from './src/context/Context';

const Stack = createNativeStackNavigator();

const App = () => {
  const [list, setList] = useState([]);
  //Navigation SetUp
  return (
    <NativeBaseProvider>
      <ListContext.Provider value={{list, setList}}>
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
      </ListContext.Provider>
    </NativeBaseProvider>
  );
};

export default App;
