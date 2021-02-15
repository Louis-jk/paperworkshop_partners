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
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DetailHeader from '../Common/DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const payPerType = ['10%', '20%', '30%', '40%', '50%'];
  const [payPer, setPayPer] = React.useState(payPerType[0]);
  const [isActiveTogglePayPer, setIsActiveTogglePayPer] = React.useState(false);
  const togglePayPer = () => {
    setIsActiveTogglePayPer(!isActiveTogglePayPer);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <View style={styles.infoBox}>
            <Text style={styles.infoStepDesc}>입찰중</Text>
            <Text style={styles.infoStepTitle}>
              중소기업 선물용 쇼핑백 제작 요청합니다.
            </Text>
            <View style={styles.line} />
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>분류</Text>
              <Text style={styles.detailsDesc}>단상자/선물세트/쇼핑백</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>2020.11.01</Text>
            </View>
            <View style={styles.detailsEnd}>
              <View style={styles.detailsEnd}>
                <Text style={styles.detailsTitle}>납품 희망일</Text>
                <Text style={styles.detailsDesc}>2020.12.01</Text>
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
                onPress={() => navigation.navigate('OrderDetail2')}
                style={{alignSelf: 'flex-end'}}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    textDecorationLine: 'underline',
                    color: '#A2A2A2',
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
          <Text style={styles.orderInfoTitle}>견적 작성</Text>
          <View style={[styles.flexRow, styles.mgB40]}>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>견적 금액(원)</Text>
              <TextInput
                placeholder="금액을 입력하세요."
                style={styles.textInput}
              />
            </View>
            <View style={styles.wd50per}>
              <Text style={styles.orderInfoDesc}>계약금(선금) 비율</Text>
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
                  <Text style={{fontFamily: 'SCDream4'}}>{payPer}</Text>
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
                        setPayPer(v);
                        setIsActiveTogglePayPer(false);
                      }}>
                      <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={[styles.orderInfoContentRow, styles.mgB10]}>
            <Text style={styles.orderInfoContentTitle}>견적 내용</Text>
            <Text style={styles.orderInfoContentDetail}>
              (100자 내외로 적어주세요 예시)
            </Text>
          </View>
          <View style={styles.mgB40}>
            <TextInput
              placeholder="메모를 입력해주세요."
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
              multiline={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => Alert.alert('제출')}
            activeOpacity={0.8}>
            <View style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>견적 제출</Text>
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
