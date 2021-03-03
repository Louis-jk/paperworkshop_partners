import * as React from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {
  UserId,
  UserName,
  UserMobile,
  UserEmail,
  UserCompany,
  UserMobileCfm,
  UserType,
  UserProfileImg,
  UserEstimateCnt,
} from '../../../Modules/UserInfoReducer';

const Login = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();

  const [fFcmToken, setFfcmToken] = React.useState(null); // fcmtoken 현재 페이지 저장
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크
  const [userId, setUserId] = React.useState(null);
  const [userPwd, setUserPwd] = React.useState(null);

  const [autoLogin, setAutoLogin] = React.useState(false);
  const toggleCheck = () => {
    setAutoLogin((prev) => !prev);
  };

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <View style={{flex: 5, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={require('../../../src/assets/logo02.png')}
            resizeMode="contain"
            style={{
              width: Dimensions.get('window').width - 150,
              height: 50,
              marginBottom: 50,
            }}
          />
          <View style={{marginBottom: 30}}>
            <TextInput
              placeholder="이메일"
              style={[styles.normalText, styles.textInput]}
              editable={false}
            />
            <TextInput
              placeholder="비밀번호"
              style={[styles.normalText, styles.textInput]}
              editable={false}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleCheck}
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}
              hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}>
              <Text
                style={[
                  styles.normalText,
                  {fontSize: 14, color: '#111111', marginRight: 5},
                ]}>
                자동 로그인
              </Text>
              <Image
                source={
                  autoLogin
                    ? require('../../../src/assets/radio_on.png')
                    : require('../../../src/assets/radio_off.png')
                }
                resizeMode="cover"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('Stack')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: Dimensions.get('window').width - 100,
              backgroundColor: '#00A170',
              borderRadius: 4,
              paddingVertical: 15,
            }}>
            <Text style={[styles.normalText, {fontSize: 16, color: '#fff'}]}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            width: Dimensions.get('window').width - 100,
          }}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FindId')}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.normalText}>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FindPwd')}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Text style={styles.normalText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.normalText,
            {fontSize: 14, color: '#ADADAD', marginRight: 10},
          ]}>
          아직 가입되지 않은 회원입니까?
        </Text>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Register')}
          style={{
            paddingHorizontal: 10,
            paddingVertical: 10,
          }}>
          <Text style={[styles.normalText, {fontSize: 14, color: '#00A170'}]}>
            회원가입
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: Dimensions.get('window').width - 100,
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  normalText: {
    fontFamily: 'SCDream4',
  },
  mediumText: {
    fontFamily: 'SCDream5',
  },
  boldText: {
    fontFamily: 'SCDream6',
  },
});

export default Login;
