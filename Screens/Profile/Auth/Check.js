import * as React from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {setFcmToken} from '../../../Modules/InfoReducer';
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
import Auth from '../../../src/api/Auth.js';

const Check = (props) => {
  const navigation = props.navigation;

  const dispatch = useDispatch();

  // FCM 토큰과 플랫폼 가져오기
  const getTokenPlatformAPI = () => {
    messaging()
      .getToken()
      .then((currentToken) => {
        dispatch(setFcmToken(currentToken));

        if (Platform.OS === 'ios') {
          getData(currentToken, 'ios');
        } else {
          getData(currentToken, 'aos');
        }
      })
      .catch((err) =>
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]),
      );
  };

  //  Async Storage에 UserID, UserPwd가 있는지 확인(자동로그인의 경우)
  const getData = async (token, device) => {
    try {
      const jsonValue = await AsyncStorage.getItem('@paper_info');
      if (jsonValue !== null) {
        const UserInfo = JSON.parse(jsonValue);
        const uId = UserInfo.userId;
        const uPwd = UserInfo.userPwd;
        // 있다면 로그인API 호출 (UserID, UserPwd, FcmToken, Platform)
        login(uId, uPwd, token, device);
      } else {
        // 없다면 로그인 화면으로 이동
        navigation.navigate('Login');
      }
    } catch (e) {
      // error reading value
      console.log('스토리지 에러', e);
    }
  };

  // 로그인 API
  const login = (id, pwd, fToken, cDevice) => {
    Auth.onLogin(id, pwd, fToken, cDevice)
      .then((res) => {
        console.log('파트너스 check login', res);
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

          navigation.navigate('Stack');
        } else {
          navigation.navigate('Login');
        }
      })
      .catch((err) => {
        navigation.navigate('Login');
      });
  };

  React.useEffect(() => {
    getTokenPlatformAPI();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00A170',
      }}>
      <Text style={{fontFamily: 'SCDream4', color: '#fff', marginBottom: 10}}>
        사용자 확인중...
      </Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default Check;
