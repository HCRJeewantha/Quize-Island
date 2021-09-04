import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/home';
import Welcome from '../screens/welcome';
import Result from '../screens/result';
import Main from '../screens/main';
import Dashboard from '../screens/dashboard';
import Questions from '../screens/questions';
import Question from '../screens/question';
import Test from '../screens/test';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Result" component={Result} />
        <Stack.Screen name="Main" component={Main} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="Questions" component={Questions} />
        <Stack.Screen name="Question" component={Question} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;