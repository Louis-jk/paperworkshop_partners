import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {
  MainStackNavigator,
  StepsStackNavigator,
  ProductStackNavigator,
  MessageStackNavigator,
  MessageDetailStackNavigator,
  OrderStackNavigator,
  OrderEditStackNavigator,
  OrderCompleteStackNavigator,
  OrderDetailStackNavigator,
  OrderMoreDetailStackNavigator,
  OrderDetailPropsStackNavigator,
  PartnersInfoStackNavigator,
  AlarmStackNavigator,
  StatisticsStackNavigator,
  ProfileEditStackNavigator,
  ReqPopularStackNavigator,
  LoginStackNavigator,
  RegisterStackNavigator,
  SignedStackNavigator,
  FindIdStackNavigator,
  FindPwdStackNavigator,
  CustomerStackNavigator,
} from './StackNavigator';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#rgba(255,255,255,0.6)',
        labelStyle: {
          fontSize: 12,
          letterSpacing: -1,
          paddingBottom: 5,
        },
        style: {
          justifyContent: 'center',
          height: 65,
          backgroundColor: '#00A170',
          paddingBottom: 5,
        },
        showLabel: false,
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? require('../src/assets/micon01_on.png')
              : require('../src/assets/micon01.png');
          } else if (route.name === 'Steps') {
            iconName = focused
              ? require('../src/assets/micon02_on.png')
              : require('../src/assets/micon02.png');
          } else if (route.name === 'Product') {
            iconName = focused
              ? require('../src/assets/micon03_on.png')
              : require('../src/assets/micon03.png');
          } else if (route.name === 'Message') {
            iconName = focused
              ? require('../src/assets/micon04_on.png')
              : require('../src/assets/micon04.png');
          }

          return (
            <Image
              source={iconName}
              resizeMode="contain"
              style={{width: 85, height: 60}}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{tabBarLabel: '홈'}}
      />
      <Tab.Screen
        name="Steps"
        component={StepsStackNavigator}
        options={{tabBarLabel: '견적발송 및 채택'}}
      />
      <Tab.Screen
        name="Product"
        component={ProductStackNavigator}
        options={{tabBarLabel: '제작/납품'}}
      />
      <Tab.Screen
        name="Message"
        component={MessageStackNavigator}
        options={{tabBarLabel: '메세지'}}
      />
    </Tab.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Check" component={LoginStackNavigator} />
      <Stack.Screen name="Login" component={LoginStackNavigator} />
      <Stack.Screen name="Stack" component={BottomTabNavigator} />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetailStackNavigator}
      />
      <Stack.Screen name="OrderStep" component={OrderStackNavigator} />
      <Stack.Screen name="OrderEdit" component={OrderEditStackNavigator} />
      <Stack.Screen
        name="OrderComplete"
        component={OrderCompleteStackNavigator}
      />
      <Stack.Screen name="OrderDetail" component={OrderDetailStackNavigator} />
      <Stack.Screen
        name="OrderDetailPackage"
        component={OrderMoreDetailStackNavigator}
      />
      <Stack.Screen
        name="OrderDetailGeneral"
        component={OrderMoreDetailStackNavigator}
      />
      <Stack.Screen
        name="OrderDetailProps"
        component={OrderDetailPropsStackNavigator}
      />
      <Stack.Screen name="PartnerInfo" component={PartnersInfoStackNavigator} />
      <Stack.Screen name="CompanyInfo" component={PartnersInfoStackNavigator} />
      <Stack.Screen name="Service" component={PartnersInfoStackNavigator} />
      <Stack.Screen name="Alarm" component={AlarmStackNavigator} />
      <Stack.Screen name="Statistics" component={StatisticsStackNavigator} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditStackNavigator} />
      <Stack.Screen
        name="ProfileDetailEdit"
        component={ProfileEditStackNavigator}
      />
      <Stack.Screen name="ReqPopular" component={ReqPopularStackNavigator} />
      <Stack.Screen name="Register" component={RegisterStackNavigator} />
      <Stack.Screen name="Signed" component={SignedStackNavigator} />
      <Stack.Screen name="FindId" component={FindIdStackNavigator} />
      <Stack.Screen name="FindPwd" component={FindPwdStackNavigator} />
      <Stack.Screen name="CCenter" component={CustomerStackNavigator} />
      <Stack.Screen name="CCenterDetail" component={CustomerStackNavigator} />
      <Stack.Screen name="CCenterNotice" component={CustomerStackNavigator} />
      <Stack.Screen name="CCenterNoticeDetail" component={CustomerStackNavigator} />
      <Stack.Screen name="CCenterQnA" component={CustomerStackNavigator} />
      <Stack.Screen name="CCenterQnADetail" component={CustomerStackNavigator} />
      <Stack.Screen name="CCenterQnAwrite" component={CustomerStackNavigator} />
    </Stack.Navigator>
  );
};

export default TabNavigator;
