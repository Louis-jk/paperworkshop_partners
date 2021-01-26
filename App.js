import * as React from 'react';
import {View, Text, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import DrawerNavigator from './navigation/DrawerNavigator';

// import MainScreen from './Screens/Main';
// import PartnersScreen from './Screens/Partners';

// import {MainStackNavigator} from './navigation/StackNavigation';
// import {BottomTabNavigator} from './navigation/TabNavigator';

const App = () => {
  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }, []);

  return (
    <>
      <StatusBar hidden={true} />
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
