import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Header from '../../Common/Header';

const Signed = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 18,
              color: '#00A170',
              marginTop: 20,
            }}>
            회원가입이 정상적으로 완료되었습니다.
          </Text>
          <Text
            style={{
              fontFamily: 'SCDream4',
              fontSize: 16,
              color: '#111',
              marginTop: 10,
              marginBottom: 30,
            }}>
            최고관리자의 승인 이후 원활한 이용이 가능합니다.
          </Text>
          <View
            style={{
              width: '100%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Stack')}
              activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>홈으로</Text>
              </View>
            </TouchableOpacity>
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

export default Signed;
