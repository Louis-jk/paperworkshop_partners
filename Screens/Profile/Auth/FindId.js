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

const FindId = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);
  const [value, setValue] = React.useState(null);

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
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
                borderRadius: 4,
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
                  borderRadius: 4,
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
                  borderRadius: 4,
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
                  borderRadius: 4,
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
                  borderRadius: 4,
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
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert('고객님의 아이디는', '*** 입니다.', [
                {
                  text: '확인',
                },
              ])
            }
            activeOpacity={0.8}>
            <View style={[styles.submitBtn, {marginBottom: 10}]}>
              <Text style={styles.submitBtnText}>아이디 찾기</Text>
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

export default FindId;
