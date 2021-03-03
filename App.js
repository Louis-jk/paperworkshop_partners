import * as React from 'react';
import {View, Text, StatusBar, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import messaging from '@react-native-firebase/messaging';
// import {Root, Toast} from 'native-base';

import DrawerNavigator from './navigation/DrawerNavigator';
import {useDispatch, useSelector} from 'react-redux';
import {setFcmToken} from './Modules/InfoReducer';

// import MainScreen from './Screens/Main';
// import PartnersScreen from './Screens/Partners';

// import {MainStackNavigator} from './navigation/StackNavigation';
// import {BottomTabNavigator} from './navigation/TabNavigator';

const App = () => {
  const dispatch = useDispatch();

  const [fFcmToken, setFfcmToken] = React.useState(null); // fcmtoken 현재 페이지 저장

  React.useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    messaging()
      .getToken()
      .then((currentToken) => {
        setFfcmToken(currentToken);
        dispatch(setFcmToken(currentToken));
      })
      .catch((err) =>
        Alert.alert('관리자에게 문의하세요', err.messaging(), [
          {
            text: '확인',
          },
        ]),
      );

    messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      // console.log(remoteMessage);
    });
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
