import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  Alert,
} from 'react-native';

import {useSelector} from 'react-redux';
import DetailHeader from '../DetailHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import StatisticsAPI from '../../../src/api/Statistics';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const [info, setInfo] = React.useState(null); // 통계 정보
  const [accumulatePrice, setAccumulatePrice] = React.useState(null); // 누적 금액
  const [deliveryPrice, setDeliveryPrice] = React.useState(null); // 납품 실적 금액

  const yearformat = new Date();
  let curYear = yearformat.getFullYear();
  console.log('curYear', curYear);

  const yearCount = ['2017', '2018', '2019', '2020', '2021'];
  const [year, setYear] = React.useState('2021');
  const [isActiveToggleYear, setIsActiveToggleYear] = React.useState(false);
  const toggleYear = () => {
    setIsActiveToggleYear(!isActiveToggleYear);
  };

  const monthCount = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];
  const [month, setMonth] = React.useState('01');
  const [isActiveToggleMonth, setIsActiveToggleMonth] = React.useState(false);
  const toggleMonth = () => {
    setIsActiveToggleMonth(!isActiveToggleMonth);
  };

  const regionCount = [
    'all',
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
  const [region, setRegion] = React.useState('all');
  const [isActiveToggleRegion, setIsActiveToggleRegion] = React.useState(false);
  const toggleRegion = () => {
    setIsActiveToggleRegion(!isActiveToggleRegion);
  };

  const getStatisticsAPI = () => {
    let regionValue = region === 'all' ? '' : region;

    console.log('regionValue', regionValue);

    StatisticsAPI.getStatistics(mb_email, year, month, regionValue)
      .then((res) => {
        console.log('통계 res', res);
        if (res.data.result === '1') {
          setInfo(res.data.item[0]);
          setAccumulatePrice(res.data.item[0].accumulate_price);
          let dvPrice = res.data.item[0].delivery_price.toString();
          setDeliveryPrice(dvPrice);
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

  React.useEffect(() => {
    getStatisticsAPI();
  }, [year, month, region]);

  console.log('year, month, region', year, month, region);
  console.log('mb_email', mb_email);

  console.log('info', info);
  console.log('accumulatePrice', accumulatePrice);
  console.log('accumulatePrice type', typeof accumulatePrice);
  console.log('deliveryPrice', deliveryPrice);
  console.log('deliveryPrice type', typeof deliveryPrice);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {info !== null && accumulatePrice !== null && (
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 20,
              backgroundColor: 'rgba(0, 161, 112, 0.07)',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#000000',
                }}>
                누적건수
              </Text>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#00A170',
                }}>
                {info.accumulate_cnt}건
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#000000',
                }}>
                누적 견적 금액
              </Text>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#00A170',
                }}>
                {accumulatePrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </Text>
            </View>
          </View>
        )}
        {/* 날짜 선택 Area */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
            zIndex: 100,
          }}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              backgroundColor: '#fff',
              width: '30%',
              marginRight: 5,
            }}>
            <TouchableOpacity
              onPress={toggleYear}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>{year}년</Text>
              {isActiveToggleYear ? (
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
          {isActiveToggleYear && (
            <View
              style={{
                position: 'absolute',
                top: 70,
                left: '4.1%',
                width: '30%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                zIndex: 100,
              }}>
              {yearCount.map((v, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{paddingVertical: 7, marginBottom: 7}}
                  activeOpacity={0.8}
                  onPress={() => {
                    setYear(v);
                    setIsActiveToggleYear(false);
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>{v}년</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              backgroundColor: '#fff',
              width: '25%',
              marginRight: 5,
            }}>
            <TouchableOpacity
              onPress={toggleMonth}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>{month}월</Text>
              {isActiveToggleMonth ? (
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
          {isActiveToggleMonth && (
            <View
              style={{
                position: 'absolute',
                top: 70,
                left: '35.4%',
                width: '25%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                zIndex: 100,
              }}>
              {monthCount.map((v, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{paddingVertical: 7, marginBottom: 7}}
                  activeOpacity={0.8}
                  onPress={() => {
                    setMonth(v);
                    setIsActiveToggleMonth(false);
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>{v}월</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          <View
            style={{
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderRadius: 4,
              backgroundColor: '#fff',
              width: '45%',
            }}>
            <TouchableOpacity
              onPress={toggleRegion}
              activeOpacity={0.8}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 50,
                paddingHorizontal: 10,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>
                {region === 'all'
                  ? '전체'
                  : region === 'seoul'
                  ? '서울'
                  : region === 'busan'
                  ? '부산'
                  : region === 'daegu'
                  ? '대구'
                  : region === 'incheon'
                  ? '인천'
                  : region === 'gwangju'
                  ? '광주'
                  : region === 'sejong'
                  ? '세종/대전/청주'
                  : region === 'ulsan'
                  ? '울산'
                  : region === 'gyeongi'
                  ? '경기'
                  : region === 'gangwon'
                  ? '강원'
                  : region === 'choongcheong'
                  ? '충청'
                  : region === 'jeonra'
                  ? '전라'
                  : region === 'gyeongsang'
                  ? '경상'
                  : region === 'jeju'
                  ? '제주'
                  : null}
              </Text>
              {isActiveToggleRegion ? (
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
          {isActiveToggleRegion && (
            <View
              style={{
                position: 'absolute',
                top: 70,
                right: '4%',
                width: '45%',
                backgroundColor: '#fff',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderBottomRightRadius: 5,
                borderBottomLeftRadius: 5,
                zIndex: 100,
              }}>
              {regionCount.map((r, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={{paddingVertical: 7, marginBottom: 7}}
                  activeOpacity={0.8}
                  onPress={() => {
                    setRegion(r);
                    setIsActiveToggleRegion(false);
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>
                    {r === 'all'
                      ? '전체'
                      : r === 'seoul'
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
          )}
        </View>

        {/* // 날짜 선택 Area */}
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
            marginBottom: 20,
          }}
        />
        {/* // 경계 라인 */}
        {info !== null && deliveryPrice !== null && (
          <View
            style={{
              height: 500,
              // height: Dimensions.get('window').height - 500,
              backgroundColor: '#fff',
              // paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
                marginBottom: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#111111',
                }}>
                낙찰 건 수
              </Text>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#00A170',
                }}>
                {info.bid_cnt}건
              </Text>
            </View>
            <View
              style={{
                height: 1,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginTop: 10,
                marginBottom: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#111111',
                }}>
                납품 실적 금액
              </Text>
              <Text
                style={{
                  fontFamily: 'SCDream4',
                  fontSize: 15,
                  color: '#00A170',
                }}>
                {deliveryPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  partnerInfoBox: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#00A170',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    lineHeight: 20,
    color: '#000000',
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
