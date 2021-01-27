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
  TouchableWithoutFeedback,
  Linking,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import DetailHeader from '../Common/DetailHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const phoneNumber = '01012345678';
  const emailAddress = 'paper_workshop@paperworkshop.com';

  const [category01, setCategory01] = React.useState(null);
  const [textInputHeight, setTextInputHeight] = React.useState(0);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
          <Text style={{fontSize: 16, color: '#00A170', marginBottom: 10}}>
            기본 정보
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            <Text style={styles.infoStepDesc}>제목</Text>
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
          <Text style={{fontSize: 14, color: '#A2A2A2', marginBottom: 10}}>
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
          <Text style={{fontSize: 16, color: '#00A170', marginBottom: 10}}>
            타입 선택
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#000000'}}>박스 타입</Text>
            <Text style={{fontSize: 16, color: '#000000'}}>B형 십자</Text>
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
          <Text style={{fontSize: 16, color: '#00A170', marginBottom: 10}}>
            제작 정보
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>
                가로/세로/높이 규격 (단위:mm)
              </Text>
              <Text style={styles.detailsDesc}>10/10/10</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>수량</Text>
              <Text style={styles.detailsDesc}>500</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>목형</Text>
              <Text style={styles.detailsDesc}>있음</Text>
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

        <View style={[styles.wrap, {marginVertical: 10}]}>
          <Text style={{fontSize: 16, color: '#00A170', marginBottom: 10}}>
            지류 선택
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, color: '#000000'}}>구분</Text>
            <Text style={{fontSize: 16, color: '#000000'}}>
              일반(백판지,마닐라류)
            </Text>
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
          <Text style={{fontSize: 16, color: '#00A170', marginBottom: 10}}>
            인쇄도수/교정/감리 선택
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>인쇄도수</Text>
              <Text style={styles.detailsDesc}>(전면) 1도</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>인쇄교정</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>인쇄감리</Text>
              <Text style={styles.detailsDesc}>있음</Text>
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

        <View style={[styles.wrap, {marginVertical: 10}]}>
          <Text style={{fontSize: 16, color: '#00A170', marginBottom: 10}}>
            후가공
          </Text>
          <View style={[styles.infoBox, {marginBottom: 10}]}>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>박가공</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>형압</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>부분 실크</Text>
              <Text style={styles.detailsDesc}>있음</Text>
            </View>
            <View style={styles.details}>
              <Text style={styles.detailsTitle02}>코팅</Text>
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
  infoBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
  },
  infoStepDesc: {
    fontSize: 14,
    color: '#A2A2A2',
    lineHeight: 23,
  },
  infoStepTitle: {
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  detailsTitle: {
    width: 150,
    fontSize: 14,
    color: '#A2A2A2',
  },
  detailsDesc: {
    fontSize: 14,
    color: '#000',
  },
  detailsTitle02: {
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
    fontSize: 18,
    color: '#000000',
    marginTop: 20,
    marginBottom: 25,
  },
  orderInfoDesc: {
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
    fontSize: 15,
    color: '#111',
  },
  orderInfoContentDetail: {
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
    fontSize: 16,
    color: '#00A170',
    textAlign: 'center',
  },
});

export default Detail;
