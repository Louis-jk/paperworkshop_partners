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

// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

import DetailHeader from '../../Common/DetailHeader';
import Footer from '../../Common/Footer';

const Register = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);
  const [value, setValue] = React.useState(null);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
        {/* <View style={{backgroundColor: '#F5F5F5'}}>
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
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 100,
              }}>
              <Image
                source={require('../../../src/assets/photo.png')}
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 15,
                marginVertical: 5,
                letterSpacing: -1,
              }}>
              프로필 이미지 등록
            </Text>
          </View>
        </View>
         */}
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          {/* 이메일 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              이메일
            </Text>
            <TextInput
              placeholder="이메일을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <Text style={{color: '#00A170'}}>
              * 세금계산서 발행용 이메일을 등록해주세요.
            </Text>
          </View>
          {/* // 이메일 */}

          {/* 비밀번호 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              비밀번호
            </Text>
            <TextInput
              placeholder="비밀번호를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
              secureTextEntry
            />
            <TextInput
              placeholder="비밀번호를 재입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          {/* // 비밀번호 */}

          {/* 성함  */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>성함</Text>
            <TextInput
              value=""
              placeholder="성함을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 성함  */}

          {/* 휴대폰 번호  */}
          <View style={{marginBottom: 20}}>
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
                value=""
                placeholder="휴대전화번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 2,
                  paddingHorizontal: 10,
                  marginRight: 10,
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
                  borderRadius: 2,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
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
                value=""
                placeholder="인증번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 2,
                  paddingHorizontal: 10,
                  marginRight: 10,
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
                  borderRadius: 2,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  인증번호 확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* // 휴대폰 번호  */}

          {/* 상호명  */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              상호명
            </Text>
            <TextInput
              value=""
              placeholder="상호명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 상호명  */}

          {/* 사업자 등록증  */}
          <View style={{marginBottom: 20}}>
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
                value=""
                placeholder="사업자 등록증을 첨부해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 2,
                  paddingHorizontal: 10,
                  marginRight: 10,
                }}
                editable={false}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 2,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text style={{color: '#fff', textAlign: 'center'}}>
                  파일 선택
                </Text>
              </TouchableOpacity>
            </View>
            <Text style={{color: '#00A170'}}>
              * 이미지 파일만 첨부 가능합니다.
            </Text>
          </View>
          {/* // 사업자 등록증  */}

          {/* 위치  */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>위치</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                backgroundColor: '#fff',
                width: '49%',
              }}>
              <Picker
                selectedValue={category01} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(itemValue, itemIndex) => {
                  setCategory01(itemValue);
                }}
                style={{color: '#111'}}
                mode="dropdown">
                <Picker.Item label="서울" value="1" />
                <Picker.Item label="부산" value="2" />
                <Picker.Item label="대구" value="3" />
                <Picker.Item label="인천" value="4" />
                <Picker.Item label="광주" value="5" />
                <Picker.Item label="세종/대전/청주" value="6" />
                <Picker.Item label="울산" value="7" />
                <Picker.Item label="경기" value="8" />
                <Picker.Item label="강원" value="9" />
                <Picker.Item label="충청" value="10" />
                <Picker.Item label="전라북도" value="11" />
                <Picker.Item label="전라남도" value="12" />
                <Picker.Item label="경상북도" value="13" />
                <Picker.Item label="경상남도" value="14" />
                <Picker.Item label="제주" value="15" />
              </Picker>
            </View>
          </View>
          {/* // 위치  */}

          {/* 제작물 카테고리  */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              제작물 카테고리
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                backgroundColor: '#fff',
                width: '49%',
              }}>
              <Picker
                selectedValue={category02} //제일 위 선택란에 누른 아이템이 표시된다
                onValueChange={(itemValue, itemIndex) => {
                  setCategory02(itemValue);
                }}
                style={{color: '#111'}}
                mode="dropdown">
                <Picker.Item label="패키지" value="package" />
                <Picker.Item label="일반인쇄" value="printing" />
              </Picker>
            </View>
          </View>
          {/* // 제작물 카테고리  */}

          {/* 계좌정보  */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              계좌정보
            </Text>
            <TextInput
              value=""
              placeholder="은행명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
            <TextInput
              value=""
              placeholder="계좌번호를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 2,
                paddingHorizontal: 10,
              }}
            />
          </View>
          {/* // 계좌정보  */}
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity
            onPress={() => Alert.alert('회원가입완료')}
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
    fontSize: 15,
    fontWeight: 'bold',
    lineHeight: 19,
    marginBottom: 7,
  },
  profileDesc: {
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
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
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
});

export default Register;
