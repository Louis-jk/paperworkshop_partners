import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

import DetailHeader from '../DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [orderActive, setOrderActive] = React.useState(true);
  const [noticeActive, setNoticeActive] = React.useState(true);
  const [faqActive, setFaqActive] = React.useState(true);

  const toggleSwich01 = () => {
    setOrderActive((p) => !p);
  };
  const toggleSwich02 = () => {
    setNoticeActive((p) => !p);
  };
  const toggleSwich03 = () => {
    setFaqActive((p) => !p);
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container}>
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
            marginBottom: 30,
          }}
        />
        {/* // 경계 라인 */}

        <View style={styles.alarmBox}>
          <Text style={styles.alarmText}>고객이 견적 요청 시, 알림 허용</Text>
          <TouchableOpacity onPress={toggleSwich01} activeOpacity={1}>
            <Image
              source={
                orderActive
                  ? require('../../../src/assets/t_on.png')
                  : require('../../../src/assets/t_off.png')
              }
              resizeMode="contain"
              style={{width: 80, height: 36}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.alarmBox}>
          <Text style={styles.alarmText}>공지사항 새글 알림 허용</Text>
          <TouchableOpacity onPress={toggleSwich02} activeOpacity={1}>
            <Image
              source={
                noticeActive
                  ? require('../../../src/assets/t_on.png')
                  : require('../../../src/assets/t_off.png')
              }
              resizeMode="contain"
              style={{width: 80, height: 36}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.alarmBox}>
          <Text style={styles.alarmText}>1:1 문의 답변 알림 허용</Text>
          <TouchableOpacity onPress={toggleSwich03} activeOpacity={1}>
            <Image
              source={
                faqActive
                  ? require('../../../src/assets/t_on.png')
                  : require('../../../src/assets/t_off.png')
              }
              resizeMode="contain"
              style={{width: 80, height: 36}}
            />
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
  alarmBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  alarmText: {
    fontSize: 15,
    color: '#111111',
  },
});

export default index;
