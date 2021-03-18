import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';

import {useSelector} from 'react-redux';

import Header from '../../Common/Header';
import Auth from '../../../src/api/Auth';

const Signed = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {fcmToken} = useSelector((state) => state.InfoReducer);
  const {mb_email, mb_password} = useSelector((state) => state.JoinReducer);
  const [checkPlatform, setCheckPlatform] = React.useState(null); // OS 체크

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      setCheckPlatform('ios');
    } else {
      setCheckPlatform('aos');
    }
  }, []);

  const onLogin = () => {
    Auth.onLogin(mb_email, mb_password, fcmToken, checkPlatform)
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
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 18,
              color: '#00A170',
              marginTop: 20,
            }}>
            회원가입이 정상적으로 완료되었습니다.
          </Text>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 16,
              color: '#111',
              marginTop: 10,
              marginBottom: 30,
            }}>
            최고관리자의 승인 이후 원활한 이용이 가능합니다.
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <TouchableOpacity onPress={() => onLogin()} activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>홈으로</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#00A170',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
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

export default Signed;
