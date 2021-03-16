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

import {useDispatch} from 'react-redux';

import {Formik} from 'formik';
import * as yup from 'yup';
import DocumentPicker from 'react-native-document-picker';

// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

import DetailHeader from '../../Common/DetailHeader';
import RegCates from './RegCates';
import Auth from '../../../src/api/Auth';
import Timer from '../../Common/Timer';
import {
  joinEmail,
  joinPwd,
  joinName,
  joinMobile,
  joinMobileCfm,
  joinCompany,
  joinLicense,
  joinLocation,
  joinCate1,
  joinCaId,
  joinBankName,
  joinBankAccount,
  joinBankDepositor,
} from '../../../Modules/JoinReducer';

const Register = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);

  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [businessName, setBusinessName] = React.useState('');
  const [mobileCert, setMobileCert] = React.useState(null);
  const [bank, setBank] = React.useState('');
  const [bankAccount, setBankAccount] = React.useState('');
  const [depositor, setDepositor] = React.useState('');

  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const passwordCfmRef = React.useRef(null);
  const nameRef = React.useRef(null);
  const mobileRef = React.useRef(null);
  const mobileCfmRef = React.useRef(null);
  const companyRef = React.useRef(null);
  const bankNameRef = React.useRef(null);
  const bankAccountRef = React.useRef(null);
  const bankDepoRef = React.useRef(null);

  const regionCount = [
    'seoul',
    'busan',
    'daegu',
    'incheon',
    'gwangju',
    'sejong',
    'ulsan',
    'gyeongi',
    'gangwon',
    'choongcheong',
    'jeonra',
    'gyeongsang',
    'jeju',
  ];
  // const [region, setRegion] = React.useState('시/도 전체');
  const [isActiveToggleRegion, setIsActiveToggleRegion] = React.useState(false);
  const toggleRegion = () => {
    setIsActiveToggleRegion(!isActiveToggleRegion);
  };

  const [printDetailType, setPrintDetail] = React.useState(null);
  const [isActiveToggleDetail, setIsActiveToggleDetail] = React.useState(false);
  const toggleDetail = () => {
    setIsActiveToggleDetail(!isActiveToggleDetail);
  };

  // 아이디 중복체크
  const [checkedId, setCheckedId] = React.useState(false);

  const checkUserId = (register_id) => {
    const reg = RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );

    const checkRegId = register_id;

    if (register_id == '') {
      Alert.alert('이메일을 입력해주세요.');
    } else if (reg.test(checkRegId) === false) {
      Alert.alert(
        '이메일 형식이 아닙니다.',
        '이메일 형식이 맞는지 확인해주세요.',
      );
      return false;
    } else {
      Auth.onEmailCheck(register_id)
        .then((res) => {
          if (res.data.result == '1') {
            Alert.alert('사용 가능한 이메일입니다.', '', [
              {
                text: '확인',
              },
            ]);
            setCheckedId(true);
          } else {
            IdAlertMsg();
          }
        })
        .catch((err) =>
          Alert.alert('문제가 있습니다.', err, [
            {
              text: '확인',
            },
          ]),
        );
    }
  };

  const IdAlertMsg = () => {
    setCheckedId(false);
    Alert.alert(
      '이미 사용 중인 아이디입니다.',
      '다른 아이디를 사용해 주십시요.',
      [
        {
          text: '확인',
        },
      ],
    );
  };

  // 모바일 번호 임시 저장
  const [mobileNo, setMobileNo] = React.useState(null);

  // 모바일 인증 아이디 저장 및 버튼 색상 변화 상태
  const [mobileConfirmId, setMobileConfirmId] = React.useState(null);
  const [isMobileConfimed, setMobileConfimed] = React.useState(false);

  console.log('입력된 인증번호', mobileConfirmId);

  // 본인 인증 시간 초과의 경우 상태관리
  const [reSend, setReSend] = React.useState(false);
  const [reSendStatus, setReSendStatus] = React.useState('n');
  const onFailConfirm = () => {
    setIsSend(false);
    setReSend(true);
    setReSendStatus('y');
  };

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

  // 본인인증(휴대전화번호) 문자발송 버튼
  const [isSend, setIsSend] = React.useState(false);
  const authenticateSMS = (register_mobile) => {
    if (register_mobile.length > 11) {
      Alert.alert('휴대전화번호가 올바르지 않습니다.');
      return false;
    }

    if (register_mobile === '') {
      Alert.alert('휴대전화번호를 입력해주세요.');
    } else {
      Alert.alert(
        `${register_mobile}로 인증번호가 발송되었습니다.`,
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
      Auth.onMobileConfirm(register_mobile)
        .then((res) => {
          if (res.data.result == '1') {
            setMobileConfimed(false);
          } else {
            Alert.alert('휴대전화번호를 올바르게 입력해주세요.');
          }
          console.log('휴대폰 인증 response', res);
        })
        .catch((err) => console.log(err));
    }
  };

  // 본인인증(휴대전화번호) 인증번호 입력 시간 초과로 재전송일 경우 로직
  const reAuthenticateSMS = (register_mobile) => {
    if (register_mobile.length > 11) {
      Alert.alert('휴대전화번호가 올바르지 않습니다.');
      return false;
    }

    if (register_mobile === '') {
      Alert.alert('휴대전화번호를 입력해주세요.');
    } else {
      Alert.alert(
        `${register_mobile}로 인증번호가 발송되었습니다.`,
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

      Auth.onMobileConfirmNo(mobileNo, null, 'Y')
        .then((res) => {
          if (res.data.result == '1') {
            setMobileConfimed(false);
            confirmClearCount(0);
          } else {
            Alert.alert(
              '휴대전화번호를 올바르게 입력해주세요.',
              res.data.message,
              [
                {
                  text: '확인',
                },
              ],
            );
          }
          console.log('휴대폰 인증 response', res);
        })
        .catch((err) => console.log(err));
    }
  };

  // 본인인증(휴대전화번호) 인증번호 확인 버튼
  const confirmMobile = (register_confirmMobile) => {
    if (register_confirmMobile === '') {
      Alert.alert('인증번호를 입력해주세요.');
      return false;
    } else if (isSend === false) {
      Alert.alert(
        '정확한 번호로 문자발송해주세요.',
        '문자발송을 완료해주세요.',
        [
          {
            text: '확인',
            onPress: () => {},
          },
        ],
      );
      return false;
    } else {
      Auth.onMobileConfirmNo(mobileNo, mobileConfirmId, 'N')
        .then((res) => {
          console.log('본인 인증 response 11', res);
          if (res.data.result == '1') {
            Alert.alert('본인 인증되었습니다.', res.data.message, [
              {
                text: '확인',
                onPress: () => {
                  setMobileConfimed(true);
                  confirmClearCount(0);
                },
              },
            ]);
          } else {
            Alert.alert('인증에 실패하였습니다.', res.data.message, [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  //  지역 선택 (최대 5 지역까지)
  const [region, setRegion] = React.useState([]);
  const [countRegion, setCountRegion] = React.useState(0);
  const setRegionChoise = (v) => {
    if (v) {
      const alreadyValue = region.find((re) => re === v);
      if (alreadyValue) {
        setRegion(region.filter((re) => re !== alreadyValue));
        setCountRegion((prev) => prev - 1);
      } else if (countRegion < 5) {
        setRegion((prev) => [...prev, v]);
        setCountRegion((prev) => prev + 1);
      } else {
        Alert.alert('최대 5 지역까지 정하실 수 있습니다.');
        return false;
      }
    } else {
      return false;
    }
  };

  const [categories, setCategories] = React.useState([1]);

  const addCategory = () => {
    if (categories.length < 10) {
      setCategories((prev) => [...prev, prev + 1]);
    } else {
      Alert.alert('카테고리는 10개까지만 지정하실 수 있습니다.', '', [
        {
          text: '확인',
        },
      ]);
    }
  };

  console.log('categories', categories);

  const removeCategory = () => {
    setCategories((prev) => [...prev, categories.pop()]);
  };

  // const categoryRef = React.useRef(null);
  const cloneElement = () => {
    const elementAssign = Object.assign({}, categoryRef.current);
    console.log('elementAssign', elementAssign);
  };

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  const [pwdReEyes, setPwdReEyes] = React.useState(true);
  const togglePwdReEyes = () => {
    setPwdReEyes(!pwdReEyes);
  };

  // 파일 업로드 (document picker)

  // 사업자 등록증
  const [fileUrlCurrent, setFileUrlCurrent] = React.useState(null);
  const [fileTypeCurrent, setFileTypeCurrent] = React.useState(null);
  const [fileNameCurrent, setFileNameCurrent] = React.useState(null); // 확장자 분리 이미지명
  const [fileOriginName, setFileOriginName] = React.useState(null); // 확장자 달린 이미지명
  const [fileSizeCurrent, setFileSizeCurrent] = React.useState(null);
  const [extension, setExtension] = React.useState(null);
  const [licenseFile, setLicenseFile] = React.useState(null);

  const filePicker01 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // console.log('이미지', res);
      const fileName = res.name.split('.');
      const extArray = res.type.split('/');
      setFileUrlCurrent(res.uri);
      setFileTypeCurrent(res.type);
      setFileOriginName(res.name);
      setFileNameCurrent(fileName[0]);
      setFileSizeCurrent(res.size);
      setExtension(extArray[1]);
      setLicenseFile({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  console.log('이미지', fileUrlCurrent);

  // 회사 소개서
  const [fileUrlCurrent02, setFileUrlCurrent02] = React.useState(null);
  const [fileTypeCurrent02, setFileTypeCurrent02] = React.useState(null);
  const [fileNameCurrent02, setFileNameCurrent02] = React.useState(null); // 확장자 분리 이미지명
  const [fileOriginName02, setFileOriginName02] = React.useState(null); // 확장자 달린 이미지명
  const [fileSizeCurrent02, setFileSizeCurrent02] = React.useState(null);
  const [extension02, setExtension02] = React.useState(null);
  const [companyInfoFile, setComponyInfoFile] = React.useState(null);

  const filePicker02 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      // console.log('이미지', res);
      const fileName = res.name.split('.');
      const extArray = res.type.split('/');
      setFileUrlCurrent02(res.uri);
      setFileTypeCurrent02(res.type);
      setFileOriginName02(res.name);
      setFileNameCurrent02(fileName[0]);
      setFileSizeCurrent02(res.size);
      setExtension02(extArray[1]);
      setComponyInfoFile({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  console.log('licenseFile', licenseFile);
  console.log('companyInfoFile', companyInfoFile);

  // 회원가입

  const [licenseObj, setLicenseObj] = React.useState(null);
  const [cate1Arr, setCate1Arr] = React.useState(null);
  const [caIdArr, setCaIdArr] = React.useState(null);

  const beforeSignIn = (
    email,
    password,
    passwordRe,
    name,
    mobile,
    mobileCfm,
    company,
    bankName,
    bankAccount,
    bankDepositor,
  ) => {
    const frmData = new FormData();
    frmData.append('method', 'proc_add_partner');
    frmData.append('mb_id', email);
    frmData.append('mb_password', password);
    frmData.append('mb_password_re', passwordRe);
    frmData.append('mb_name', name);
    frmData.append('mb_hp', mobile);
    frmData.append('mb_1', mobileCfm);
    frmData.append('mb_2', company);
    frmData.append('license[]', licenseFile);
    frmData.append('location[]', region);
    frmData.append('cate1[]', cate1Arr);
    frmData.append('ca_id[]', caIdArr);
    frmData.append('bank_name', bankName);
    frmData.append('bank_account', bankAccount);
    frmData.append('bank_depositor', bankDepositor);

    console.log('frmData', frmData);
    // signIn(frmData);

    dispatch(joinEmail(email));
    dispatch(joinPwd(password));
    dispatch(joinName(name));
    dispatch(joinMobile(mobile));
    dispatch(joinMobileCfm(mobileCfm));
    dispatch(joinCompany(company));

    dispatch(joinLicense(licenseFile));
    // dispatch(joinLocation(values.register_company));
    // dispatch(joinCate1(values.register_company));
    // dispatch(joinCaId(values.register_company));

    dispatch(joinBankName(bankName));
    dispatch(joinBankAccount(bankAccount));
    dispatch(joinBankDepositor(bankDepositor));
  };

  const signIn = (frmData) => {
    Auth.onSignIn(frmData)
      .then((res) => {
        if (res.data.result === '1') {
          navigation.navigate('Signed');
        } else {
          Alert.alert('회원가입에 실패하였습니다.', res.data.message, [
            {
              text: '확인',
            },
          ]);
        }
      })
      .catch((err) =>
        Alert.alert(`${err.message()}`, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]),
      );
  };

  // 유효성 체크
  const validationSchema = yup.object().shape({
    register_email: yup
      .string()
      .email('이메일 형식에 맞게 입력해주세요.')
      .required('이메일을 입력해주세요.')
      .label('Email'),
    register_pw: yup
      .string()
      .matches(
        /^(?=.*[a-zA-Z])(?=.*[!@#$%&\w'*+-/=?^_{|}~])(?=.*[0-9]).{6,20}$/,
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
    register_name: yup.string().required('성함을 입력해주세요.').label('Name'),
    register_mobile: yup
      .string()
      .required('휴대전화번호를 입력해주세요.')
      .label('Mobile'),
    register_confirmMobile: yup
      .string()
      .required('인증번호를 입력해주세요.')
      .label('Mobile Confirm'),
    register_company: yup
      .string()
      .required('회사명을 입력해주세요.')
      .label('Company'),
    register_bankName: yup
      .string()
      .required('은행명을 입력해주세요.')
      .label('BankName'),
    register_bankAccount: yup
      .string()
      .required('계좌번호를 입력해주세요.')
      .label('BankAccount'),
    register_bankDepositor: yup
      .string()
      .required('예금주를 입력해주세요.')
      .label('BankDepositor'),
  });

  const categorySelectorDiv = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{width: '40%'}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: isActiveTogglePrintType ? 0 : 4,
              borderBottomLeftRadius: isActiveTogglePrintType ? 0 : 4,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              onPress={togglePrintType}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>{printType}</Text>
              {isActiveTogglePrintType ? (
                <Image
                  source={require('../../../src/assets/arr01_top.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              ) : (
                <Image
                  source={require('../../../src/assets/arr01.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              )}
            </TouchableOpacity>
          </View>
          {isActiveTogglePrintType && (
            <View
              style={{
                position: 'absolute',
                top: 51,
                left: 0,
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                zIndex: 100,
              }}>
              {printTypes.map((v, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{
                    paddingVertical: 7,
                    backgroundColor: '#fff',
                    marginBottom: 7,
                    zIndex: 100,
                  }}
                  activeOpacity={0.8}
                  onPress={() => {
                    setPrintType(v);
                    setIsActiveTogglePrintType(false);
                    setIsActiveToggleDetail(false);
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        <View style={{width: '59%'}}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              borderBottomRightRadius: isActiveToggleDetail ? 0 : 4,
              borderBottomLeftRadius: isActiveToggleDetail ? 0 : 4,
              backgroundColor: '#fff',
            }}>
            <TouchableOpacity
              onPress={toggleDetail}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>
                {printType === '패키지' && !printDetailType
                  ? packageTypes[0]
                  : printType === '일반인쇄' && !printDetailType
                  ? generalTypes[0]
                  : printType === '기타인쇄' && !printDetailType
                  ? etcTypes[0]
                  : printDetailType}
              </Text>
              {isActiveTogglePrintType ? (
                <Image
                  source={require('../../../src/assets/arr01_top.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              ) : (
                <Image
                  source={require('../../../src/assets/arr01.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20}}
                />
              )}
            </TouchableOpacity>
          </View>
          {isActiveToggleDetail && (
            <View
              style={{
                position: 'absolute',
                top: 51,
                left: 0,
                width: '100%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                zIndex: 100,
              }}>
              {printType === '패키지'
                ? packageTypes.map((v, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{
                        paddingVertical: 7,
                        backgroundColor: '#fff',
                        marginBottom: 7,
                        zIndex: 100,
                      }}
                      activeOpacity={0.8}
                      onPress={() => {
                        setPrintDetail(v);
                        setIsActiveToggleDetail(false);
                        // setIsActiveTogglePrintType(false);
                      }}>
                      <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                    </TouchableOpacity>
                  ))
                : printType === '일반인쇄'
                ? generalTypes.map((v, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{
                        paddingVertical: 7,
                        backgroundColor: '#fff',
                        marginBottom: 7,
                        zIndex: 100,
                      }}
                      activeOpacity={0.8}
                      onPress={() => {
                        setPrintDetail(v);
                        setIsActiveToggleDetail(false);
                        // setIsActiveTogglePrintType(false);
                      }}>
                      <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                    </TouchableOpacity>
                  ))
                : etcTypes.map((v, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{
                        paddingVertical: 7,
                        backgroundColor: '#fff',
                        marginBottom: 7,
                        zIndex: 100,
                      }}
                      activeOpacity={0.8}
                      onPress={() => {
                        setPrintDetail(v);
                        setIsActiveToggleDetail(false);
                        // setIsActiveTogglePrintType(false);
                      }}>
                      <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                    </TouchableOpacity>
                  ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            register_email: '',
            register_pw: '',
            register_confirmPw: '',
            register_name: '',
            register_mobile: '',
            register_confirmMobile: '',
            register_company: '',
            register_bankName: '',
            register_bankAccount: '',
            register_bankDepositor: '',
          }}
          onSubmit={(values, actions) => {
            if (checkedId) {
              let mb_1 = isMobileConfimed ? 'Y' : 'N';
              beforeSignIn(
                values.register_email,
                values.register_pw,
                values.register_confirmPw,
                values.register_name,
                values.register_mobile,
                values.register_confirmMobile,
                values.register_company,
                values.register_bankName,
                values.register_bankAccount,
                values.register_bankDepositor,
              );
            } else {
              Alert.alert('인증되지 않은 입력란이 있습니다.', '확인해주세요.', [
                {
                  text: '확인',
                },
              ]);
              return false;
            }
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 1000);
          }}
          validationSchema={validationSchema}>
          {(formikProps) => (
            <>
              <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
                {/* 이메일 */}
                <View style={{marginBottom: 25}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    이메일
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      ref={emailRef}
                      placeholder="이메일을 입력해주세요."
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
                          height: 50,
                        },
                      ]}
                      onChangeText={(value) => {
                        setCheckedId(false);
                        formikProps.setFieldValue('register_email', value);
                      }}
                      onBlur={formikProps.handleBlur('register_email')}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onSubmitEditing={() =>
                        checkUserId(formikProps.values.register_email)
                      }
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        checkUserId(formikProps.values.register_email);
                        Keyboard.dismiss();
                      }}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: checkedId ? '#ccc' : '#00A170',
                        borderRadius: 4,
                        height: 50,
                        paddingHorizontal: 20,
                      }}
                      disabled={checkedId ? true : false}>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#fff', textAlign: 'center'},
                        ]}>
                        중복확인
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {formikProps.touched.register_email &&
                    formikProps.errors.register_email && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 2,
                        }}>
                        {formikProps.touched.register_email &&
                          formikProps.errors.register_email}
                      </Text>
                    )}
                  <Text
                    style={[
                      styles.normalText,
                      {color: '#B5B5B5', fontSize: 12},
                    ]}>
                    * 세금계산서 발행용 이메일을 등록해주세요.
                  </Text>
                </View>
                {/* // 이메일 */}

                {/* 비밀번호 */}
                <View style={{marginBottom: 25}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    비밀번호
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
                      ref={passwordRef}
                      placeholder="비밀번호를 입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[styles.normalText, {width: '90%'}]}
                      onChangeText={formikProps.handleChange('register_pw')}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_pw')}
                      secureTextEntry={pwdEyes}
                      onSubmitEditing={() => passwordCfmRef.current.focus()}
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
                        fontFamily: 'SCDream4',
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
                        fontFamily: 'SCDream4',
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
                        formikProps.touched.register_confirmPw &&
                        formikProps.errors.register_confirmPw
                          ? 5
                          : 0,
                      height: 50,
                    }}>
                    <TextInput
                      ref={passwordCfmRef}
                      placeholder="비밀번호를 재입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={[styles.normalText, {width: '90%'}]}
                      onChangeText={formikProps.handleChange(
                        'register_confirmPw',
                      )}
                      autoCapitalize="none"
                      onBlur={formikProps.handleBlur('register_confirmPw')}
                      secureTextEntry={pwdReEyes}
                      onSubmitEditing={() => nameRef.current.focus()}
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
                          fontFamily: 'SCDream4',
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
                {/* // 비밀번호 */}

                {/* 성함  */}
                <View style={{marginBottom: 25}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    성함
                  </Text>
                  <TextInput
                    ref={nameRef}
                    placeholder="성함을 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginBottom:
                          formikProps.touched.register_name &&
                          formikProps.errors.register_name
                            ? 5
                            : 0,
                      },
                    ]}
                    onChangeText={(value) => {
                      formikProps.setFieldValue('register_name', value);
                    }}
                    onBlur={formikProps.handleBlur('register_name')}
                    autoCapitalize="none"
                    onSubmitEditing={() => mobileRef.current.focus()}
                  />
                  {formikProps.touched.register_name &&
                    formikProps.errors.register_name && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 5,
                        }}>
                        {formikProps.touched.register_name &&
                          formikProps.errors.register_name}
                      </Text>
                    )}
                </View>
                {/* // 성함  */}

                {/* 휴대폰 번호  */}
                <View style={{marginBottom: 25}}>
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
                      placeholder="휴대전화번호를 - 빼고 입력해주세요."
                      placeholderTextColor="#A2A2A2"
                      onChangeText={(text) => setMobileNo(text)}
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
                      value={formikProps.values.register_mobile}
                      onChangeText={(value) => {
                        setIsSend(false);
                        formikProps.setFieldValue('register_mobile', value);
                      }}
                      editable={!isSend ? true : false}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      onSubmitEditing={() => {
                        authenticateSMS(formikProps.values.register_mobile);
                        setMobileNo(formikProps.values.register_mobile);
                      }}
                    />
                    {!reSend ? (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          authenticateSMS(formikProps.values.register_mobile);
                          setMobileNo(formikProps.values.register_mobile);
                        }}
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
                    ) : (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          reAuthenticateSMS(formikProps.values.register_mobile);
                          setMobileNo(formikProps.values.register_mobile);
                        }}
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
                          인증번호 재전송
                        </Text>
                      </TouchableOpacity>
                    )}
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
                  {formikProps.touched.register_mobile &&
                    formikProps.errors.register_mobile &&
                    !formikProps.values.register_mobile && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 15,
                        }}>
                        {formikProps.touched.register_mobile &&
                          formikProps.errors.register_mobile}
                      </Text>
                    )}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      ref={mobileCfmRef}
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
                          marginRight: 10,
                          height: 50,
                        },
                      ]}
                      value={formikProps.values.register_confirmMobile}
                      // onChangeText={formikProps.handleChange(
                      //   'register_confirmMobile',
                      // )}
                      // setMobileConfimed(false)
                      onChangeText={(value) => {
                        setMobileConfimed(false);
                        setMobileConfirmId(value);
                        formikProps.setFieldValue(
                          'register_confirmMobile',
                          value,
                        );
                      }}
                      keyboardType="number-pad"
                      autoCapitalize="none"
                      editable={isMobileConfimed ? false : true}
                      onSubmitEditing={() =>
                        confirmMobile(formikProps.values.register_confirmMobile)
                      }
                    />
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() =>
                        confirmMobile(formikProps.values.register_confirmMobile)
                      }
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: isMobileConfimed ? '#ccc' : '#00A170',
                        borderRadius: 4,
                        height: 50,
                        paddingHorizontal: 20,
                      }}
                      disabled={isMobileConfimed ? true : false}>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#fff', textAlign: 'center'},
                        ]}>
                        {isMobileConfimed ? '인증처리 완료' : '인증번호 확인'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {formikProps.touched.register_confirmMobile &&
                  formikProps.errors.register_confirmMobile &&
                  !isMobileConfimed ? (
                    <Text
                      style={{
                        width: '100%',
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 18,
                        color: '#00A170',
                        marginBottom: 15,
                      }}>
                      {formikProps.touched.register_confirmMobile &&
                        formikProps.errors.register_confirmMobile}
                    </Text>
                  ) : null}
                </View>
                {/* // 휴대폰 번호  */}

                {/* 상호명  */}
                <View style={{marginBottom: 25}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    상호명
                  </Text>
                  <TextInput
                    ref={companyRef}
                    placeholder="상호명을 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginBottom:
                          formikProps.touched.register_company &&
                          formikProps.errors.register_company
                            ? 5
                            : 0,
                      },
                    ]}
                    onChangeText={(value) => {
                      formikProps.setFieldValue('register_company', value);
                    }}
                    onBlur={formikProps.handleBlur('register_company')}
                    autoCapitalize="none"
                  />
                  {formikProps.touched.register_company &&
                    formikProps.errors.register_company && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 5,
                        }}>
                        {formikProps.touched.register_company &&
                          formikProps.errors.register_company}
                      </Text>
                    )}
                </View>
                {/* // 상호명  */}

                {/* 사업자 등록증  */}
                <View style={{marginBottom: 25}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    사업자 등록증
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      value={
                        fileNameCurrent
                          ? `${fileNameCurrent}.${
                              extension === 'jpeg' ? 'jpg' : extension
                            }`
                          : null
                      }
                      placeholder="사업자 등록증을 첨부해주세요."
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
                      editable={false}
                    />
                    <TouchableOpacity
                      onPress={filePicker01}
                      activeOpacity={0.8}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00A170',
                        borderRadius: 4,
                        height: 50,
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#fff', textAlign: 'center'},
                        ]}>
                        파일 선택
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    <Image
                      source={{uri: `${fileUrlCurrent}`}}
                      resizeMode="contain"
                      style={{width: 100}}
                    />
                  </View>
                  <Text
                    style={[
                      styles.normalText,
                      {color: '#B5B5B5', fontSize: 12},
                    ]}>
                    * 이미지이나 pdf파일 등 첨부 가능합니다.
                  </Text>
                </View>
                {/* // 사업자 등록증  */}

                {/* 위치  */}
                <View style={{marginBottom: 25}}>
                  <Text style={styles.profileTitle}>위치 (지역)</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      marginBottom: 10,
                    }}>
                    {regionCount.map((r, idx) => (
                      <TouchableOpacity
                        key={idx}
                        activeOpacity={1}
                        hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
                        onPress={() => setRegionChoise(r)}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          marginRight: 20,
                          marginBottom: 15,
                          backgroundColor: region.find((re) => re === r)
                            ? '#00A170'
                            : '#fff',
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderWidth: 1,
                          borderColor: region.find((re) => re === r)
                            ? '#00A170'
                            : '#E3E3E3',
                          borderRadius: 4,
                        }}>
                        <Text
                          style={[
                            styles.normalText,
                            {
                              fontSize: 14,
                              color: region.find((re) => re === r)
                                ? '#fff'
                                : '#B5B5B5',
                            },
                          ]}>
                          {r === 'seoul'
                            ? '서울'
                            : r === 'busan'
                            ? '부산'
                            : r === 'daegu'
                            ? '대구'
                            : r === 'incheon'
                            ? '인천'
                            : r === 'gwangju'
                            ? '광주'
                            : r === 'sejong'
                            ? '세종/대전/청주'
                            : r === 'ulsan'
                            ? '울산'
                            : r === 'gyeongi'
                            ? '경기'
                            : r === 'gangwon'
                            ? '강원'
                            : r === 'choongcheong'
                            ? '충청'
                            : r === 'jeonra'
                            ? '전라'
                            : r === 'gyeongsang'
                            ? '경상'
                            : r === 'jeju'
                            ? '제주'
                            : null}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <Text
                    style={[
                      styles.normalText,
                      {color: '#B5B5B5', fontSize: 12},
                    ]}>
                    * 지역은 최대 5곳까지 등록하실 수 있습니다.
                  </Text>

                  {isActiveToggleRegion && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 80,
                        left: 0,
                        width: '49%',
                        backgroundColor: '#fff',
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderBottomRightRadius: 5,
                        borderBottomLeftRadius: 5,
                        zIndex: 100,
                      }}>
                      {regionCount.map((v, idx) => (
                        <TouchableOpacity
                          key={idx}
                          style={{paddingVertical: 7, marginBottom: 7}}
                          activeOpacity={0.8}
                          onPress={() => {
                            setRegion(v);
                            setIsActiveToggleRegion(false);
                          }}>
                          <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>
                {/* // 위치  */}

                {/* 제작물 카테고리  */}
                <View style={{marginBottom: 25}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: 5,
                    }}>
                    <Text style={[styles.profileTitle]}>제작물 카테고리</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={addCategory}
                        activeOpacity={0.8}
                        style={{
                          backgroundColor: '#fff',
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                          borderWidth: 1,
                          borderColor: '#E3E3E3',
                          borderRadius: 3,
                          marginRight: 10,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SCDream5',
                              fontSize: 20,
                              color: '#00A170',
                              marginRight: 5,
                            }}>
                            +
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              color: '#B5B5B5',
                            }}>
                            추가
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={removeCategory}
                        activeOpacity={0.8}
                        style={{
                          backgroundColor: '#fff',
                          paddingHorizontal: 10,
                          paddingVertical: 2,
                          borderWidth: 1,
                          borderColor: '#E3E3E3',
                          borderRadius: 3,
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              fontFamily: 'SCDream5',
                              fontSize: 20,
                              color: '#00A170',
                              marginRight: 5,
                            }}>
                            -
                          </Text>
                          <Text
                            style={{
                              fontFamily: 'SCDream4',
                              fontSize: 12,
                              color: '#B5B5B5',
                            }}>
                            제거
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {/* RegCates */}
                  {categories.map((c) => (
                    <RegCates key={c} />
                  ))}

                  {/* // RegCates */}
                </View>

                {/* // 제작물 카테고리  */}

                {/* 계좌정보  */}
                <View style={{marginBottom: 25, zIndex: -1}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    계좌정보
                  </Text>
                  <TextInput
                    ref={bankNameRef}
                    placeholder="은행명을 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    onChangeText={formikProps.handleChange('register_bankName')}
                    onBlur={formikProps.handleBlur('register_bankName')}
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginBottom: 5,
                      },
                    ]}
                    onSubmitEditing={() => bankAccountRef.current.focus()}
                  />
                  {formikProps.touched.register_bankName &&
                    formikProps.errors.register_bankName && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 10,
                        }}>
                        {formikProps.touched.register_bankName &&
                          formikProps.errors.register_bankName}
                      </Text>
                    )}
                  <TextInput
                    ref={bankAccountRef}
                    placeholder="계좌번호를 - 빼고 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    onChangeText={formikProps.handleChange(
                      'register_bankAccount',
                    )}
                    onBlur={formikProps.handleBlur('register_bankAccount')}
                    keyboardType="number-pad"
                    style={[
                      styles.normalText,
                      {
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginBottom: 5,
                      },
                    ]}
                    onSubmitEditing={() => bankDepoRef.current.focus()}
                  />
                  {formikProps.touched.register_bankAccount &&
                    formikProps.errors.register_bankAccount && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 10,
                        }}>
                        {formikProps.touched.register_bankAccount &&
                          formikProps.errors.register_bankAccount}
                      </Text>
                    )}
                  <TextInput
                    ref={bankDepoRef}
                    placeholder="예금주를 입력해주세요."
                    placeholderTextColor="#A2A2A2"
                    onChangeText={formikProps.handleChange(
                      'register_bankDepositor',
                    )}
                    onBlur={formikProps.handleBlur('register_bankDepositor')}
                    style={{
                      fontFamily: 'SCDream4',
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      paddingHorizontal: 10,
                      marginBottom: 5,
                    }}
                  />
                  {formikProps.touched.register_bankDepositor &&
                    formikProps.errors.register_bankDepositor && (
                      <Text
                        style={{
                          width: '100%',
                          fontFamily: 'SCDream4',
                          fontSize: 12,
                          lineHeight: 18,
                          color: '#00A170',
                          marginBottom: 5,
                        }}>
                        {formikProps.touched.register_bankDepositor &&
                          formikProps.errors.register_bankDepositor}
                      </Text>
                    )}
                </View>
                {/* // 계좌정보  */}

                {/* 회사 소개서 */}
                {/* 
                <View style={{marginBottom: 25}}>
                  <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                    회사 소개서
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginBottom: 5,
                    }}>
                    <TextInput
                      value={
                        fileNameCurrent02
                          ? `${fileNameCurrent02}.${
                              extension === 'jpeg' ? 'jpg' : extension
                            }`
                          : null
                      }
                      placeholder="회사 소개서를 첨부해주세요."
                      placeholderTextColor="#A2A2A2"
                      style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: '#E3E3E3',
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        marginRight: 10,
                        fontFamily: 'SCDream4',
                      }}
                      editable={false}
                    />
                    <TouchableOpacity
                      onPress={filePicker02}
                      activeOpacity={0.8}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#00A170',
                        borderRadius: 4,
                        height: 50,
                        paddingHorizontal: 20,
                      }}>
                      <Text
                        style={{
                          fontFamily: 'SCDream4',
                          color: '#fff',
                          textAlign: 'center',
                        }}>
                        파일 선택
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={[
                        styles.normalText,
                        {
                          color: '#B5B5B5',
                          fontSize: 12,
                          lineHeight: 20,
                          marginRight: 5,
                        },
                      ]}>
                      *
                    </Text>
                    <View>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#B5B5B5', fontSize: 12, lineHeight: 20},
                        ]}>
                        문서파일(doc, hwp, xls, xlsx) 또는
                        이미지파일(jpg,png,gif)
                      </Text>
                      <Text
                        style={[
                          styles.normalText,
                          {color: '#B5B5B5', fontSize: 12},
                        ]}>
                        첨부 가능합니다.
                      </Text>
                    </View>
                  </View>
                </View> */}

                {/* // 회사 소개서 */}
              </View>

              <View style={{paddingHorizontal: 20, marginBottom: 50}}>
                <TouchableOpacity
                  onPress={() => formikProps.handleSubmit()}
                  activeOpacity={0.8}>
                  <View style={[styles.submitBtn, {marginBottom: 10}]}>
                    <Text style={styles.submitBtnText}>회원가입</Text>
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

export default Register;
