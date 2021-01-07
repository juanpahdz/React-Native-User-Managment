import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import UserList from './screens/userList';
import UserDetailScreen from './screens/userDetailScreen';
import CreateUsers from './screens/createUsers';

function MyStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserList" component={UserList} options = {{ title: 'Check all Users'}}/>
      <Stack.Screen name="CreateUsers" component={CreateUsers} options = {{ title: 'Create a New user'}}/>
      <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} options = {{ title: 'User Detail'}}/>
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
