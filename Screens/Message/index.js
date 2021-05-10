import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../Common/Header';
import ChatAPI from '../../src/api/Chat';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {mb_email} = useSelector((state) => state.UserInfoReducer); // 파트너스 회원 아이디(이메일)

  const [isLoading, setLoading] = React.useState(false);
  const [rooms, setRooms] = React.useState([]);


  // 채팅방 리스트 가져오기
  const getChatRoomListAPI = () => {
    setLoading(true);
    ChatAPI.getChatRoomList(mb_email)
      .then((res) => {
        if (res.data.result === '1') {
          setRooms(res.data.item);
        }
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getChatRoomListAPI();
    });

    return unsubscribe;
  }, [navigation]);


  // 채팅방 나가기
  const goOutChatRoomAPI = (payload) => {
    ChatAPI.goOutChatRoom(payload)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => getChatRoomListAPI(),
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
              onPress: () => getChatRoomListAPI(),
            },
          ]);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 채팅방 나가기전 체크
  const goOutChatRoomChecking = (payload) => {
    Alert.alert(
      '채팅방을 삭제하시겠습니까?',
      '삭제하시면 대화내용이 영구삭제됩니다.',
      [
        {
          text: '삭제하기',
          onPress: () => goOutChatRoomAPI(payload),
        },
        {
          text: '취소',
        },
      ],
    );
  };

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
      {rooms && rooms.length > 0 ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}>
          <View style={styles.wrap}>
            {rooms.map((room, idx) => (
              <TouchableOpacity
                key={room.pm_id}
                onPress={() =>
                  navigation.navigate('MessageDetail', {
                    screen: 'MessageDetail',
                    params: {chatId: room.pm_id},
                  })
                }
                activeOpacity={0.8}>
                <View style={[styles.wrap, styles.msgBox]}>
                  <View style={styles.flexRow}>
                    <Image
                      source={{uri: `${room.mb_profile}`}}
                      resizeMode="cover"
                      style={{
                        width: 70,
                        height: 70,
                        borderRadius: 70,
                        marginRight: 20,
                      }}
                    />
                    <View style={{flex: 2}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        {room.company_name ? (
                          <Text style={styles.msgInfoName}>
                            {room.company_name} : {''}
                          </Text>
                        ) : null}
                        {room.user_name ? (
                          <Text style={{...styles.msgInfoName, width: '87%'}} numberOfLines={1}>
                            {room.user_name}
                          </Text>
                        ) : null}
                      </View>
                      <Text style={{...styles.msgInfoName, width: '87%'}} numberOfLines={1}>제목 : {room.title}</Text>
                      {room.msg ? (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                          }}>
                          <Text
                            style={[
                              styles.msgInfoContent,
                              {fontFamily: 'SCDream5', color: '#00A170'},
                            ]}
                            numberOfLines={1}>
                            최신글 :
                          </Text>
                          <Text style={{...styles.msgInfoContent, width: '67%'}} numberOfLines={1}>
                            {' '}
                            {room.msg}
                          </Text>
                        </View>
                      ) : (
                        <Text
                          style={[styles.msgInfoContent, {color: '#b5b5b5'}]}
                          numberOfLines={1}>
                          채팅 내역이 없습니다.
                        </Text>
                      )}
                    </View>
                    <View style={{position: 'absolute', top: -10, right: -10, width: 30, height: 30}}>
                      <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => goOutChatRoomChecking(room.pm_id)}>
                        <Image
                          source={require('../../src/assets/icon_close01.png')}
                          resizeMode="contain"
                          style={{
                            width: 30,
                            height: 30,
                            marginBottom: 20,
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  msgBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginBottom: 5,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  msgInfoName: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  msgInfoContent: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#000000',
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

export default index;
