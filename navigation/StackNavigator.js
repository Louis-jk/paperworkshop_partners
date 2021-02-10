import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../Screens/Main';
import OrderScreen from '../Screens/Order';
import OrderEditScreen from '../Screens/Order/Edit';
import OrderCompleteScreen from '../Screens/Order/Complete';
import OrderDetailScreen from '../Screens/Order/Detail';
import OrderDetail2Screen from '../Screens/Order/Detail2';
import OrderDetailPropsScreen from '../Screens/Order/DetailProps';
import StepsScreen from '../Screens/Steps';
import ProductScreen from '../Screens/Product';
import MessageScreen from '../Screens/Message';
import MessageDetailScreen from '../Screens/Message/Detail';
import ProfileEditScreen from '../Screens/Profile/Edit';

import TermsScreen from '../Screens/Common/Terms';
import PrivacyScreen from '../Screens/Common/Terms/Privacy';
import PartnerInfo from '../Screens/Common/Infos/PartnerInfo';
import Alarm from '../Screens/Common/Alarm';
import Statistics from '../Screens/Common/Statistics';
import ReqPopularScreen from '../Screens/Profile/ReqPopular';

import LoginScreen from '../Screens/Profile/Auth/Login';
import RegisterScreen from '../Screens/Profile/Auth/Register';
import SignedScreen from '../Screens/Profile/Auth/Signed';
import FindIdScreen from '../Screens/Profile/Auth/FindId';
import FindPwdScreen from '../Screens/Profile/Auth/FindPwd';
import SetPwdScreen from '../Screens/Profile/Auth/SetPwd';
import SetPwdCompleteScreen from '../Screens/Profile/Auth/SetPwdComplete';

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

export const OrderEditStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrderEdit" component={OrderEditScreen} />
    </Stack.Navigator>
  );
};

export const OrderCompleteStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrderComplete" component={OrderCompleteScreen} />
    </Stack.Navigator>
  );
};

export const OrderDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
    </Stack.Navigator>
  );
};

export const OrderDetail2StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="OrderDetail2" component={OrderDetail2Screen} />
    </Stack.Navigator>
  );
};

export const OrderDetailPropsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="OrderDetailProps"
        component={OrderDetailPropsScreen}
      />
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

export const PartnersInfoStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="PartnerInfo" component={PartnerInfo} />
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
};

export const AlarmStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
};

export const StatisticsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Statistics" component={Statistics} />
    </Stack.Navigator>
  );
};

export const ProfileEditStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};

export const ReqPopularStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ReqPopular" component={ReqPopularScreen} />
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

export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export const RegisterStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export const SignedStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Signed" component={SignedScreen} />
    </Stack.Navigator>
  );
};

export const FindIdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FindId" component={FindIdScreen} />
    </Stack.Navigator>
  );
};

export const FindPwdStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="FindPwd" component={FindPwdScreen} />
      <Stack.Screen name="SetPwd" component={SetPwdScreen} />
      <Stack.Screen name="SetPwdComplete" component={SetPwdCompleteScreen} />
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
