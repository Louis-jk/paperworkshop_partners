import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';

import {useSelector, useDispatch} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob'; // 파일 다운로드 패키지
import DocumentPicker from 'react-native-document-picker'; // 파일 업로드 패키지
import ImagePicker from 'react-native-image-crop-picker';
import FastImage from 'react-native-fast-image';

import Header from '../Common/Header';
import Category from '../../src/api/Category';
import Modal from '../Common/PartnersInfoModal';
import Auth from '../../src/api/Auth';
import {
  UserName,
  UserProfile,
  UserMobile,
  UserMobileCfm,
  UserCompany,
  UserLicense,
  UserLicenseSource,
  UserCompanyFile,
  UserCompanyFileName,
  UserCate1,
  UserCaId,
  UserBankName,
  UserBankAccount,
  UserBankDepositor,
  UserLocation,
} from '../../Modules/UserInfoReducer';
import Timer from '../Common/Timer';

const Edit = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const dispatch = useDispatch();

  const {
    mb_no,
    mb_profile_img,
    ptype,
    mb_2,
    mb_email,
    mb_name,
    mb_hp,
    license,
    license_source,
    company_file,
    company_file_name,
    cate1,
    ca_id,
    bank_name,
    bank_account,
    bank_depositor,
    location,
  } = useSelector((state) => state.UserInfoReducer);

  const [isLoading, setIsLoading] = React.useState(false); // 로딩 유무
  const [regionError, setRegionError] = React.useState(false); // 지역 지정 유효성 체크
  const [categoryError, setCategoryError] = React.useState(false); // 카테고리 지정 유효성 체크
  const [isModalVisible, setModalVisible] = React.useState(false);

  const [imgMime, setImgMime] = React.useState(null);
  const [locationCur, setLocationCur] = React.useState([]);

  const [cateId, setCateId] = React.useState('1'); // 탭 기능으로 해당 카테고리의 id 값
  const [categoryList, setCategoryList] = React.useState([]); // 제작물 카테고리 각 카테고리별 세부 종목 리스트

  const getCategoriesAPI = (cate1) => {
    setIsLoading(true);
    if (cate1) {
      Category.getDetail(cate1)
        .then((res) => {
          if (res.data.result === '1' && res.data.count > 0) {
            setCategoryList(res.data.item);
          } else {
            Alert.alert(res.data.message, '', [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) => {
          Alert.alert(err, '관리자에게 문의하세요.', [
            {
              text: '확인',
            },
          ]);
        });
    } else {
      Category.getDetail(cateId)
        .then((res) => {
          if (res.data.result === '1' && res.data.count > 0) {
            setCategoryList(res.data.item);
          } else {
            Alert.alert(res.data.message, '', [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) => {
          Alert.alert(err, '관리자에게 문의하세요.', [
            {
              text: '확인',
            },
          ]);
        });
    }
  };

  React.useEffect(() => {
    getCategoriesAPI();
  }, []);

  // 프로필 사진 설정
  const [source, setSource] = React.useState(null);

  const pickImageHandler = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      sortOrder: 'none',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperCircleOverlay: true,
      useFrontCamera: false,
      // includeBase64: true,
      cropping: true,
    })
      .then((img) => {
        dispatch(UserProfile(img.path));
        setSource({
          uri: img.path,
          type: img.mime,
          name: img.path.slice(img.path.lastIndexOf('/')),
        });
      })
      .catch((e) => console.log(e));
  };

  // 지역 값
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
        Alert.alert('지역은 최대 5지역까지 정하실 수 있습니다.', '', [
          {
            text: '확인',
          },
        ]);
        return false;
      }
    } else {
      return false;
    }
  };

  //  카테고리 선택 (최대 5개 까지)

  const [categoryArr, setCategoryArr] = React.useState([]); // 제작물 카테고리 대분류 id 세부 종목 id 한묶음씩 배열로 담기
  const [countCategory, setCountCategory] = React.useState(0);

  const setCategoryArrFuc = (d01, d02) => {
    let result = categoryArr.find((x) => x.cate1 === d01 && x.ca_id === d02);

    if (result) {
      let newArr = categoryArr.filter((x) => x !== result);
      console.log('newArr', newArr);
      setCategoryArr(newArr);
      setCountCategory((prev) => prev - 1);
    } else if (countCategory < 5) {
      setCategoryArr((prev) => [...prev, {cate1: d01, ca_id: d02}]);
      setCountCategory((prev) => prev + 1);
    } else {
      Alert.alert(
        '최대 5종목까지 정하실 수 있습니다.',
        '대분류 포함하여 5개까지 추가 가능합니다.',
        [
          {
            text: '확인',
          },
        ],
      );
      return false;
    }
  };

  const extSplitFn = (file) => {
    if (file) {
      const sliceFile = file.slice(mb_profile_img.lastIndexOf('.'));
      setImgMime(sliceFile);
    }
  };

  React.useEffect(() => {
    if (mb_profile_img) {
      extSplitFn(mb_profile_img);
    }

    if (location) {
      const locationArr = location.split(',');
      setRegion(locationArr);
      setCountRegion(locationArr.length);
    }

    if (cate1 !== null && ca_id !== null) {
      let cate1Arr = cate1.split(',');
      let caIdArr = ca_id.split(',');

      cate1Arr.map((ca, key) => {
        setCategoryArr((prev) => [...prev, {cate1: ca, ca_id: caIdArr[key]}]);
        setCountCategory((prev) => prev + 1);
      });
    }

    return () => extSplitFn();
  }, [mb_profile_img]);

  console.log('locationCur', locationCur);
  console.log('region', region);
  console.log('categoryArr', categoryArr);
  console.log('countCategory', countCategory);

  // 파일 다운로드 핸들러
  const fileDownloadHandler = (filePath, fileName) => {
    Alert.alert('파일을 다운로드 하시겠습니까?', '', [
      {
        text: '다운드로',
        // onPress: () => console.log(filePath, fileName),
        onPress: () => downloader(filePath, fileName),
      },
      {
        text: '취소',
      },
    ]);
  };

  // 파일 다운로드 메소드
  const downloader = async (filePath, fileName) => {
    await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        trusty: false,
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
      },
    })
      .fetch('GET', filePath, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        Alert.alert('다운로드 되었습니다.', '내파일에서 확인해주세요.', [
          {
            text: '확인',
          },
        ]);
        console.log('The file saved to ', res.path());
      });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const mobileRef = React.useRef(null);
  const mobileCfmRef = React.useRef(null);
  const pwdReRef = React.useRef(null);

  const [name, setName] = React.useState(null);
  const [password, setPassword] = React.useState('');
  const [passwordRe, setPasswordRe] = React.useState('');
  const [businessName, setBusinessName] = React.useState(null);
  const [mobileCert, setMobileCert] = React.useState(null);
  const [bank, setBank] = React.useState(null);
  const [bankAccount, setBankAccount] = React.useState(null);
  const [depositor, setDepositor] = React.useState(null);

  // 비밀번호 보이기 기능
  const [pwdEyes, setPwdEyes] = React.useState(true);
  const togglePwdEyes = () => {
    setPwdEyes(!pwdEyes);
  };

  const [pwdReEyes, setPwdReEyes] = React.useState(true);
  const togglePwdReEyes = () => {
    setPwdReEyes(!pwdReEyes);
  };

  // 사업자 등록증 상태관리
  const [licenseFileNameCur, setLicenseFileNameCur] = React.useState(null);
  const [licenseFilePathCur, setLicenseFilePathCur] = React.useState(null);
  const [licenseFile, setLicenseFile] = React.useState('');

  // 사업자 등록증 파일 업로드 fn
  const filePicker01 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setLicenseFileNameCur(res.name);
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

  // 회사 소개서
  const [companyFileNameCur, setCompanyFileNameCur] = React.useState(null); // 회사 소개서 파일명(확장자 포함)
  const [companyFileCur, setCompanyFileCur] = React.useState(null); // 회사 소개서 path
  const [companyInfoFile, setComponyInfoFile] = React.useState('');

  const selectFileCompany = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setCompanyFileNameCur(res.name);
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

  React.useEffect(() => {
    setName(mb_name);
    setBusinessName(mb_2);
    setMobileNo(mb_hp);
    setBank(bank_name);
    setBankAccount(bank_account);
    setDepositor(bank_depositor);
    setLicenseFileNameCur(license_source);
    setLicenseFilePathCur(license);
    setCompanyFileNameCur(company_file_name);
    setCompanyFileCur(company_file);

    return () => {
      setName();
      setBusinessName();
      setMobileNo();
      setBank();
      setBankAccount();
      setDepositor();
      setLicenseFileNameCur();
      setLicenseFilePathCur();
      setCompanyFileNameCur();
      setCompanyFileCur();
    };
  }, [
    mb_name,
    mb_2,
    mb_hp,
    bank_name,
    bank_account,
    bank_depositor,
    bank_depositor,
    license_source,
    license,
    company_file_name,
    company_file,
  ]);

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
      confirmCount(3);
      Alert.alert(
        `${register_mobile}로 인증번호가 발송되었습니다.`,
        '인증번호 확인 후 입력해주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              setIsSend(true);
              mobileCfmRef.current.focus();
            },
          },
        ],
      );
      Auth.onMobileConfirm(register_mobile)
        .then((res) => {
          if (res.data.result == '1') {
            setMobileConfimed(false);
          } else {
            Alert.alert(res.data.message, '', [
              {
                text: '확인',
              },
            ]);
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
      confirmCount(3);
      Alert.alert(
        `${register_mobile}로 인증번호가 발송되었습니다.`,
        '인증번호 확인 후 입력해주세요.',
        [
          {
            text: '확인',
            onPress: () => {
              setIsSend(true);
              mobileCfmRef.current.focus();
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

  // 비밀번호 재입력 부분 확인
  const [pwdError, setPwdError] = React.useState(false);
  const checkPasswordEach = () => {
    if (password !== passwordRe) setPwdError(true);
  };

  // 파트너스 정보 수정 API 추가중
  const onEditAPI = () => {
    console.log('source 프로필 이미지', source);

    // 카테고리 선택(1차, 2차 카테고리 오브젝트 배열 묶음을 각각 다른 배열로 넣기 위한 초기 값
    let cate1NewArr = [];
    let caIdNewArr = [];

    // 카테고리 선택(1차, 2차 카테고리 API 전송 전 각각 다른 배열에 담기)
    categoryArr.map((c) => cate1NewArr.push(c.cate1));
    categoryArr.map((c) => caIdNewArr.push(c.ca_id));

    const frmData = new FormData();
    frmData.append('method', 'proc_modify_partner');
    frmData.append('mb_no', mb_no);
    frmData.append('mb_id', mb_email);
    frmData.append('mb_password', password);
    frmData.append('mb_name', name);
    frmData.append('mb_hp', mb_hp);
    frmData.append('mb_1', 'Y');
    frmData.append('mb_2', businessName);
    frmData.append('license[]', licenseFile);
    frmData.append('mb_img', source);
    frmData.append('mb_5[]', companyInfoFile);
    frmData.append('location', region.join(','));
    frmData.append('cate1', cate1NewArr.join(','));
    frmData.append('ca_id', caIdNewArr.join(','));
    frmData.append('bank_name', bank);
    frmData.append('bank_account', bankAccount);
    frmData.append('bank_depositor', depositor);

    console.log(frmData);

    Auth.onEdit(frmData).then((res) => {
      console.log('기본 정보 수정', res);
      if (res.data.result === '1') {
        console.log('성공시 정보 수정 결과', res);
        dispatch(UserMobile(mobileNo));
        dispatch(UserMobileCfm('Y'));
        dispatch(UserCompany(businessName));
        dispatch(UserLocation(region.join(',')));
        dispatch(UserLicense(licenseFile.uri));
        dispatch(UserLicenseSource(licenseFile.name));
        dispatch(UserCompanyFile(companyInfoFile.uri));
        dispatch(UserCompanyFileName(companyInfoFile.name));
        dispatch(UserCate1(cate1NewArr.join(',')));
        dispatch(UserCaId(caIdNewArr.join(',')));
        dispatch(UserBankName(bank));
        dispatch(UserBankAccount(bankAccount));
        dispatch(UserBankDepositor(depositor));
        Alert.alert(res.data.message, '홈으로 이동합니다.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('Stack'),
          },
        ]);
      }
    });
  };

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} />
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#F5F5F5'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 10,
              paddingTop: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={pickImageHandler}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 80,
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 80,
                  height: 80,
                  borderRadius: 80,
                  backgroundColor: '#fff',
                }}>
                {mb_profile_img && imgMime !== '.gif' ? (
                  <Image
                    source={{uri: `${mb_profile_img}`}}
                    resizeMode="cover"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                    }}
                  />
                ) : mb_profile_img && imgMime === '.gif' ? (
                  <FastImage
                    source={{uri: `${mb_profile_img}`}}
                    resizeMode={FastImage.resizeMode.contain}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../src/assets/photo.png')}
                    resizeMode="cover"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.normalText,
                {
                  textAlign: 'center',
                  fontSize: 15,
                  marginVertical: 5,
                  letterSpacing: -1,
                },
              ]}>
              프로필 이미지 등록
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View style={styles.profileBox}>
            <Text style={styles.profileTitle}>이메일</Text>
            <Text style={styles.profileDesc}>{mb_email}</Text>
          </View>
          {/* 성함 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>성함</Text>
            <Text style={styles.profileDesc}>{mb_name}</Text>
            {/* <TextInput
              value={name}
              placeholder="성함을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setName(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
              editable={false}
            /> */}
          </View>
          {/* // 성함 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              회원등급
            </Text>
            <View style={[styles.flexRowCenter, {marginBottom: 10}]}>
              <Text style={styles.profileDesc}>
                {ptype === 'sincere'
                  ? '성실파트너스'
                  : ptype === 'popular'
                  ? '인기파트너스'
                  : ptype === 'local'
                  ? '지역파트너스'
                  : '일반회원'}
              </Text>
              <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                <Image
                  source={require('../../src/assets/q.png')}
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 5,
                    marginRight: 20,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                <Text
                  style={[
                    styles.profileDesc,
                    {color: '#00A170', fontSize: 13},
                  ]}>
                  일반회원/인기파트너스
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReqPopular')}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  인기파트너스 신청
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 상호명 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              상호명
            </Text>
            <TextInput
              value={businessName}
              placeholder="상호명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBusinessName(text)}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                fontFamily: 'SCDream4',
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 상호명 변경 */}

          {/* 비밀번호 변경 */}
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
              }}>
              <Text
                style={[
                  styles.profileTitle,
                  {marginBottom: 10, marginRight: 5},
                ]}>
                비밀번호
              </Text>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 12,
                  color: '#00A170',
                }}>
                (비밀번호를 변경하고 싶으시면 입력해주세요.)
              </Text>
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
                marginBottom: 5,
                height: 50,
              }}>
              <TextInput
                value={password}
                placeholder="비밀번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={[styles.normalText, {width: '90%'}]}
                onChangeText={(text) => setPassword(text)}
                autoCapitalize="none"
                secureTextEntry={pwdEyes}
                onSubmitEditing={() => pwdReRef.current.focus()}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={togglePwdEyes}>
                <Image
                  source={
                    pwdEyes
                      ? require('../../src/assets/icon_eye.png')
                      : require('../../src/assets/icon_eye_on.png')
                  }
                  resizeMode="center"
                  style={{width: 35, height: 20}}
                />
              </TouchableOpacity>
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
                marginBottom: 5,
                height: 50,
              }}>
              <TextInput
                ref={pwdReRef}
                value={passwordRe}
                placeholder="비밀번호를 재입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={[styles.normalText, {width: '90%'}]}
                onChangeText={(text) => {
                  setPwdError(false);
                  setPasswordRe(text);
                }}
                autoCapitalize="none"
                secureTextEntry={pwdReEyes}
                onSubmitEditing={checkPasswordEach}
              />
              <TouchableOpacity activeOpacity={0.8} onPress={togglePwdReEyes}>
                <Image
                  source={
                    pwdReEyes
                      ? require('../../src/assets/icon_eye.png')
                      : require('../../src/assets/icon_eye_on.png')
                  }
                  resizeMode="center"
                  style={{width: 35, height: 20}}
                />
              </TouchableOpacity>
            </View>
            {pwdError && (
              <View>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: 'red',
                  }}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              </View>
            )}
          </View>
          {/* // 비밀번호 변경 */}

          {/* 휴대폰 번호 변경 */}
          {/* <View style={{marginBottom: 20}}>
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
                value={mobileNo}
                placeholder="휴대전화번호를 - 빼고 입력해주세요."
                placeholderTextColor="#A2A2A2"
                onChangeText={(text) => setMobileNo(text)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  fontFamily: 'SCDream4',
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
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
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  인증번호 전송
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value={mobileCert}
                placeholder="인증번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                onChangeText={(text) => setMobileCert(text)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  fontFamily: 'SCDream4',
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
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
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  인증번호 확인
                </Text>
              </TouchableOpacity>
            </View>
          </View> */}
          {/* // 휴대폰 번호 변경 */}

          {/* 휴대폰 번호  */}
          <View style={{marginBottom: 20}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'baseline',
              }}>
              <Text
                style={[
                  styles.profileTitle,
                  {marginBottom: 10, marginRight: 5},
                ]}>
                휴대폰 번호
              </Text>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 12,
                  color: '#00A170',
                }}>
                (휴대폰 번호가 바꼈을 때만 입력해주세요.)
              </Text>
            </View>
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
                value={mobileNo}
                onChangeText={(text) => {
                  setIsSend(false);
                  setMobileNo(text);
                }}
                editable={!isSend ? true : false}
                keyboardType="number-pad"
                autoCapitalize="none"
                onSubmitEditing={() => {
                  authenticateSMS(mobileNo);
                  setMobileNo(mobileNo);
                }}
              />
              {!reSend ? (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => {
                    authenticateSMS(mobileNo);
                    setMobileNo(mobileNo);
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
                    reAuthenticateSMS(mobileNo);
                    setMobileNo(mobileNo);
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
            {/* {formikProps.touched.register_mobile &&
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
              )} */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
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
                value={mobileConfirmId}
                onChangeText={(text) => {
                  setMobileConfimed(false);
                  setMobileConfirmId(text);
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
                editable={isMobileConfimed ? false : true}
                onSubmitEditing={() => confirmMobile(mobileConfirmId)}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => confirmMobile(mobileConfirmId)}
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
            {/* {formikProps.touched.register_confirmMobile &&
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
            ) : null} */}
          </View>
          {/* // 휴대폰 번호  */}

          {/* 사업자 등록증 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              사업자 등록증
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TextInput
                value={licenseFileNameCur}
                placeholder="사업자 등록증을 첨부해주세요."
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
                activeOpacity={0.8}
                onPress={() => filePicker01()}
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
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={() => Alert.alert('다운로드')}
              onPress={() =>
                fileDownloadHandler(licenseFilePathCur, licenseFileNameCur)
              }>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                <Image
                  source={require('../../src/assets/icon_down.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20, marginRight: 5}}
                />
                <Text style={styles.normalText}>{licenseFileNameCur}</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* // 사업자 등록증 변경 */}

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
                  onPress={() => {
                    setRegionError(false);
                    setRegionChoise(r);
                  }}
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
                          : '#A2A2A2',
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
            {regionError ? (
              <Text
                style={{
                  width: '100%',
                  fontFamily: 'SCDream4',
                  fontSize: 12,
                  lineHeight: 18,
                  color: '#00A170',
                  marginBottom: 5,
                }}>
                지역을 지정해주세요.
              </Text>
            ) : (
              <Text
                style={[styles.normalText, {color: '#B5B5B5', fontSize: 12}]}>
                * 지역은 최대 5곳까지 등록하실 수 있습니다.
              </Text>
            )}
          </View>
          {/* // 위치  */}

          {/* 제작물 카테고리 변경 */}
          <View style={{marginBottom: 25}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                marginBottom: 5,
              }}>
              <Text style={[styles.profileTitle]}>제작물 카테고리</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setCateId('1');
                  getCategoriesAPI('1');
                }}
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: cateId === '1' ? '#f6f6f6' : 'transparent',
                  borderWidth: cateId === '1' ? 1 : 0,
                  borderTopRightRadius: cateId === '1' ? 5 : null,
                  borderTopLeftRadius: cateId === '1' ? 5 : null,
                  borderColor: cateId === '1' ? '#f6f6f6' : null,
                  borderBottomColor: cateId === '1' ? '#f6f6f6' : null,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 14,
                    marginVertical: 10,
                  }}>
                  패키지
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setCateId('0');
                  getCategoriesAPI('0');
                }}
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: cateId === '0' ? '#f6f6f6' : 'transparent',
                  borderWidth: cateId === '0' ? 1 : 0,
                  borderTopRightRadius: cateId === '0' ? 5 : null,
                  borderTopLeftRadius: cateId === '0' ? 5 : null,
                  borderColor: cateId === '0' ? '#f6f6f6' : null,
                  borderBottomColor: cateId === '0' ? '#f6f6f6' : null,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 14,
                    marginVertical: 10,
                  }}>
                  일반인쇄
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  setCateId('2');
                  getCategoriesAPI('2');
                }}
                style={{
                  width: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: cateId === '2' ? '#f6f6f6' : 'transparent',
                  borderWidth: cateId === '2' ? 1 : 0,
                  borderTopRightRadius: cateId === '2' ? 5 : null,
                  borderTopLeftRadius: cateId === '2' ? 5 : null,
                  borderColor: cateId === '2' ? '#f6f6f6' : null,
                  borderBottomColor: cateId === '2' ? '#f6f6f6' : null,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 14,
                    marginVertical: 10,
                  }}>
                  기타인쇄
                </Text>
              </TouchableOpacity>
            </View>

            {/* 세부종목 */}

            {categoryList !== null && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'flex-start',
                  padding: 20,
                  backgroundColor: '#f6f6f6',
                  borderWidth: 1,
                  borderColor: '#f6f6f6',
                  borderBottomLeftRadius: 5,
                  borderBottomRightRadius: 5,
                  borderTopRightRadius: 5,
                  borderTopLeftRadius:
                    cateId === '0' ? 5 : cateId === '2' ? 5 : 0,
                  marginBottom: 15,
                }}>
                {categoryList.map((category) => (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      setCategoryArrFuc(cateId, category.ca_id);
                      setCategoryError(false);
                    }}
                    key={category.ca_id}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Image
                      source={
                        categoryArr.find(
                          (x) =>
                            x.cate1 === cateId && x.ca_id === category.ca_id,
                        )
                          ? require('../../src/assets/radio_on.png')
                          : require('../../src/assets/radio_off.png')
                      }
                      resizeMode="contain"
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        marginRight: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 13,
                        marginRight: 15,
                        marginVertical: 7,
                      }}>
                      {category.ca_name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {categoryError ? (
              <Text
                style={{
                  width: '100%',
                  fontFamily: 'SCDream4',
                  fontSize: 12,
                  lineHeight: 18,
                  color: '#00A170',
                  marginBottom: 5,
                }}>
                카테고리를 지정해주세요.
              </Text>
            ) : (
              <Text
                style={[styles.normalText, {color: '#B5B5B5', fontSize: 12}]}>
                * 카테고리는 최대 5개(대분류포함)까지 등록하실 수 있습니다.
              </Text>
            )}
            {/* // 세부종목 */}
          </View>
          {/* // 제작물 카테고리 변경 */}

          {/* 계좌정보 변경 */}
          <View style={{marginBottom: 20, zIndex: -1}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              계좌정보
            </Text>
            <TextInput
              value={bank}
              placeholder="은행명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBank(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
            <TextInput
              value={bankAccount}
              placeholder="계좌번호를 - 빼고 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBankAccount(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
            <TextInput
              value={depositor}
              placeholder="예금주를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setDepositor(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
          </View>
          {/* // 계좌정보 변경 */}

          {/* 회사 소개서 변경 */}

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
                value={companyFileNameCur}
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
                onPress={selectFileCompany}
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

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                fileDownloadHandler(companyFileCur, companyFileNameCur)
              }
              style={{width: '80%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                <Image
                  source={require('../../src/assets/icon_down.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20, marginRight: 5}}
                />
                <Text style={styles.normalText}>{companyFileNameCur}</Text>
              </View>
            </TouchableOpacity>
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
                  문서파일(doc, hwp, xls, xlsx) 또는 이미지파일(jpg,png,gif)
                </Text>
                <Text
                  style={[styles.normalText, {color: '#B5B5B5', fontSize: 12}]}>
                  첨부 가능합니다.
                </Text>
              </View>
            </View>
          </View>
          {/* // 회사 소개서 변경 */}

          <View style={{marginVertical: 50}}>
            <TouchableOpacity onPress={() => onEditAPI()} activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>수정 완료</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('취소')}
              activeOpacity={0.8}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>취소</Text>
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

export default Edit;
