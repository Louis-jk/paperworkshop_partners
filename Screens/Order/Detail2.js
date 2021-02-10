import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import DetailHeader from '../Common/DetailHeader';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 16,
              color: '#00A170',
              marginBottom: 20,
            }}>
            기본 정보
          </Text>
          <View style={[styles.infoBox]}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>제목</Text>
              <Text style={styles.detailsDesc}>
                중소기업 선물용 쇼핑백 제작 요청합니다.
              </Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>분류</Text>
              <Text style={styles.detailsDesc}>단상자/선물세트/쇼핑백</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>견적 마감일</Text>
              <Text style={styles.detailsDesc}>2020.11.01</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>납품 희망일</Text>
              <Text style={styles.detailsDesc}>2020.12.01</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>디자인 의뢰</Text>
              <Text style={styles.detailsDesc}>인쇄만 의뢰</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄 업체 선호 지역</Text>
              <Text style={styles.detailsDesc}>서울</Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 14,
              color: '#A2A2A2',
              marginBottom: 10,
            }}>
            첨부파일
          </Text>
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

        <View style={[styles.wrap, {marginVertical: 10}]}>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 16,
              color: '#00A170',
              marginBottom: 20,
            }}>
            상세정보
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>박스타입</Text>
              <Text style={styles.detailsDesc}>B형 십자</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>규격(사이즈)입력</Text>
              <Text style={styles.detailsDesc}>10/10/10</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>수량</Text>
              <Text style={styles.detailsDesc}>500</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>목형</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄용지</Text>
              <Text style={styles.detailsDesc}>일반(백판지,마닐라류)</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄도수</Text>
              <Text style={styles.detailsDesc}>(전면) 1도</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄교정</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>인쇄감리</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>박가공</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>형압</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>부분 실크</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle}>코팅</Text>
              <Text style={styles.detailsDesc}>코팅 없음</Text>
            </View>
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
  infoBox: {},
  infoStepDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
    fontFamily: 'SCDream4',
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
    marginBottom: 15,
  },
  detailsTitle: {
    fontFamily: 'SCDream4',
    width: 120,
    fontSize: 14,
    marginRight: 10,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000',
  },
  detailsTitle02: {
    fontFamily: 'SCDream4',
    width: 200,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream4',
    fontSize: 18,
    color: '#000000',
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
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  pickerWrap: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 4,
    backgroundColor: '#fff',
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
    borderRadius: 5,
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
  submitBtnBorder: {
    borderWidth: 1,
    borderColor: '#00A170',
    borderRadius: 5,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnBorderText: {
    fontFamily: 'SCDream4',
    fontSize: 16,
    color: '#00A170',
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

export default Detail;
