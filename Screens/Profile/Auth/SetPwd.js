import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';
import DetailHeader from '../../Common/HeaderBackBtnNotSearch';
import Auth from '../../../src/api/Auth.js';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const SetPwd = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const userId = props.route.params.mb_email;

  const pwdReRef = React.useRef(null);

  // 유효성 체크
  const validationSchema = yup.object().shape({
    register_pw: yup
      .string()
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{8,16}$/,
        {
          message:
            '비밀번호는 8자리 이상 16자리 이하로 영문 소문자/대문자, 숫자, 특수기호 조합으로 입력해주세요.',
        },
      )
      .required('비밀번호를 입력해주세요.')
      .label('Password')
      .min(6, '비밀번호는 6자리 이상 입력해주세요.')
      .max(20, '비밀번호는 20자리 이하로 입력해주세요'),
    register_confirmPw: yup
      .string()
      .required('비밀번호를 재입력 해주세요.')
      .label('비밀번호 매칭 확인')
      .test(
        'passwords-match',
        '재입력하신 비밀번호가 초기 비밀번호와 일치하지 않습니다.',
        function (value) {
          return this.parent.register_pw === value;
        },
      ),
  });

  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  const [pwdReEyes, setPwdReEyes] = React.useState(true);
  const togglePwdReEyes = () => {
    setPwdReEyes(!pwdReEyes);
  };

  const setUserNewPwd = (mb_id, mb_password, mb_password_re) => {
    Auth.onSetPwd(mb_id, mb_password, mb_password_re)
      .then((res) => {
        if (res.data.result === '1') {
          navigation.navigate('SetPwdComplete');
        } else {
          Alert.alert(res.data.message, '다시 확인해주세요.', [
            {
              text: '확인',
            },
          ]);
        }
        // navigation.navigate('SetPwdComplete')
      })
      .catch((err) =>
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]),
      );
  };

  return (
    <>
     <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            register_pw: '',
            register_confirmPw: '',
          }}
          onSubmit={(values, actions) => {
            setUserNewPwd(
              userId,
              values.register_pw,
              values.register_confirmPw,
            );

            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}>
          {(formikProps) => (
            <>
              <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                <View style={{marginBottom: 20}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    새로운 비밀번호
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      marginBottom:
                        formikProps.touched.register_pw &&
                        formikProps.errors.register_pw
                          ? 0
                          : 5,
                      height: 50,
                    }}>
                    <TextInput
                      placeholder="새로운 비밀번호를 입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[styles.normalText, {width: '90%'}]}
                      onChangeText={formikProps.handleChange('register_pw')}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_pw')}
                      secureTextEntry={pwdEyes}
                      onSubmitEditing={() => pwdReRef.current.focus()}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={togglePwdEyes}>
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
                  {!formikProps.values.register_pw &&
                  !formikProps.errors.register_pw ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: SCDream4,
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#B5B5B5',
                        lineHeight: 18,
                        marginBottom: 10,
                      }}>
                      ※ 비밀번호는 영문, 숫자, 특수기호 조합으로 8자리~16자리
                      이내로 입력해주세요.
                    </Text>
                  ) : formikProps.touched.register_pw &&
                    formikProps.errors.register_pw ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: SCDream4,
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#00A170',
                        marginBottom: 10,
                        marginTop: 5,
                      }}>
                      {formikProps.touched.register_pw &&
                        formikProps.errors.register_pw}
                    </Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      marginBottom:
                        formikProps.touched.register_pw &&
                        formikProps.errors.register_pw
                          ? 5
                          : 5,
                      height: 50,
                    }}>
                    <TextInput
                      ref={pwdReRef}
                      placeholder="새로운 비밀번호를 재입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[styles.normalText, {width: '90%'}]}
                      onChangeText={formikProps.handleChange(
                        'register_confirmPw',
                      )}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_confirmPw')}
                      secureTextEntry={pwdReEyes}
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={togglePwdReEyes}>
                      <Image
                        source={
                          pwdReEyes
                            ? require('../../../src/assets/icon_eye.png')
                            : require('../../../src/assets/icon_eye_on.png')
                        }
                        resizeMode="center"
                        style={{width: 35, height: 20}}
                      />
                    </TouchableOpacity>
                  </View>
                  {formikProps.touched.register_confirmPw &&
                    formikProps.errors.register_confirmPw && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: SCDream4,
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 5,
                        }}>
                        {formikProps.touched.register_confirmPw &&
                          formikProps.errors.register_confirmPw}
                      </Text>
                    )}
                </View>
              </View>

              <View style={{paddingHorizontal: 20, marginBottom: 50}}>
                <TouchableOpacity
                  onPress={formikProps.handleSubmit}
                  activeOpacity={0.8}>
                  <View style={[styles.submitBtn, {marginBottom: 10}]}>
                    <Text style={styles.submitBtnText}>비밀번호 변경</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  activeOpacity={0.8}>
                  <View style={styles.cancelBtn}>
                    <Text style={styles.cancelBtnText}>취소</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
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
    fontFamily: SCDream5,
    fontSize: 15,
    lineHeight: 19,
    marginBottom: 7,
  },
  profileDesc: {
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontFamily: SCDream4,
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#00A170',
  },
  listDday: {
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
});

export default SetPwd;
