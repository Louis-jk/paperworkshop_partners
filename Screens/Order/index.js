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
  ActivityIndicator,
} from 'react-native';
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

  console.log('detail props', props);
  console.log('detail pe_id', pe_id);

  const payPerType = ['10', '20', '30', '40', '50'];
  const [isActiveTogglePayPer, setIsActiveTogglePayPer] = React.useState(false);
  const togglePayPer = () => {
    setIsActiveTogglePayPer(!isActiveTogglePayPer);
  };
  const [isLoading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState([]);

  const [productPrice, setProductPrice] = React.useState('0'); // 제작비
  const [designPrice, setDesignPrice] = React.useState('0'); // 디자인비
  const [deliveryPrice, setDeliveryPrice] = React.useState('0'); // 물류비
  const [depositRatio, setDepositRatio] = React.useState('10'); // 계약금 비율
  const [depositPrice, setDepositPrice] = React.useState('0'); // 계약금
  const [totalPrice, setTotalPrice] = React.useState('0'); // 총 견적 금액
  const [estimateText, setEstimateText] = React.useState(''); // 견적 상세 설명

  const priceHandler = () => {
    console.log('productPrice', productPrice);
    console.log('productPrice Type', typeof productPrice);

    let productPriceInt = parseInt(productPrice);
    let designPriceInt = parseInt(designPrice);
    let deliveryPriceInt = parseInt(deliveryPrice);
    let depositRatioInt = parseInt(depositRatio);

    let total = productPriceInt + designPriceInt + deliveryPriceInt;
    let totalStr = total.toString();
    let totalPriceFormat = totalStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setTotalPrice(totalPriceFormat);

    let deposit = total * (depositRatioInt / 100);
    let depositStr = deposit.toString();
    let depositPriceFormat = depositStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    setDepositPrice(depositPriceFormat);
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

  const getEstimateDetailAPI = () => {
    setLoading(true);
    Estimate.getDetail(pe_id, mb_email)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          console.log(res);
          setDetail(res.data.item[0]);
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

  const goMoreDetail = (checkId) => {
    if (checkId === '1') {
      navigation.navigate('OrderDetailPackage', {
        screen: 'OrderDetailPackage',
        params: {pe_id: pe_id, cate1: detail.cate1},
      });
    } else if (checkId === '0') {
      navigation.navigate('OrderDetailGeneral', {
        screen: 'OrderDetailGeneral',
        params: {pe_id: pe_id, cate1: detail.cate1},
      });
    } else {
    }
  };

  console.log('기본 상세 detail', detail);
  console.log('기본 상세 totalPrice', totalPrice);

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
              {detail.status === '1'
                ? '입찰중'
                : detail.status === '2'
                ? '파트너스최종선정(견적확정대기)'
                : detail.status === '3'
                ? '파트너스최종선정(계약금입금대기)'
                : detail.status === '4'
                ? '파트너스최종선정(계약금입금완료)'
                : detail.status === '5'
                ? '입금제작요청'
                : detail.status === '6'
                ? '납품완료'
                : detail.status === '7'
                ? '수령완료'
                : detail.status === '8'
                ? '마감'
                : null}
            </Text>
            <Text style={styles.infoStepTitle}>{detail.title}</Text>
            <View style={styles.line} />
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>분류</Text>
              <Text style={styles.detailsDesc}>{detail.ca_name}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>{detail.estimate_date}</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>납품 희망일</Text>
              <Text style={styles.detailsDesc}>{detail.delivery_date}</Text>
            </View>
            <View style={styles.detailsEnd}>
              <View style={styles.detailsEnd}>
                <Text style={styles.detailsTitle}>디자인 의뢰</Text>
                <Text style={styles.detailsDesc}>
                  {detail.design_print === 'P'
                    ? '인쇄만 의뢰'
                    : detail.design_print === 'D'
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
                onPress={() => goMoreDetail(detail.cate1)}
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
        <View style={styles.wrap}>
          <Text style={styles.orderInfoTitle}>
            견적{' '}
            {detail.status === '0' || detail.status === '1' ? '작성' : '내용'}
          </Text>
          <View style={[styles.flexRow, styles.mgB30]}>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>제작비(원)</Text>
              {detail.status === '0' || detail.status === '1' ? (
                <TextInput
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
                    {detail.production_price &&
                      detail.production_price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>디자인비(원)</Text>
              {detail.status === '0' || detail.status === '1' ? (
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
                    {detail.design_price &&
                      detail.design_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={[styles.flexRow, styles.mgB30]}>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>물류비(원)</Text>
              {detail.status === '0' || detail.status === '1' ? (
                <TextInput
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
                    {detail.reduce_price &&
                      detail.reduce_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>계약금(선금) 비율</Text>
              {detail.status === '0' || detail.status === '1' ? (
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
                    {detail.deposit_rate}%
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
              {detail.status === '0' || detail.status === '1' ? (
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
                      {depositPrice ? depositPrice : '0'}
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
                    {detail.deposit &&
                      detail.deposit.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>총 견적 금액(원)</Text>
              {detail.status === '0' || detail.status === '1' ? (
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
                      {totalPrice ? totalPrice : '0'}
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
                    {detail.total_price &&
                      detail.total_price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
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
            {detail.status === '0' || detail.status === '1' ? (
              <TextInput
                value={estimateText}
                placeholder="견적 상세 설명을 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  fontFamily: 'SCDream4',
                  borderRadius: 5,
                  backgroundColor: '#F5F5F5',
                  height: 120,
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
                <Text style={{fontFamily: 'SCDream4', fontSize: 14}}>
                  {detail.estimate_content}
                </Text>
              </View>
            )}
          </View>

          {/* 견적서 파일 */}
          <View style={{marginBottom: 40}}>
            <Text style={[styles.orderInfoContentTitle, {marginBottom: 10}]}>
              견적서 파일
            </Text>

            {detail.status === '0' || detail.status === '1' ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <TextInput
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
                    detail.bf_file_source
                      ? detail.bf_file_source
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
                      color: '#fff',
                      textAlign: 'center',
                      color: '#ccc',
                    }}>
                    파일 선택
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            {detail.bf_file ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  fileDownloadHandler(detail.bf_file, detail.bf_file_source)
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
                  <Text style={styles.normalText}>{detail.bf_file}</Text>
                </View>
              </TouchableOpacity>
            ) : null}
            {detail.status === '0' || detail.status === '1' ? (
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
          {detail.status === '5' ? (
            <TouchableOpacity
              onPress={() => Alert.alert('납품')}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>납품 완료</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => Alert.alert('제출')}
              activeOpacity={0.8}>
              <View style={styles.submitBtn}>
                <Text style={styles.submitBtnText}>견적 제출</Text>
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
    fontFamily: 'SCDream4',
    fontSize: 18,
    color: '#00A170',
    marginTop: 20,
    marginBottom: 25,
  },
  orderInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
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

export default index;
