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
import {useSelector, useDispatch} from 'react-redux';

import {
  UserEstimateYn,
  UserNoticeYn,
  UserQaYn,
} from '../../../Modules/UserInfoReducer';
import DetailHeader from '../DetailHeader';
import Setting from '../../../src/api/Setting';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_email, notice_yn, qa_yn, estimate_yn} = useSelector(
    (state) => state.UserInfoReducer,
  );
  const dispatch = useDispatch();

  const [orderActive, setOrderActive] = React.useState(null);
  const [noticeActive, setNoticeActive] = React.useState(null);
  const [faqActive, setFaqActive] = React.useState(null);

  const toggleSwich01 = () => {
    if (orderActive === 'Y') {
      setOrderActive('N');
      dispatch(UserEstimateYn('N'));
      setAlarm('N', noticeActive, faqActive);
    } else {
      setOrderActive('Y');
      dispatch(UserEstimateYn('Y'));
      setAlarm('Y', noticeActive, faqActive);
    }
  };
  const toggleSwich02 = () => {
    if (noticeActive === 'Y') {
      setNoticeActive('N');
      dispatch(UserNoticeYn('N'));
      setAlarm(orderActive, 'N', faqActive);
    } else {
      setNoticeActive('Y');
      dispatch(UserNoticeYn('Y'));
      setAlarm(orderActive, 'Y', faqActive);
    }
  };
  const toggleSwich03 = () => {
    if (faqActive === 'Y') {
      setFaqActive('N');
      dispatch(UserQaYn('N'));
      setAlarm(orderActive, noticeActive, 'N');
    } else {
      setFaqActive('Y');
      dispatch(UserQaYn('Y'));
      setAlarm(orderActive, noticeActive, 'Y');
    }
  };

  React.useEffect(() => {
    if (orderActive === null && noticeActive === null && faqActive === null) {
      setOrderActive(estimate_yn);
      setNoticeActive(notice_yn);
      setFaqActive(qa_yn);
    }
  }, []);

  const setAlarm = (payload01, payload02, payload03) => {
    Setting.onAlarm(mb_email, payload01, payload02, payload03).then((res) =>
      console.log('alarm', res),
    );
  };

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
                orderActive === 'Y'
                  ? require('../../../src/assets/t_on.png')
                  : require('../../../src/assets/t_off.png')
              }
              fadeDuration={0}
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
                noticeActive === 'Y'
                  ? require('../../../src/assets/t_on.png')
                  : require('../../../src/assets/t_off.png')
              }
              fadeDuration={0}
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
                faqActive === 'Y'
                  ? require('../../../src/assets/t_on.png')
                  : require('../../../src/assets/t_off.png')
              }
              fadeDuration={0}
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
    fontFamily: SCDream4,
    fontSize: 15,
    color: '#111111',
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
});

export default index;
