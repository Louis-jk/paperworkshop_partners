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
  ActivityIndicator,
  Keyboard
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, StackActions } from "@react-navigation/native";
import {
  UserNo,
  UserName,
  UserMobile,
  UserEmail,
  UserMobileCfm,
  UserLevel,
  UserCompany,
  UserProfile,
  UserPtype,
  UserLicense,
  UserLicenseSource,
  UserCompanyFile,
  UserCompanyFileName,
  UserCate1,
  UserCaId,
  UserCaName,
  UserDescription,
  UserBusinessTime,
  UserCloseDay,
  UserUsed,
  UserBankName,
  UserBankAccount,
  UserBankDepositor,
  UserNoticeYn,
  UserQaYn,
  UserEstimateYn,
  UserPortfolio,
  UserEstimateCnt,
  UserLocation,
} from '../../../Modules/UserInfoReducer';
import {setFcmToken} from '../../../Modules/InfoReducer';
import Auth from '../../../src/api/Auth';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const Login = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();
  const {fcmToken} = useSelector((state) => state.InfoReducer);

  const loginEmailRef = React.useRef(null);
  const loginPwdRef = React.useRef(null);


  const [fFcmToken, setFfcmToken] = React.useState(null); // fcmtoken 현재 페이지 저장
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크
  const [loginEmail, setLoginEmail] = React.useState(null);
  const [loginPwd, setLoginPwd] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);

  const [autoLogin, setAutoLogin] = React.useState(false);
  const toggleCheck = () => {
    if (loginEmail !== null || loginPwd !== null) {
      setAutoLogin((prev) => !prev);
    } else {
      Alert.alert('아이디 또는 비밀번호를 입력해주세요', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify({userId: loginEmail, userPwd: loginPwd});
      await AsyncStorage.setItem('@paper_info', jsonValue);
    } catch (e) {
      Alert.alert(e, '관리자에게 문의하세요', [
        {
          text: '확인',
        },
      ]);
    }
  };

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };


  React.useEffect(() => {
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

    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }

    

  }, []);

  // 로그인
  const onLogin = () => {
    Keyboard.dismiss();
    setLoading(true);
    Auth.onLogin(loginEmail, loginPwd, fcmToken, checkPlatform)
      .then((res) => {
        if (res.data.result === '1') {
          dispatch(UserNo(res.data.item.mb_no));
          dispatch(UserEmail(res.data.item.mb_email));
          dispatch(UserName(res.data.item.mb_name));
          dispatch(UserMobile(res.data.item.mb_hp));
          dispatch(UserMobileCfm(res.data.item.mb_1));
          dispatch(UserCompany(res.data.item.mb_2));
          dispatch(UserLevel(res.data.item.mb_level));
          dispatch(UserProfile(res.data.item.mb_profile));
          dispatch(UserPtype(res.data.item.ptype));
          dispatch(UserLicense(res.data.item.license));
          dispatch(UserLicenseSource(res.data.item.license_source));
          dispatch(UserCompanyFile(res.data.item.mb_5));
          dispatch(UserCompanyFileName(res.data.item.mb_10));
          dispatch(UserCate1(res.data.item.cate1));
          dispatch(UserCaId(res.data.item.ca_id));
          dispatch(UserCaName(res.data.item.ca_name));
          dispatch(UserDescription(res.data.item.description));
          dispatch(UserBusinessTime(res.data.item.mb_7));
          dispatch(UserCloseDay(res.data.item.mb_8));
          dispatch(UserUsed(res.data.item.used));
          dispatch(UserBankName(res.data.item.bank_name));
          dispatch(UserBankAccount(res.data.item.bank_account));
          dispatch(UserBankDepositor(res.data.item.bank_depositor));
          dispatch(UserEstimateCnt(res.data.item.estimate_cnt));
          dispatch(UserNoticeYn(res.data.item.notice_yn));
          dispatch(UserQaYn(res.data.item.qa_yn));
          dispatch(UserEstimateYn(res.data.item.estimate_yn));
          dispatch(UserPortfolio(res.data.item.portfolioImg));
          dispatch(UserLocation(res.data.item.location));

          if (autoLogin) {
            storeData();
            setLoading(false);
          } else {
            setLoading(false);
          }
          const resetAction = CommonActions.reset({
            index: 1,
            routes: [
              { name: 'Stack' },
            ],
          });
          navigation.dispatch(resetAction);
        } else {
          setLoading(false);
          Alert.alert(res.data.message, '다시 확인해주세요.', [
            {
              text: '확인',
              onPress: () => loginEmailRef.current.focus(),
            },
          ]);
        }
      })
      .catch((err) => {
        setLoading(false);
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
      });
  };

  return (
    <>
    {isLoading && (
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          flex: 1,
          height: Dimensions.get('window').height,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
          elevation: 0,
          backgroundColor: 'rgba(255,255,255,0.5)',
        }}>
        <ActivityIndicator size="large" color="#00A170" />
      </View>
    )}
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
    </>
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
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default Login;
