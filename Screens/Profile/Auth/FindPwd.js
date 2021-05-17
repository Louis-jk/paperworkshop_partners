import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';

import DetailHeader from '../../Common/DetailHeader';
import Auth from '../../../src/api/Auth';
import Timer from '../../Common/Timer';


const FindPwd = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const mobileRef = React.useRef(null);
  const mobileCertNumRef = React.useRef(null);

  // 인증시 카운터
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [isCounter, setIsCounter] = React.useState(false);
  const confirmCount = (num) => {
    setIsCounter(true);
    setMinutes(num);
    // setSeconds(num);
  };
  const confirmClearCount = (num) => {
    setIsCounter(false);
    setMinutes(num);
    // setSeconds(num);
  };

  const [userId, setUserId] = React.useState(null);
  const [userMobile, setUserMobile] = React.useState(null);
  const [mobileCertNum, setMobileCertNum] = React.useState(null);

  // 모바일 인증 아이디 저장 및 버튼 색상 변화 상태
  const [mobileConfirmId, setMobileConfirmId] = React.useState(null);
  const [isMobileConfimed, setMobileConfimed] = React.useState(false);

  const [isSend, setIsSend] = React.useState(false);

  // 본인 인증 시간 초과의 경우 상태관리
  const [reSend, setReSend] = React.useState(false);
  const [reSendStatus, setReSendStatus] = React.useState('n');
  const onFailConfirm = () => {
    setIsSend(false);
    setReSend(true);
    setReSendStatus('y');
  };

  const getUserIdStep01 = () => {
    if (userId === null) {
      Alert.alert('이메일(아이디)를 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    }
    if (userMobile === null) {
      Alert.alert('휴대폰 번호를 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    } else {
      Auth.onSearchPwdStep01(userId, userMobile, '4')
        .then((res) => {
          if (res.data.result === '1') {
            Alert.alert(
              `${userMobile}로 인증번호가 발송되었습니다.`,
              '인증번호 확인 후 입력해주세요.',
              [
                {
                  text: '확인',
                  onPress: () => {
                    setIsSend(true);
                    confirmCount(3);
                  },
                },
              ],
            );
          } else {
            Alert.alert(res.data.message, '', [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) => {
          Alert.alert(err, '관리자에게 문의하세요.', '', [
            {
              text: '확인'
            }
          ]);
        }
       );
    }
  };

  const getUserIdStep02 = () => {
    if (userId === null) {
      Alert.alert('이메일(아이디)를 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
      return false;
    } else if (userMobile === null) {
      Alert.alert('휴대폰 번호를 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
      return false;
    } else if (mobileCertNum === null) {
      Alert.alert('인증번호를 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
      return false;
    } else {
      Auth.onSearchPwdStep02(
        userId,
        userMobile,
        mobileCertNum,
        '4',
        reSendStatus,
        // check_yn ?
      )
        .then((res) => {
          if (res.data.result.result === '1' && res.data.result.item === 'Y') {
            Alert.alert(
              res.data.result.message,
              '새로운 비밀번호를 입력해주세요.',
              [
                {
                  text: '확인',
                  onPress: () => {
                    setMobileConfimed(true);
                    confirmClearCount(0);
                  },
                },
              ],
            );
          } else {
            Alert.alert(res.data.result.message, '', [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) => Alert.alert(`${err.messaging()}`));
    }
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          {/* 이메일 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              이메일 (아이디)
            </Text>
            <TextInput
              value={userId}
              placeholder="이메일을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={[
                styles.normalText,
                {
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                },
              ]}
              onChangeText={(text) => setUserId(text)}
              autoCapitalize="none"
              keyboardType="email-address"
              onSubmitEditing={() => mobileRef.current.focus()}
            />
          </View>
          {/* // 이메일 */}

          {/* 휴대폰 번호  */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              휴대폰 번호
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                ref={mobileRef}
                value={userMobile}
                placeholder="휴대전화번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={[
                  styles.normalText,
                  {
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    marginRight: 10,
                  },
                ]}
                onChangeText={(text) => {
                  setIsSend(false);
                  setUserMobile(text);
                }}
                editable={!isSend ? true : false}
                keyboardType="number-pad"
                autoCapitalize="none"
                onSubmitEditing={() => getUserIdStep01()}
              />
              <TouchableOpacity
                onPress={() => getUserIdStep01()}
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: isSend ? '#ccc' : '#00A170',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}
                disabled={isSend ? true : false}>
                <Text
                  style={[
                    styles.normalText,
                    {color: '#fff', textAlign: 'center'},
                  ]}>
                  인증번호 전송
                </Text>
              </TouchableOpacity>
            </View>
            {isCounter ? (
              <Timer
                minutes={minutes}
                setMinutes={setMinutes}
                seconds={seconds}
                setSeconds={setSeconds}
                onFailConfirm={onFailConfirm}
              />
            ) : null}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                ref={mobileCertNumRef}
                value={mobileCertNum}
                placeholder="인증번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={[
                  styles.normalText,
                  {
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    // marginRight: 10,
                  },
                ]}
                onChangeText={(text) => {
                  setMobileConfimed(false);
                  setMobileConfirmId(text);
                  setMobileCertNum(text);
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
                editable={isMobileConfimed ? false : true}
                onSubmitEditing={() => getUserIdStep02()}
              />
              {/* <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={[
                    styles.normalText,
                    {color: '#fff', textAlign: 'center'},
                  ]}>
                  인증번호 확인
                </Text>
              </TouchableOpacity> */}
            </View>
          </View>
          {/* // 휴대폰 번호  */}
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          {isMobileConfimed ? (
            <TouchableOpacity
              onPress={() => navigation.navigate('SetPwd', {mb_email: userId})}
              activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>비밀번호 변경하기</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => getUserIdStep02()}
              activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>비밀번호 찾기</Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.8}>
            <View style={styles.cancelBtn}>
              <Text style={styles.cancelBtnText}>취소</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRowCenter: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profileBox: {
    marginBottom: 20,
  },
  profileTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    lineHeight: 19,
    marginBottom: 7,
  },
  profileDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    lineHeight: 16,
    color: '#111',
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
  cancelBtn: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
  picker: {
    width: 180,
  },
  listWrap: {
    paddingVertical: 20,
  },
  listTitle: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#00A170',
  },
  listDday: {
    fontFamily: 'SCDream4',
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#A2A2A2',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
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

export default FindPwd;
