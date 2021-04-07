import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Linking,
} from 'react-native';
import moment from 'moment';
import 'moment/locale/ko';
import Collapsible from 'react-native-collapsible';
import {useSelector} from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob'; // 파일 다운로드 패키지
import DocumentPicker from 'react-native-document-picker'; // 파일 업로드 패키지

import DetailHeader from '../Common/DetailHeader';
import Estimate from '../../src/api/Estimate';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const pe_id = props.route.params.pe_id;

  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const payPerType = ['10', '20', '30', '40', '50'];
  const [isActiveTogglePayPer, setIsActiveTogglePayPer] = React.useState(false);
  const togglePayPer = () => {
    setIsActiveTogglePayPer(!isActiveTogglePayPer);
  };
  const [isLoading, setLoading] = React.useState(false);
  const [base, setBase] = React.useState([]); // 1차 견적 제안 Original페이지 API 호출 시 반화값
  const [detail, setDetail] = React.useState(null); // 2차 견적 제안 세부 상세 API 호출 시 반화값

  console.log('견적 제안 1차 detail', detail);
  console.log('견적 제안 2차 detail', detail);

  const [productPrice, setProductPrice] = React.useState('0'); // 제작비
  const [designPrice, setDesignPrice] = React.useState('0'); // 디자인비
  const [deliveryPrice, setDeliveryPrice] = React.useState('0'); // 물류비
  const [depositRatio, setDepositRatio] = React.useState('10'); // 계약금 비율
  const [depositPrice, setDepositPrice] = React.useState('0'); // 계약금
  const [totalPrice, setTotalPrice] = React.useState('0'); // 총 견적 금액
  const [estimateText, setEstimateText] = React.useState(''); // 견적 상세 설명

  const [estimateFileNameCur, setEstimateFileNameCur] = React.useState(null); // 견적서 파일명
  const [estimateFilePathCur, setEstimateFilePathCur] = React.useState(null); // 견적서 파일 경로
  const [estimateFile, setEstimateFile] = React.useState(''); // 견적서 파일 uri, type, name 전체 담기

  const [estimateUser, setEstimateUser] = React.useState(null); // 견적낸 유저 정보 (status 0, 1 이상일 경우만)

  // 각 메뉴 아코디언 형식 설정(collapse)
  const [collapseArrow01, setCollapseArrow01] = React.useState(true);
  const [collapseArrow02, setCollapseArrow02] = React.useState(true);
  const [collapseArrow03, setCollapseArrow03] = React.useState(true);
  const [collapseArrow04, setCollapseArrow04] = React.useState(true);
  const [collapseArrow05, setCollapseArrow05] = React.useState(true);

  const setCollapseArrowFunc01 = () => {
    setCollapseArrow01((prev) => !prev);
  };
  const setCollapseArrowFunc02 = () => {
    setCollapseArrow02((prev) => !prev);
  };
  const setCollapseArrowFunc03 = () => {
    setCollapseArrow03((prev) => !prev);
  };
  const setCollapseArrowFunc04 = () => {
    setCollapseArrow04((prev) => !prev);
  };
  const setCollapseArrowFunc05 = () => {
    setCollapseArrow05((prev) => !prev);
  };

  // 날짜 지정
  const onChange01 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow01(Platform.OS === 'ios');

    const nowDate = new Date();
    let weekAgo = nowDate.setDate(nowDate.getDate() + 7);

    if (selectedDate < date) {
      Alert.alert(
        '오늘 이전 날짜는 선택이 불가능 합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setdDayDate(date);
    } else if (selectedDate < weekAgo) {
      Alert.alert(
        '납품 희망일은 현재일 기준 7일 이후부터 선택 가능합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setdDayDate(date);
    } else {
      setArriveDate(currentDate);
    }
  };

  const onChange02 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow02(Platform.OS === 'ios');

    if (selectedDate < date) {
      Alert.alert(
        '오늘 이전 날짜는 선택이 불가능 합니다.',
        '날짜를 다시 선택해주세요.',
        [
          {
            text: '확인',
          },
        ],
      );
      setdDayDate(date);
    } else {
      setdDayDate(currentDate);
    }
  };

  const showMode01 = (currentMode) => {
    setShow01(true);
    setMode01(currentMode);
  };

  const showMode02 = (currentMode) => {
    setShow02(true);
    setMode02(currentMode);
  };

  const showDatepicker01 = () => {
    showMode01('date');
  };

  const showDatepicker02 = () => {
    showMode02('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // 견적 자동 계산
  const priceHandler = () => {
    console.log('productPrice', productPrice);
    console.log('productPrice Type', typeof productPrice);

    let productPriceInt = parseInt(productPrice);
    let designPriceInt = parseInt(designPrice);
    let deliveryPriceInt = parseInt(deliveryPrice);
    let depositRatioInt = parseInt(depositRatio);

    let total = productPriceInt + designPriceInt + deliveryPriceInt;
    let totalStr = total.toString();
    setTotalPrice(totalStr);

    let deposit = total * (depositRatioInt / 100);
    let depositStr = deposit.toString();
    setDepositPrice(depositStr);
  };

  const depositHandler = (value) => {
    let totalStrFormat = totalPrice.replace(',', '');
    let total = parseInt(totalStrFormat);
    let depositRatioInt = parseInt(value);

    let deposit = total * (depositRatioInt / 100);
    let depositStr = deposit.toString();
    let depositPriceFormat = depositStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setDepositPrice(depositPriceFormat);
  };

  // 견적낸 사용자 정보 가져오기 (견적 채택 이상 단계)
  const getEstimateUserInfoAPI = (mb_id) => {
    setLoading(true);
    Estimate.getEstimateUserInfo(mb_id)
      .then((res) => {
        console.log('사용자 정보', res);
        if (res.data.result === '1') {
          setEstimateUser(res.data.item[0]);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  // 2차 견적 상세보기(세부)
  const getEstimateMoreDetailAPI = (method) => {
    setLoading(true);
    Estimate.getMoreDetail(method, pe_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          console.log(res);
          setDetail(res.data.item);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  // 1차 견적 상세보기(간단)
  const getEstimateDetailAPI = () => {
    setLoading(true);
    Estimate.getDetail(pe_id, mb_email)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          // console.log('레스레스', res);
          if (res.data.item[0].status === '1') {
            setProductPrice(res.data.item[0].production_price);
            setDesignPrice(res.data.item[0].design_price);
            setDeliveryPrice(res.data.item[0].reduce_price);
            setDepositRatio(res.data.item[0].deposit_rate);
            setDepositPrice(res.data.item[0].deposit);
            setTotalPrice(res.data.item[0].total_price);
            setEstimateText(res.data.item[0].estimate_content);
            setEstimateFileNameCur(res.data.item[0].bf_file_source);
            setEstimateFilePathCur(res.data.item[0].bf_file);
          }

          if (
            res.data.item[0].status !== '0' ||
            res.data.item[0].status !== '1'
          ) {
            getEstimateUserInfoAPI(res.data.item[0].mb_id);
          }

          if (res.data.item[0].cate1 === '1') {
            getEstimateMoreDetailAPI('proc_my_real_estimate_detail2');
          } else if (res.data.item[0].cate1 === '0') {
            getEstimateMoreDetailAPI('proc_my_real_estimate_detail');
          } else {
            getEstimateMoreDetailAPI('proc_my_real_estimate_detail3');
          }

          setBase(res.data.item[0]);
          setLoading(false);
        } else if (res.data.result === '1' && res.data.count == 0) {
          setList(res.data.item);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getEstimateDetailAPI();
  }, []);

  console.log('사용자 정보 estimateUser', estimateUser);

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

  // 견적서 파일 업로드 fn
  const filePicker01 = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setEstimateFileNameCur(res.name);
      setEstimateFilePathCur(res.uri);
      setEstimateFile({
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

  const goMoreDetail = (checkId) => {
    if (checkId === '1') {
      navigation.navigate('OrderDetailPackage', {
        screen: 'OrderDetailPackage',
        params: {pe_id: pe_id, cate1: base.cate1},
      });
    } else if (checkId === '0') {
      navigation.navigate('OrderDetailGeneral', {
        screen: 'OrderDetailGeneral',
        params: {pe_id: pe_id, cate1: base.cate1},
      });
    } else {
      // 기타
    }
  };

  console.log('기본 상세 detail', base);
  console.log('기본 상세 totalPrice', totalPrice);

  const productPriceRef = React.useRef(); // 제작비
  const deliveryPriceRef = React.useRef(); // 물류비

  //  견적확정
  const sendEstimateCfmAPI = () => {
    Estimate.sendEstimateCfm(base.pdr_id)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(
            res.data.message,
            '견적발송 및 채택 페이지에서 확인하실 수 있습니다.',
            [
              {
                text: '확인',
                onPress: () => navigation.navigate('Steps'),
              },
            ],
          );
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  //  계약금 입금확인
  const sendPaymentCfmAPI = () => {
    Estimate.sendPaymentCfm(base.pdr_id)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(
            res.data.message,
            '견적발송 및 채택 페이지에서 확인하실 수 있습니다.',
            [
              {
                text: '확인',
                onPress: () => navigation.navigate('Steps'),
              },
            ],
          );
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  //  납품 완료
  const sendDeliveryAPI = () => {
    Estimate.sendDelivery(base.pdr_id)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(
            res.data.message,
            '제작/납품 페이지에서 확인하실 수 있습니다.',
            [
              {
                text: '확인',
                onPress: () => navigation.navigate('Product'),
              },
            ],
          );
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 견적 발송 및 견적 수정
  const sendEstimateAPI = (method) => {
    if (productPrice === '0' || productPrice === '' || productPrice === null) {
      Alert.alert('제작비를 입력해주세요.', '', [
        {
          text: '확인',
          onPress: () => productPriceRef.current.focus(),
        },
      ]);
    }
    if (
      deliveryPrice === '0' ||
      deliveryPrice === '' ||
      deliveryPrice === null
    ) {
      Alert.alert('물류비를 입력해주세요.', '', [
        {
          text: '확인',
          onPress: () => deliveryPriceRef.current.focus(),
        },
      ]);
    }

    const frmData = new FormData();
    frmData.append('method', method);
    frmData.append('company_id', mb_email);
    if (base.status === '0') frmData.append('pe_id', pe_id);
    if (base.status === '1') frmData.append('pd_id', base.pdr_id);
    frmData.append('mb_id', base.mb_id);
    frmData.append('total_price', totalPrice);
    frmData.append('production_price', productPrice);
    frmData.append('design_price', designPrice);
    frmData.append('reduce_price', deliveryPrice);
    frmData.append('deposit_rate', depositRatio);
    frmData.append('deposit', depositPrice);
    frmData.append('estimate_content', estimateText);
    frmData.append('bf_file[]', estimateFile);

    Estimate.sendEstimate(frmData)
      .then((res) => {
        console.log('어찌됐노', res);
        if (res.data.result === '1') {
          Alert.alert(
            res.data.message,
            '견적발송 및 채택 페이지에서 확인하실 수 있습니다.',
            [
              {
                text: '확인',
                onPress: () => navigation.navigate('Steps'),
              },
            ],
          );
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
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
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View style={styles.infoBox}>
            <Text style={styles.infoStepDesc}>
              {base.status === '0'
                ? '비교 견적요청'
                : base.status === '1'
                ? '입찰중'
                : base.status === '2'
                ? '파트너스최종선정(견적확정대기)'
                : base.status === '3'
                ? '파트너스최종선정(계약금입금대기)'
                : base.status === '4'
                ? '파트너스최종선정(계약금입금완료)'
                : base.status === '5'
                ? '입금제작요청'
                : base.status === '6'
                ? '납품완료'
                : base.status === '7'
                ? '수령완료'
                : base.status === '8'
                ? '마감'
                : null}
            </Text>
            <Text style={styles.infoStepTitle}>{base.title}</Text>
            <View style={styles.line} />
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>분류</Text>
              <Text style={styles.detailsDesc}>{base.ca_name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>{base.estimate_date}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>납품 희망일</Text>
              <Text style={styles.detailsDesc}>{base.delivery_date}</Text>
            </View>
            <View style={styles.detailsEnd}>
              <View style={styles.detailsEnd}>
                <Text style={styles.detailsTitle02}>디자인 의뢰</Text>
                <Text style={styles.detailsDesc}>
                  {base.design_print === 'P'
                    ? '인쇄만 의뢰'
                    : base.design_print === 'D'
                    ? '인쇄 + 디자인의뢰'
                    : null}
                </Text>
              </View>
              {/* <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('OrderDetail')}
                style={{alignSelf: 'flex-end'}}>
                <Text
                  style={{
                    fontSize: 12,
                    textDecorationLine: 'underline',
                    color: '#A2A2A2',
                  }}>
                  세부 내용 보기
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => goMoreDetail(base.cate1)}
                hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
                style={{alignSelf: 'flex-end'}}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    textDecorationLine: 'underline',
                    color: '#00A170',
                  }}>
                  세부 내용 보기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* 경계 라인 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E3E3E3',
            width: Dimensions.get('window').width,
          }}
        />
        <View
          style={{
            height: 6,
            backgroundColor: '#F5F5F5',
            width: Dimensions.get('window').width,
          }}
        />
        {/* // 경계 라인 */}

        {/* 전화하기, 메세지보내기 */}
        {base !== null &&
        estimateUser !== null &&
        base.status !== '0' &&
        base !== null &&
        estimateUser !== null &&
        base.status !== '1' ? (
          <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
            <View>
              <Text
                style={{
                  fontFamily: 'SCDream5',
                  fontSize: 16,
                  color: '#00A170',
                  marginBottom: 15,
                }}>
                견적의뢰자 정보
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 15,
                }}>
                <Image
                  source={{uri: `${estimateUser.mb_profile}`}}
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    borderWidth: 0.5,
                    borderColor: '#E3E3E3',
                    marginRight: 20,
                  }}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 14,
                    marginRight: 20,
                  }}>
                  견적자명 : {estimateUser.mb_name}
                </Text>
                {estimateUser.mb_2 ? (
                  <>
                    <View
                      style={{
                        height: 16,
                        backgroundColor: '#00A170',
                        width: 1,
                        marginRight: 20,
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 14,
                      }}>
                      회사명 : {estimateUser.mb_2}
                    </Text>
                  </>
                ) : null}
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 5,
                  backgroundColor: '#fff',
                }}>
                <TouchableWithoutFeedback
                  onPress={() => Linking.openURL(`tel:${estimateUser.mb_hp}`)}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 12,
                    }}>
                    <Image
                      source={require('../../src/assets/icon_call01.png')}
                      resizeMode="cover"
                      style={{width: 24, height: 24}}
                    />
                    <Text
                      style={[
                        styles.normalText,
                        {
                          fontSize: 14,
                          letterSpacing: -1,
                          marginLeft: 5,
                        },
                      ]}>
                      전화하기
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <View
                  style={{
                    borderWidth: 0.5,
                    height: '100%',
                    borderColor: '#E3E3E3',
                  }}
                />
                <TouchableWithoutFeedback
                  onPress={() => navigation.navigate('MessageDetail')}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 12,
                    }}>
                    <Image
                      source={require('../../src/assets/icon_msm01.png')}
                      resizeMode="cover"
                      style={{width: 24, height: 24}}
                    />
                    <Text
                      style={[
                        styles.normalText,
                        {
                          fontSize: 14,
                          letterSpacing: -1,
                          marginLeft: 5,
                        },
                      ]}>
                      메세지보내기
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        ) : null}
        {/* // 전화하기, 메세지보내기  */}

        {/* 경계 라인 */}
        {base !== null &&
        estimateUser !== null &&
        base.status !== '0' &&
        base !== null &&
        estimateUser !== null &&
        base.status !== '1' ? (
          <>
            <View
              style={{
                height: 1,
                backgroundColor: '#E3E3E3',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                height: 6,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />
          </>
        ) : null}
        {/* // 경계 라인 */}

        {/* 정보 */}
        {detail !== null && (
          <>
            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc01}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.mediumText,
                      {fontSize: 16, color: '#00A170'},
                    ]}>
                    기본정보
                  </Text>
                  <Image
                    source={
                      collapseArrow01
                        ? require('../../src/assets/collapse_up.png')
                        : require('../../src/assets/collapse_down.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow01}>
                <View style={[styles.infoBox, {marginBottom: 20}]}>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>분류</Text>
                    <Text style={styles.detailsDesc}>
                      {detail.basic.ca_name}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>디자인 의뢰</Text>
                    <Text style={styles.detailsDesc}>
                      {detail.basic.design_print === 'P'
                        ? '인쇄만 의뢰'
                        : detail.basic.design_print === 'D'
                        ? '인쇄 + 디자인의뢰'
                        : null}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>견적 마감일</Text>
                    <Text style={styles.detailsDesc}>
                      {moment(detail.basic.estimate_date).format('YYYY.MM.DD')}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>납품 희망일</Text>
                    <Text style={styles.detailsDesc}>
                      {moment(detail.basic.delivery_date).format('YYYY.MM.DD')}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>인쇄 업체 선호 지역</Text>
                    <Text style={styles.detailsDesc}>
                      {detail.basic.favor_area === 'seoul'
                        ? '서울'
                        : detail.basic.favor_area === 'busan'
                        ? '부산'
                        : detail.basic.favor_area === 'daegu'
                        ? '대구'
                        : detail.basic.favor_area === 'incheon'
                        ? '인천'
                        : detail.basic.favor_area === 'gwangju'
                        ? '광주'
                        : detail.basic.favor_area === 'sejong'
                        ? '세종'
                        : detail.basic.favor_area === 'ulsan'
                        ? '울산'
                        : detail.basic.favor_area === 'gyeongi'
                        ? '경기'
                        : detail.basic.favor_area === 'gangwon'
                        ? '강원'
                        : detail.basic.favor_area === 'choongcheong'
                        ? '충청'
                        : detail.basic.favor_area === 'jeonra'
                        ? '전라'
                        : detail.basic.favor_area === 'gyeongsang'
                        ? '경상'
                        : detail.basic.favor_area === 'jeju'
                        ? '제주'
                        : null}
                    </Text>
                  </View>
                  <View style={styles.details}>
                    <Text style={styles.detailsTitle}>첨부파일</Text>
                    {detail.basic.pe_file === null ||
                    detail.basic.pe_file === '' ? (
                      <Text style={styles.detailsDesc}>
                        첨부파일이 없습니다.
                      </Text>
                    ) : null}
                  </View>
                  {detail.basic.pe_file ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                      }}>
                      <Image
                        source={require('../../src/assets/img02.png')}
                        resizeMode="cover"
                        style={{
                          width: 114,
                          height: 114,
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      />
                      <Image
                        source={require('../../src/assets/img03.png')}
                        resizeMode="cover"
                        style={{
                          width: 114,
                          height: 114,
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      />
                      <Image
                        source={require('../../src/assets/img04.png')}
                        resizeMode="cover"
                        style={{
                          width: 114,
                          height: 114,
                          borderRadius: 5,
                          marginRight: 10,
                        }}
                      />
                    </View>
                  ) : null}
                </View>
              </Collapsible>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: '#E3E3E3',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                height: 6,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />

            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc02}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.mediumText,
                      {fontSize: 16, color: '#00A170'},
                    ]}>
                    제작정보
                  </Text>
                  <Image
                    source={
                      collapseArrow02
                        ? require('../../src/assets/collapse_up.png')
                        : require('../../src/assets/collapse_down.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow02}>
                {detail.basic.cate1 === '1' ? (
                  <>
                    <View style={[styles.infoBox, {marginBottom: 10}]}>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>타입</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic.ca_type_name}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>
                          규격(가로/세로/높이)
                        </Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.pwidth}/{detail.basic2.plength}/
                          {detail.basic2.pheight}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>수량</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.cnt
                            ? detail.basic2.cnt
                            : detail.basic2.cnt_etc
                            ? detail.basic2.cnt_etc
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>목형</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.wood_pattern}
                        </Text>
                      </View>
                      {detail.basic.ca_id === '12' ? (
                        <>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>싸바리형태</Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.stype
                                ? detail.basic2.stype
                                : '없음'}
                            </Text>
                          </View>

                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>
                              속지 판지두께
                            </Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.board_tk
                                ? detail.basic2.board_tk
                                : '없음'}
                            </Text>
                          </View>
                        </>
                      ) : null}
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>인쇄도수</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.print.print_frequency
                            ? detail.print.print_frequency
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>인쇄교정</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.print.proof_printing
                            ? detail.print.proof_printing
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>인쇄감리</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.print.print_supervision
                            ? detail.print.print_supervision
                            : '없음'}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : detail.basic.cate1 === '0' ? (
                  <>
                    <View style={[styles.infoBox, {marginBottom: 10}]}>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>타입</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic.ca_type_name}
                        </Text>
                      </View>

                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>수량</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.cnt
                            ? detail.basic2.cnt
                            : detail.basic2.cnt_etc
                            ? detail.basic2.cnt_etc
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>목형</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.wood_pattern}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>편집방법</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.way_edit}
                        </Text>
                      </View>
                      {detail.basic.ca_id === '1' && (
                        <View style={styles.details}>
                          <Text style={styles.detailsTitle}>접지방법</Text>
                          <Text style={styles.detailsDesc}>
                            {detail.basic2.ground_method}
                          </Text>
                        </View>
                      )}
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>제본방식</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.bind_type}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>페이지수(표지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.page_cnt}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>페이지수(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.page_cnt2}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>규격</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.basic2.standard}
                        </Text>
                      </View>
                      {detail.basic.ca_id === '6' && (
                        <>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>후면반칼형</Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.back_side}
                            </Text>
                          </View>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>지관</Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.geomancer}
                            </Text>
                          </View>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>톰슨모양</Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.thomson_type}
                            </Text>
                          </View>
                        </>
                      )}
                      {detail.basic.ca_id === '4' && (
                        <>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>
                              표지간지색상
                            </Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.cover_color}
                            </Text>
                          </View>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>
                              섹션간지색상
                            </Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.section_color}
                            </Text>
                          </View>
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>간지</Text>
                            <Text style={styles.detailsDesc}>
                              {detail.basic2.writeing_paper}
                            </Text>
                          </View>
                        </>
                      )}

                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>인쇄도수</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.print.print_frequency}
                        </Text>
                      </View>

                      {detail.basic.ca_id === '1' ||
                        (detail.basic.ca_id === '4' && (
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>
                              인쇄도수(내지)
                            </Text>
                            <Text style={styles.detailsDesc}>
                              {detail.print.print_frequency2}
                            </Text>
                          </View>
                        ))}

                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>인쇄교정</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.print.proof_printing}
                        </Text>
                      </View>

                      {detail.basic.ca_id === '1' ||
                        (detail.basic.ca_id === '4' && (
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>
                              인쇄교정(내지)
                            </Text>
                            <Text style={styles.detailsDesc}>
                              {detail.print.proof_printing2}
                            </Text>
                          </View>
                        ))}

                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>인쇄감리</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.print.print_supervision}
                        </Text>
                      </View>

                      {detail.basic.ca_id === '1' ||
                        (detail.basic.ca_id === '4' && (
                          <View style={styles.details}>
                            <Text style={styles.detailsTitle}>
                              인쇄감리(내지)
                            </Text>
                            <Text style={styles.detailsDesc}>
                              {detail.print.print_supervision2}
                            </Text>
                          </View>
                        ))}
                    </View>
                  </>
                ) : null}
              </Collapsible>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: '#E3E3E3',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                height: 6,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />

            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc03}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.mediumText,
                      {fontSize: 16, color: '#00A170'},
                    ]}>
                    지류정보
                  </Text>
                  <Image
                    source={
                      collapseArrow03
                        ? require('../../src/assets/collapse_up.png')
                        : require('../../src/assets/collapse_down.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow03}>
                {detail.basic.cate1 === '1' ? (
                  <>
                    <View style={[styles.infoBox, {marginBottom: 10}]}>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>지류명</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.feeder.feeder_name}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>지종</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.feeder.paper_name}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>지종상세</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.feeder.paper_name2
                            ? detail.feeder.paper_name2
                            : '없음'}
                        </Text>
                      </View>
                      {detail.basic.ca_id !== '10' ? (
                        <View style={styles.details}>
                          <Text style={styles.detailsTitle}>평량</Text>
                          <Text style={styles.detailsDesc}>
                            {detail.feeder.paper_weight
                              ? detail.feeder.paper_weight
                              : detail.feeder.paper_weight_etc
                              ? detail.feeder.paper_weight_etc
                              : '없음'}
                          </Text>
                        </View>
                      ) : null}
                      {detail.basic.ca_id === '10' ||
                      detail.basic.ca_id === '11' ? (
                        <View style={styles.details}>
                          <Text style={styles.detailsTitle}>골</Text>
                          <Text style={styles.detailsDesc}>
                            {detail.feeder.paper_goal
                              ? detail.feeder.paper_goal
                              : detail.feeder.paper_goal_etc
                              ? detail.feeder.paper_goal_etc
                              : '없음'}
                          </Text>
                        </View>
                      ) : null}
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>색상</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.feeder.paper_color
                            ? detail.feeder.paper_color
                            : detail.feeder.paper_color_etc
                            ? detail.feeder.paper_color_etc
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>박가공</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.park_processing
                            ? detail.end.park_processing
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>형압</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.press_design
                            ? detail.end.press_design
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>부분 실크</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.partial_silk
                            ? detail.end.partial_silk
                            : '없음'}
                        </Text>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>코팅</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.coating ? detail.end.coating : '없음'}
                        </Text>
                      </View>
                    </View>
                  </>
                ) : detail.basic.cate1 === '0' ? (
                  <View style={[styles.infoBox, {marginBottom: 10}]}>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>지류명</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.feeder.feeder_name}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>지종</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.feeder.paper_name}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>지종상세</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.feeder.paper_name2
                          ? detail.feeder.paper_name2
                          : '없음'}
                      </Text>
                    </View>

                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>평량</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.feeder.paper_weight
                          ? detail.feeder.paper_weight
                          : detail.feeder.paper_weight_etc
                          ? detail.feeder.paper_weight_etc
                          : null}
                      </Text>
                    </View>
                    {detail.basic.ca_id === '1' ||
                    detail.basic.ca_id === '4' ? (
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>평량(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.feeder.paper_weight2}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>색상</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.feeder.paper_color
                          ? detail.feeder.paper_color
                          : detail.feeder.paper_color_etc
                          ? detail.feeder.paper_color_etc
                          : null}
                      </Text>
                    </View>
                    {detail.basic.ca_id === '1' ||
                    detail.basic.ca_id === '4' ? (
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>색상(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.feeder.paper_color2}
                        </Text>
                      </View>
                    ) : null}

                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>색상(직접입력)</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.feeder.paper_color_etc
                          ? detail.feeder.paper_color_etc
                          : '없음'}
                      </Text>
                    </View>
                  </View>
                ) : null}
              </Collapsible>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: '#E3E3E3',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                height: 6,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />

            <View style={{paddingHorizontal: 20}}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={setCollapseArrowFunc04}>
                <View
                  style={[
                    styles.categoryTitle,
                    styles.mV10,
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 20,
                    },
                  ]}>
                  <Text
                    style={[
                      styles.mediumText,
                      {fontSize: 16, color: '#00A170'},
                    ]}>
                    후가공
                  </Text>
                  <Image
                    source={
                      collapseArrow04
                        ? require('../../src/assets/collapse_up.png')
                        : require('../../src/assets/collapse_down.png')
                    }
                    resizeMode="contain"
                    style={{width: 30, height: 20}}
                  />
                </View>
              </TouchableOpacity>

              <Collapsible collapsed={collapseArrow04}>
                {detail.basic.cate1 === '1' ? (
                  <View style={[styles.infoBox, {marginBottom: 10}]}>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>박가공</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.park_processing
                          ? detail.end.park_processing
                          : '없음'}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>형압</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.press_design
                          ? detail.end.press_design
                          : '없음'}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>부분 실크</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.partial_silk
                          ? detail.end.partial_silk
                          : '없음'}
                      </Text>
                    </View>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>코팅</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.coating ? detail.end.coating : '없음'}
                      </Text>
                    </View>
                  </View>
                ) : detail.basic.cate1 === '0' ? (
                  <View style={[styles.infoBox, {marginBottom: 10}]}>
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>박가공</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.park_processing === 'Y' ? '있음' : '없음'}
                      </Text>
                    </View>
                    {detail.basic.ca_id === '1' ||
                    detail.basic.ca_id === '4' ? (
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>박가공(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.park_processing2 === 'Y'
                            ? '있음'
                            : '없음'}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>형압</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.press_design === 'Y' ? '있음' : '없음'}
                      </Text>
                    </View>
                    {detail.basic.ca_id === '1' ||
                    detail.basic.ca_id === '4' ? (
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>형압(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.press_design2 === 'Y' ? '있음' : '없음'}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>부분 실크</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.partial_silk === 'Y' ? '있음' : '없음'}
                      </Text>
                    </View>
                    {detail.basic.ca_id === '1' ||
                    detail.basic.ca_id === '4' ? (
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>부분 실크(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.partial_silk2 === 'Y' ? '있음' : '없음'}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>코팅</Text>
                      <Text style={styles.detailsDesc}>
                        {detail.end.coating}
                      </Text>
                    </View>
                    {detail.basic.ca_id === '1' ||
                    detail.basic.ca_id === '4' ? (
                      <View style={styles.details}>
                        <Text style={styles.detailsTitle}>코팅(내지)</Text>
                        <Text style={styles.detailsDesc}>
                          {detail.end.coating2}
                        </Text>
                      </View>
                    ) : null}
                    <View style={styles.details}>
                      <Text style={styles.detailsTitle}>첨부파일</Text>
                      {detail.basic2.pe_file2 === null ||
                      detail.basic2.pe_file2 === '' ? (
                        <Text style={styles.detailsDesc}>
                          첨부파일이 없습니다.
                        </Text>
                      ) : null}
                    </View>
                    {detail.basic2.pe_file2 ? (
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          activeOpacity={0.8}
                          onPress={() => {
                            imageModalHandler();
                            setImgPath(detail.basic.pe_file);
                          }}>
                          <Image
                            source={{uri: `${detail.basic2.pe_file2}`}}
                            resizeMode="cover"
                            style={{
                              width: 114,
                              height: 114,
                              borderRadius: 5,
                              marginRight: 10,
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    ) : null}
                  </View>
                ) : null}
              </Collapsible>
            </View>
          </>
        )}
        {/* // 정보 */}

        {/* 경계 라인 */}
        <View
          style={{
            height: 1,
            backgroundColor: '#E3E3E3',
            width: Dimensions.get('window').width,
          }}
        />
        <View
          style={{
            height: 6,
            backgroundColor: '#F5F5F5',
            width: Dimensions.get('window').width,
          }}
        />
        {/* // 경계 라인 */}

        <View style={styles.wrap}>
          <Text
            style={
              base.status === '1'
                ? styles.orderInfoTitle02
                : styles.orderInfoTitle
            }>
            견적 {base.status === '0' ? '작성' : '내용'}
          </Text>

          {base.status === '1' && (
            <Text
              style={{
                fontFamily: 'SCDream4',
                fontSize: 12,
                color: '#00A170',
                marginBottom: 25,
              }}>
              입찰중인 상태에서는 견적내용을 수정하실 수 있습니다.
            </Text>
          )}
          <View style={[styles.flexRow, styles.mgB30]}>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>제작비(원)</Text>
              {base.status === '0' || base.status === '1' ? (
                <TextInput
                  ref={productPriceRef}
                  value={productPrice}
                  placeholder="금액을 입력하세요."
                  style={styles.textInput}
                  onChangeText={(text) => setProductPrice(text)}
                  onEndEditing={() => priceHandler()}
                  keyboardType="numeric"
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    height: 50,
                    paddingHorizontal: 10,
                    marginRight: 5,
                  }}>
                  <Text style={{fontFamily: 'SCDream4', fontSize: 15}}>
                    {base.production_price &&
                      base.production_price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>디자인비(원)</Text>
              {base.status === '0' || base.status === '1' ? (
                <TextInput
                  value={designPrice}
                  placeholder="금액을 입력하세요."
                  style={styles.textInput}
                  onChangeText={(text) => setDesignPrice(text)}
                  onEndEditing={() => priceHandler()}
                  keyboardType="numeric"
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    paddingHorizontal: 10,
                    height: 50,
                    marginRight: 5,
                  }}>
                  <Text style={{fontFamily: 'SCDream4', fontSize: 15}}>
                    {base.design_price &&
                      base.design_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={[styles.flexRow, styles.mgB30]}>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>물류비(원)</Text>
              {base.status === '0' || base.status === '1' ? (
                <TextInput
                  ref={deliveryPriceRef}
                  value={deliveryPrice}
                  placeholder="금액을 입력하세요."
                  style={styles.textInput}
                  onChangeText={(text) => setDeliveryPrice(text)}
                  onEndEditing={() => priceHandler()}
                  keyboardType="numeric"
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    height: 50,
                    paddingHorizontal: 10,
                    marginRight: 5,
                  }}>
                  <Text style={{fontFamily: 'SCDream4', fontSize: 15}}>
                    {base.reduce_price &&
                      base.reduce_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>계약금(선금) 비율</Text>
              {base.status === '0' || base.status === '1' ? (
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: isActiveTogglePayPer ? 0 : 4,
                    borderBottomRightRadius: isActiveTogglePayPer ? 0 : 4,
                    backgroundColor: '#fff',
                  }}>
                  <TouchableOpacity
                    onPress={togglePayPer}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 50,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>
                      {depositRatio}%
                    </Text>
                    {isActiveTogglePayPer ? (
                      <Image
                        source={require('../../src/assets/arr01_top.png')}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    ) : (
                      <Image
                        source={require('../../src/assets/arr01.png')}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    height: 50,
                    paddingHorizontal: 10,
                    marginRight: 5,
                  }}>
                  <Text style={{fontFamily: 'SCDream4', fontSize: 15}}>
                    {base.deposit_rate}%
                  </Text>
                </View>
              )}

              {isActiveTogglePayPer && (
                <View
                  style={{
                    position: 'absolute',
                    top: 81,
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
                  {payPerType.map((v, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={{paddingVertical: 7, marginBottom: 7}}
                      activeOpacity={0.8}
                      onPress={() => {
                        setDepositRatio(v);
                        setIsActiveTogglePayPer(false);
                        depositHandler(v);
                      }}>
                      <Text style={{fontFamily: 'SCDream4'}}>{v}%</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>

          <View style={[styles.flexRow, styles.mgB30]}>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>계약금(원)</Text>
              {base.status === '0' || base.status === '1' ? (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Alert.alert(
                      '계약금은 직접 수정하실 수 없습니다.',
                      '계약금 비율을 선택해주세요.',
                      [
                        {
                          text: '확인',
                        },
                      ],
                    );
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderRadius: 4,
                      height: 50,
                      paddingHorizontal: 10,
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 14,
                      }}>
                      {depositPrice &&
                        depositPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    height: 50,
                    paddingHorizontal: 10,
                    marginRight: 5,
                  }}>
                  <Text style={{fontFamily: 'SCDream4', fontSize: 15}}>
                    {base.deposit &&
                      base.deposit.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>총 견적 금액(원)</Text>
              {base.status === '0' || base.status === '1' ? (
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => {
                    Alert.alert(
                      '총 견적금액은 수정하실 수 없습니다.',
                      '전체 금액을 확인해주세요.',
                      [
                        {
                          text: '확인',
                        },
                      ],
                    );
                  }}>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      borderWidth: 1,
                      borderColor: '#00A170',
                      borderRadius: 4,
                      height: 50,
                      paddingHorizontal: 10,
                      marginRight: 5,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 15,
                        color: '#00A170',
                      }}>
                      {totalPrice &&
                        totalPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    </Text>
                  </View>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    borderWidth: 1,
                    borderColor: '#00A170',
                    borderRadius: 4,
                    height: 50,
                    paddingHorizontal: 10,
                    marginRight: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 15,
                      color: '#00A170',
                    }}>
                    {base.total_price &&
                      base.total_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <View style={[styles.orderInfoContentRow, styles.mgB10]}>
            <Text style={[styles.orderInfoContentTitle, {marginRight: 5}]}>
              견적 상세 설명
            </Text>
            <Text style={styles.orderInfoContentDetail}>
              (100자 내외로 적어주세요.)
            </Text>
          </View>
          <View style={styles.mgB30}>
            {base.status === '0' || base.status === '1' ? (
              <TextInput
                value={estimateText}
                placeholder="견적 상세 설명을 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  fontFamily: 'SCDream4',
                  borderRadius: 5,
                  backgroundColor: '#F5F5F5',
                  height: 120,
                  lineHeight: 22,
                  flex: 1,
                  textAlignVertical: 'top',
                  paddingLeft: 10,
                  paddingVertical: 10,
                }}
                onChangeText={(text) => setEstimateText(text)}
                multiline={true}
              />
            ) : (
              <View
                style={{
                  borderRadius: 5,
                  backgroundColor: '#F5F5F5',
                  height: 120,

                  flex: 1,
                  textAlignVertical: 'top',
                  paddingLeft: 10,
                  paddingVertical: 10,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 14,
                    lineHeight: 22,
                  }}>
                  {base.estimate_content}
                </Text>
              </View>
            )}
          </View>

          {/* 견적서 파일 */}
          <View style={{marginBottom: 40}}>
            <Text style={[styles.orderInfoContentTitle, {marginBottom: 10}]}>
              견적서 파일
            </Text>

            {base.status === '0' || base.status === '1' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <TextInput
                  value={estimateFileNameCur}
                  placeholder="견적서파일을 첨부해주세요."
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
                  activeOpacity={1}
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
            ) : (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <TextInput
                  value={
                    base.bf_file_source
                      ? base.bf_file_source
                      : '첨부된 파일이 없습니다.'
                  }
                  placeholder="견적서파일을 첨부해주세요."
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
                  activeOpacity={1}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#F5F5F5',
                    borderRadius: 4,
                    height: 50,
                    paddingHorizontal: 20,
                  }}
                  disabled={true}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      textAlign: 'center',
                      color: '#ccc',
                    }}>
                    파일 선택
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {base.bf_file ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  fileDownloadHandler(base.bf_file, base.bf_file_source)
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
                  <Text style={styles.normalText}>{base.bf_file}</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {base.status === '0' ? (
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
                      color: '#00A170',
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
                      {color: '#00A170', fontSize: 12, lineHeight: 20},
                    ]}>
                    문서파일(doc, hwp, xls, xlsx) 또는 이미지파일(jpg,png,gif)
                  </Text>
                  <Text
                    style={[
                      styles.normalText,
                      {color: '#00A170', fontSize: 12},
                    ]}>
                    첨부 가능합니다.
                  </Text>
                </View>
              </View>
            ) : null}
          </View>
          {/* // 견적서 파일 */}
          {base.status === '1' &&
          (base.pdr_id !== null || base.pdr_id !== '') ? (
            <TouchableOpacity
              onPress={() => sendEstimateAPI('proc_partner_estimate_modify')}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>견적 수정</Text>
              </View>
            </TouchableOpacity>
          ) : base.status === '1' &&
            (base.pdr_id === null || base.pdr_id === '') ? (
            <TouchableOpacity
              onPress={() => sendEstimateAPI('proc_partner_estimate_add')}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>견적 발송</Text>
              </View>
            </TouchableOpacity>
          ) : base.status === '2' ? (
            <TouchableOpacity
              onPress={() => sendEstimateCfmAPI()}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>견적 확정</Text>
              </View>
            </TouchableOpacity>
          ) : base.status === '3' ? (
            <TouchableOpacity
              onPress={() => sendPaymentCfmAPI()}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>계약금 입금 확인</Text>
              </View>
            </TouchableOpacity>
          ) : base.status === '4' ? (
            <View style={styles.submitedBtn}>
              <Text style={styles.submitedBtnText}>계약금 입금 완료</Text>
            </View>
          ) : base.status === '5' ? (
            <TouchableOpacity
              onPress={() => sendDeliveryAPI()}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>납품 완료</Text>
              </View>
            </TouchableOpacity>
          ) : base.status === '6' ? (
            <View style={styles.submitedBtn}>
              <Text style={styles.submitedBtnText}>납품 완료</Text>
            </View>
          ) : base.status === '7' ? (
            <View style={styles.submitedBtn}>
              <Text style={styles.submitedBtnText}>수령 완료</Text>
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => sendEstimateAPI('proc_partner_estimate_add')}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>견적 발송</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#00A170',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
    marginVertical: 20,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 145,
    fontSize: 14,
    color: '#A2A2A2',
    marginVertical: 5,
  },
  detailsTitle02: {
    fontFamily: 'SCDream4',
    width: 100,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#00A170',
    marginTop: 20,
    marginBottom: 25,
  },
  orderInfoTitle02: {
    fontFamily: 'SCDream5',
    fontSize: 16,
    color: '#00A170',
    marginTop: 20,
    marginBottom: 5,
  },
  orderInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  textInput: {
    fontFamily: 'SCDream4',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  wd50per: {
    width: '50%',
  },
  mgB10: {
    marginBottom: 10,
  },
  mgB20: {
    marginBottom: 20,
  },
  mgB30: {
    marginBottom: 30,
  },
  mgB40: {
    marginBottom: 40,
  },
  orderInfoContentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#707070',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#00A170',
    width: '100%',
    paddingVertical: 15,
  },
  submitedBtn: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  submitedBtnText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#ccc',
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

export default index;
