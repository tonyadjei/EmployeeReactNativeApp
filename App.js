import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const myNavigationOptions = {
  title: 'My Sweet Home',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: '#006aff',
  },
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={myNavigationOptions}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ ...myNavigationOptions, title: 'Profile' }}
        />
        <Stack.Screen
          name="Create Employee"
          component={CreateEmployee}
          options={{ ...myNavigationOptions, title: 'Create Employee' }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
