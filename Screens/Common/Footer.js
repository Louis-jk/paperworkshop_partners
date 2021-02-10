import React from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';

const Footer = (props) => {
  const navigation = props.navigation;

  return (
    <View
      style={{
        backgroundColor: '#F5F5F5',
        paddingVertical: 32,
        paddingHorizontal: 20,
        marginTop: 30,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginBottom: 15,
        }}>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Terms')}>
          <View style={{marginRight: 10}}>
            <Text
              style={{
                fontFamily: 'SCDream5',
                fontSize: 14,
                letterSpacing: -1,
                paddingRight: 10,
                paddingVertical: 10,
              }}>
              이용약관
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate('Privacy')}>
          <View>
            <Text
              style={{
                fontFamily: 'SCDream5',
                fontSize: 14,
                letterSpacing: -1,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}>
              개인정보 처리방침
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>

      {/* Footer 정보영역 */}
      <View style={{marginBottom: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginBottom: 2,
          }}>
          <Text style={{fontFamily: 'SCDream4', fontSize: 12, marginRight: 15}}>
            상호명 : (주)브릿지빌더스
          </Text>
          <Text style={{fontFamily: 'SCDream4', fontSize: 12}}>
            대표이사 : 김원기
          </Text>
        </View>
        <View style={{marginBottom: 2}}>
          <Text style={{fontSize: 12, marginRight: 15}}>
            개인정보책임관리자 : 성아름
          </Text>
        </View>
        <View style={{marginBottom: 2}}>
          <Text style={{fontFamily: 'SCDream4', fontSize: 12, marginRight: 15}}>
            주소 : 부산시 금정구 금샘로 246번길 18 150동 150호
          </Text>
        </View>
        <View style={{marginBottom: 2}}>
          <Text style={{fontFamily: 'SCDream4', fontSize: 12, marginRight: 15}}>
            사업자등록번호 : 234-13-01682
          </Text>
        </View>
        <View style={{marginBottom: 2}}>
          <Text style={{fontFamily: 'SCDream4', fontSize: 12, marginRight: 15}}>
            통신판매업신고번호 : 123-45-679812
          </Text>
        </View>
      </View>
      {/* // Footer 정보영역 */}
    </View>
  );
};

export default Footer;
