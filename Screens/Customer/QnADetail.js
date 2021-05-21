import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import Header from '../Common/DetailHeader';
import Info from '../../src/api/Info';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const QnADetail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const status = props.route.params.status;
  const qa_id = props.route.params.qa_id;

  const [isLoading, setLoading] = React.useState(false);
  const [detail, setDetail] = React.useState({});

  const getQnaDetailAPI = () => {
    setLoading(true);
    Info.getQnaDetail(qa_id)
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
    getQnaDetailAPI();
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
          <ActivityIndicator size="large" color="#275696" />
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
              <Text style={styles.new}>
                {detail.new_yn === 'Y' ? 'NEW' : null}
              </Text>
              <Text style={styles.categoryDate}>{detail.qa_datetime}</Text>
            </View>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 14,
                  color: '#000',
                  lineHeight: 28,
                  width: '100%',
                  marginBottom: 5,
                },
              ]}>
              제목
            </Text>
            <Text style={[styles.categoryTitle, {marginBottom: 10}]}>
              {detail.qa_subject}
            </Text>
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

        {/* 1:1 문의 내용 */}
        <View style={{paddingHorizontal: 20}}>
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 14,
                  color: '#000',
                  width: '100%',
                  marginBottom: 10,
                },
              ]}>
              내용
            </Text>
            <Text
              style={[
                styles.normalText,
                {
                  fontSize: 15,
                  color: '#333333',
                  lineHeight: 22,
                  width: '100%',
                  marginBottom: 20,
                },
              ]}>
              {detail.qa_content}
            </Text>
          </View>
        </View>
        {/* // 1:1 문의 내용 */}

        <View
          style={{
            height: 1,
            width: Dimensions.get('window').width,
            backgroundColor: '#D7D7D7',
            marginBottom: 10,
          }}
        />

        {/* 답변 내용 */}

        <View style={{paddingHorizontal: 20}}>
          <View style={{marginTop: 15}}>
            <Text
              style={[
                styles.boldText,
                {
                  fontSize: 14,
                  color: '#000',
                  width: '100%',
                  marginBottom: 10,
                },
              ]}>
              답변
            </Text>
            {detail.qa_status === '1' ? (
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 15,
                    color: '#333333',
                    lineHeight: 22,
                    width: '100%',
                    marginBottom: 20,
                  },
                ]}>
                {detail.re_content}
              </Text>
            ) : (
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 15,
                    color: '#333333',
                    lineHeight: 28,
                    width: '100%',
                    marginBottom: 20,
                  },
                ]}>
                아직 답변이 없습니다.
              </Text>
            )}
          </View>
        </View>
        {/* // 답변 내용 */}
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
    borderColor: '#275696',
    backgroundColor: '#275696',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
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
  categoryWrap: {
    marginTop: 20,
    paddingBottom: 10,
  },
  categoryBtn: {
    backgroundColor: '#275696',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: SCDream4,
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: SCDream4,
    fontSize: 12,
    color: '#366DE5',
  },
  categoryTitle: {
    fontFamily: SCDream5,
    fontSize: 15,
    lineHeight: 24,
    color: '#000',
  },
  categoryDate: {
    fontFamily: SCDream4,
    fontSize: 13,
    color: '#A2A2A2',
  },
});

export default QnADetail;
