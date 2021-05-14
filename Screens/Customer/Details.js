import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Header from '../Common/DetailHeader';
import Info from '../../src/api/Info';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const fa_id = props.route.params.fa_id;

  const [isLoading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  const getFaqDetailAPI = () => {
    Info.getFaqDetail(fa_id)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setDetail(res.data.item[0]);
          setLoading(false);
        } else {
          Alert.alert(
            '잘못된 경로로 들어오셨습니다.',
            '관리자에게 문의하세요',
            [
              {
                text: '확인',
              },
            ],
          );
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getFaqDetailAPI();
  }, []);

  return (
    <>
      <Header title={routeName} navigation={navigation} />
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
        <View style={{paddingHorizontal: 20}}>
          <View style={styles.categoryWrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                {/* <View style={styles.categoryBtn}>
                  <Text style={styles.categoryBtnTxt}>카테고리A</Text>
                </View>
                <Text style={styles.new}>NEW</Text> */}
              </View>
              {/* <Text style={styles.categoryDate}>2020.11.01</Text> */}
            </View>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 16,
                  color: '#00A170',
                  lineHeight: 28,
                  width: '100%',
                  marginBottom: 5,
                },
              ]}>
              Q.
            </Text>
            <Text style={styles.categoryTitle}>{detail.fa_subject}</Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            width: Dimensions.get('window').width,
            backgroundColor: '#D7D7D7',
            marginBottom: 10,
          }}
        />

        <View style={{paddingHorizontal: 20}}>
          {/* 이벤트 내용 */}
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 16,
                  color: '#00A170',
                  lineHeight: 28,
                  width: '100%',
                  marginBottom: 5,
                },
              ]}>
              A.
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 14,
                  color: '#333333',
                  lineHeight: 28,
                  width: '100%',
                  marginBottom: 20,
                },
              ]}>
              {detail.fa_content}
            </Text>
          </View>
          {/* // 이벤트 내용 */}
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
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#00A170',
    backgroundColor: '#00A170',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
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
  categoryWrap: {
    marginTop: 20,
    paddingBottom: 10,
  },
  categoryBtn: {
    backgroundColor: '#00A170',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#00A170',
  },
  categoryTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    lineHeight: 24,
    color: '#000',
  },
  categoryDate: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#A2A2A2',
  },
});

export default Detail;
