import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {useSelector} from 'react-redux';
import DetailHeader from '../Common/DetailHeader';
import Auth from '../../src/api/Auth';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const ReqPopular = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [price, setPrice] = React.useState(null); // 인기 파트너스 신청시 등록비용 선택값
  const [period, setPeriod] = React.useState(null); // 인기 파트너스 신청시 등록기간 선택값
  const [popularInfo, setPopularInfo] = React.useState([]); // 인기 파트너스 개월 수 및 등록 비용 배열 초기값
  const [infoTxt, setInfoTxt] = React.useState(null); // 인기 파트너스 신청시 업체 소개
  const [cateTxt, setCateTxt] = React.useState(null); // 인기 파트너스 신청시 업체 품목

  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const requestPopularInfoAPI = () => {
    Auth.requestPopularInfo()
      .then((res) => {
        if (res.data.result === '1') {
          setPopularInfo(res.data.item);
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

  const requestPopularAPI = () => {
    if (!price) {
      Alert.alert('인기 파트너스 등록 비용을 선택해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    }
    if (!period) {
      Alert.alert('인기 파트너스 등록 기간을 선택해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    }
    if (!infoTxt) {
      Alert.alert('업체 소개를 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    }
    if (!cateTxt) {
      Alert.alert('업업 품목을 입력해주세요.', '', [
        {
          text: '확인',
        },
      ]);
    }

    Auth.requestPopular(mb_email, infoTxt, cateTxt, price, period)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(res.data.message, '홈으로 이동합니다.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Stack'),
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Stack'),
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
  };

  React.useEffect(() => {
    requestPopularInfoAPI();
  }, []);


  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginBottom: 10,
          }}>
          <Text
            style={{
              fontFamily: SCDream4,
              fontSize: 13,
              color: '#00A170',
              marginBottom: 20,
            }}>
            * 인기 파트너스 등록 신청 시, 아래 내용을 확인해주세요.
          </Text>
          <Text style={[styles.orderInfoContentTitle, {marginBottom: 12}]}>
            인기 파트너스 등록 비용
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {popularInfo && popularInfo.length > 0
              ? popularInfo.map((info, idx) => (
                  <TouchableOpacity
                    key={`${info.pp_price}-${idx}`}
                    onPress={() => {
                      setPrice(info.pp_price);
                      setPeriod(info.pp_month);
                    }}
                    activeOpacity={1}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      width: '50%',
                      marginBottom: 10,
                    }}>
                    <Image
                      source={
                        price === info.pp_price
                          ? require('../../src/assets/radio_on.png')
                          : require('../../src/assets/radio_off.png')
                      }
                      resizeMode="contain"
                      style={{width: 20, height: 20, marginRight: 7}}
                    />
                    <Text
                      style={{
                        fontFamily: SCDream4,
                        fontSize: 14,
                        color: '#000',
                      }}>
                      {`${info.pp_month} : ${info.pp_price.replace(
                        /\B(?=(\d{3})+(?!\d))/g,
                        ',',
                      )}`}
                    </Text>
                  </TouchableOpacity>
                ))
              : null}
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
            marginBottom: 20,
          }}
        />
        {/* // 경계 라인 */}

        <View style={{paddingHorizontal: 20}}>
          <Text style={[styles.orderInfoContentTitle, styles.mgB10]}>
            입금 계좌 정보
          </Text>
        </View>
        <View
          style={{
            backgroundColor: '#00A170',
            paddingHorizontal: 20,
            paddingVertical: 15,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontFamily: SCDream4,
              fontSize: 14,
              color: '#FFFFFF',
              marginBottom: 5,
            }}>
            신한은행
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: SCDream4,
                fontSize: 14,
                color: '#FFFFFF',
                marginRight: 10,
              }}>
              562-66312-4512644
            </Text>
            <Text
              style={{fontFamily: SCDream4, fontSize: 14, color: '#FFFFFF'}}>
              페이퍼공작소
            </Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20}}>
          {/* 업체 소개 TextArea */}
          <Text style={[styles.orderInfoContentTitle, styles.mgB10]}>
            업체 소개
          </Text>
          <View style={styles.mgB20}>
            <TextInput
              value={infoTxt}
              placeholder="내용을 적어주세요"
              placeholderTextColor="#A2A2A2"
              style={{
                fontFamily: SCDream4,
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
                lineHeight: 22,
              }}
              onChangeText={(text) => setInfoTxt(text)}
              multiline={true}
            />
          </View>
          {/* 업체 소개 TextArea */}
          {/* 업체 소개 TextArea */}
          <Text style={[styles.orderInfoContentTitle, styles.mgB10]}>
            영업 품목
          </Text>
          <View style={styles.mgB40}>
            <TextInput
              value={cateTxt}
              placeholder="내용을 적어주세요"
              placeholderTextColor="#A2A2A2"
              style={{
                fontFamily: SCDream4,
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
                lineHeight: 22,
              }}
              onChangeText={(text) => setCateTxt(text)}
              multiline={true}
            />
          </View>
          {/* 업체 소개 TextArea */}
        </View>

        {/* 내용안내 gray */}
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            backgroundColor: '#F5F5F5',
            marginBottom: 50,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: SCDream4,
                fontSize: 12,
                color: '#707070',
                marginRight: 5,
              }}>
              ※
            </Text>
            <View style={{paddingRight: 10}}>
              <Text
                style={{
                  fontFamily: SCDream4,
                  fontSize: 12,
                  lineHeight: 20,
                  color: '#707070',
                }}>
                인기 파트너스 등록 완료 후, 안내드린 금액을 입금 해주시면
                페이퍼공작소 매니저가 입금 확인 후, 인기 파트너스로
                등록해드립니다. 신청 후, 일반회원에게 노출될 내용들과 관련하여
                연락드리겠습니다.
              </Text>
            </View>
          </View>
        </View>
        {/* // 내용안내 gray */}
        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity
            onPress={() => requestPopularAPI()}
            activeOpacity={0.8}>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>등록 신청</Text>
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
  orderInfoContentRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  orderInfoContentTitle: {
    fontFamily: SCDream4,
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
    fontSize: 14,
    color: '#707070',
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
  partnerInfoBox: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontFamily: SCDream4,
    fontSize: 15,
    color: '#00A170',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: SCDream4,
    fontSize: 13,
    lineHeight: 20,
    color: '#000000',
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

export default ReqPopular;
