import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import {
  MainStackNavigator,
  StepsStackNavigator,
  ProductStackNavigator,
  MessageStackNavigator,
  MessageDetailStackNavigator,
  OrderStackNavigator,
  PartnersInfoStackNavigator,
  AlarmStackNavigator,
  StatisticsStackNavigator,
} from './StackNavigator';
import {StackActions} from '@react-navigation/native';

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
          paddingBottom: 7,
        },
        style: {
          justifyContent: 'center',
          height: 70,
          paddingTop: 7,
          backgroundColor: '#00A170',
        },
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
              style={{width: 40, height: 50}}
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
      <Stack.Screen name="Stack" component={BottomTabNavigator} />
      <Stack.Screen
        name="MessageDetail"
        component={MessageDetailStackNavigator}
      />
      <Stack.Screen name="OrderStep" component={OrderStackNavigator} />
      <Stack.Screen name="PartnerInfo" component={PartnersInfoStackNavigator} />
      <Stack.Screen name="Alarm" component={AlarmStackNavigator} />
      <Stack.Screen name="Statistics" component={StatisticsStackNavigator} />
    </Stack.Navigator>
  );
};

export default TabNavigator;
