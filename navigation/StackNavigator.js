import React from 'react';
import {View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import MainScreen from '../Screens/Main';
import OrderScreen from '../Screens/Order';
import OrderEditScreen from '../Screens/Order/Edit';
import OrderCompleteScreen from '../Screens/Order/Complete';
import OrderDetailScreen from '../Screens/Order/Detail';
import OrderDetailPackageScreen from '../Screens/Order/MoreDetailPackage';
import OrderDetailGeneralScreen from '../Screens/Order/MoreDetailGeneral';
import OrderDetailPropsScreen from '../Screens/Order/DetailProps';
import StepsScreen from '../Screens/Steps';
import ProductScreen from '../Screens/Product';
import MessageScreen from '../Screens/Message';
import MessageDetailScreen from '../Screens/Message/Detail';
import ProfileEditScreen from '../Screens/Profile/Edit';
import ProfileDetailEditScreen from '../Screens/Profile/DetailEdit';

// 이용약관 및 개인정보 처리방침
import TermsScreen from '../Screens/Common/Terms';
import PrivacyScreen from '../Screens/Common/Terms/Privacy';

// 파트너스 소개
import PartnerInfoScreen from '../Screens/Common/Infos/PartnerInfo';
// 회사소개
import CompanyInfoScreen from '../Screens/Common/Infos/CompanyInfo';
// 서비스 소개
import ServiceScreen from '../Screens/Common/Infos/Service';

// 고객센터
import CustomerScreen from '../Screens/Customer';
import CCenterDetailScreen from '../Screens/Customer/Details';
import CCenterNoticeScreen from '../Screens/Customer/Notice';
import CCenterNoticeDetailScreen from '../Screens/Customer/NoticeDetail';
import CCenterQnAScreen from '../Screens/Customer/QnA';
import CCenterQnADetailScreen from '../Screens/Customer/QnADetail';
import CCenterQnAwriteScreen from '../Screens/Customer/QnAwrite';


import Alarm from '../Screens/Common/Alarm';
import Statistics from '../Screens/Common/Statistics';
import ReqPopularScreen from '../Screens/Profile/ReqPopular';

import CheckScreen from '../Screens/Profile/Auth/Check';
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

export const OrderMoreDetailStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="OrderDetailPackage"
        component={OrderDetailPackageScreen}
      />
      <Stack.Screen
        name="OrderDetailGeneral"
        component={OrderDetailGeneralScreen}
      />
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
      <Stack.Screen name="PartnerInfo" component={PartnerInfoScreen} />
      <Stack.Screen name="CompanyInfo" component={CompanyInfoScreen} />
      <Stack.Screen name="Service" component={ServiceScreen} />
      <Stack.Screen name="Alarm" component={Alarm} />
    </Stack.Navigator>
  );
};

export const CustomerStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="CCenter" component={CustomerScreen} />
      <Stack.Screen name="CCenterDetail" component={CCenterDetailScreen} />
      <Stack.Screen name="CCenterNotice" component={CCenterNoticeScreen} />
      <Stack.Screen
        name="CCenterNoticeDetail"
        component={CCenterNoticeDetailScreen}
      />
      <Stack.Screen name="CCenterQnA" component={CCenterQnAScreen} />
      <Stack.Screen
        name="CCenterQnADetail"
        component={CCenterQnADetailScreen}
      />
      <Stack.Screen name="CCenterQnAwrite" component={CCenterQnAwriteScreen} />
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
      <Stack.Screen
        name="ProfileDetailEdit"
        component={ProfileDetailEditScreen}
      />
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
      <Stack.Screen name="Check" component={CheckScreen} />
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
