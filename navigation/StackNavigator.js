import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../Screens/Main';
import OrderScreen from '../Screens/Order';
import StepsScreen from '../Screens/Steps';
import ProductScreen from '../Screens/Product';
import MessageScreen from '../Screens/Message';
import MessageDetailScreen from '../Screens/Message/Detail';

import TermsScreen from '../Screens/Common/Terms';
import PrivacyScreen from '../Screens/Common/Terms/Privacy';

const Stack = createStackNavigator();

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#9AC4F8',
        },
        headerTintColor: 'white',
        headerBackTitle: 'Back',
        headerShown: false,
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} />
    </Stack.Navigator>
  );
};

export const StepsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Steps" component={StepsScreen} />
    </Stack.Navigator>
  );
};

export const OrderStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrderStep" component={OrderScreen} />
    </Stack.Navigator>
  );
};

export const ProductStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
};

export const MessageStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Message" component={MessageScreen} />
    </Stack.Navigator>
  );
};

export const MessageDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="MessageDetail" component={MessageDetailScreen} />
    </Stack.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default StackNavigation;
