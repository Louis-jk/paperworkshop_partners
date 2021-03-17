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
  UserMobileCfm,
  UserType,
  UserCompany,
  UserProfile,
  UserPtype,
  UserProfileImg,
  UserEstimateCnt,
} from '../../../Modules/UserInfoReducer';

import Auth from '../../../src/api/Auth';

const Login = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();
  const {fcmToken} = useSelector((state) => state.InfoReducer);

  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크
  const [loginEmail, setLoginEmail] = React.useState(null);
  const [loginPwd, setLoginPwd] = React.useState(null);

  const [autoLogin, setAutoLogin] = React.useState(false);
  const toggleCheck = () => {
    setAutoLogin((prev) => !prev);
  };

  const loginEmailRef = React.useRef(null);
  const loginPwdRef = React.useRef(null);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }
  }, []);

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  // 로그인
  const onLogin = () => {
    Auth.onLogin(loginEmail, loginPwd, fcmToken, checkPlatform)
      .then((res) => {
        if (res.data.result === '1') {
          dispatch(UserId(res.data.item.mb_email));
          dispatch(UserEmail(res.data.item.mb_email));
          dispatch(UserName(res.data.item.mb_name));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserMobileCfm(res.data.item.mb_1));
          dispatch(UserCompany(res.data.item.mb_2));
          dispatch(UserType(res.data.item.mb_level));
          dispatch(UserProfile(res.data.item.mb_profile));
          dispatch(UserPtype(res.data.item.ptype));
          dispatch(UserEstimateCnt(res.data.item.estimate_cnt));
          dispatch(UserProfileImg(res.data.item.profileImg));

          navigation.navigate('Stack');
        } else {
          Alert.alert(res.data.message, '다시 확인해주세요.', [
            {
              text: '확인',
              onPress: () => loginEmailRef.current.focus(),
            },
          ]);
        }
        console.log('로그인 res', res);
      })
      .catch((err) => {
        Alert.alert('관리자에게 문의해주세요.', err, [
          {
            text: '확인',
          },
        ]);
      });
  };

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
          <View style={{marginBottom: 30, paddingHorizontal: 40}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                marginBottom: 10,
                height: 50,
              }}>
              <TextInput
                value={loginEmail}
                ref={loginEmailRef}
                placeholder="이메일"
                style={[styles.normalText, {width: '80%'}]}
                onChangeText={(text) => setLoginEmail(text)}
                autoCapitalize="none"
                keyboardType="email-address"
                onSubmitEditing={() => loginPwdRef.current.focus()}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                marginBottom: 10,
                height: 50,
              }}>
              <TextInput
                value={loginPwd}
                ref={loginPwdRef}
                placeholder="비밀번호"
                placeholderTextColor="#A2A2A2"
                style={[styles.normalText, {width: '80%'}]}
                onChangeText={(text) => setLoginPwd(text)}
                autoCapitalize="none"
                secureTextEntry={pwdEyes}
                onSubmitEditing={() => onLogin()}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={togglePwdEyes}
                hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
                <Image
                  source={
                    pwdEyes
                      ? require('../../../src/assets/icon_eye.png')
                      : require('../../../src/assets/icon_eye_on.png')
                  }
                  resizeMode="center"
                  style={{width: 35, height: 20}}
                />
              </TouchableOpacity>
            </View>

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
            onPress={() => onLogin()}
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
