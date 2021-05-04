import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  VirtualizedList
} from 'react-native';

import {useSelector} from 'react-redux';
import moment from 'moment';
import 'moment/locale/ko';

import Modal from 'react-native-modal';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image'; // gif 이미지 출력 패키지
import RNFetchBlob from 'rn-fetch-blob'; // 파일 다운로드 패키지
import DocumentPicker from 'react-native-document-picker'; // 파일 업로드 패키지

import DetailHeader from '../Common/DetailHeader';
import ChatAPI from '../../src/api/Chat';

const Detail = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;
  const {chatId} = props.route.params; // 채팅방 ID

  const {mb_email} = useSelector((state) => state.UserInfoReducer); // 파트너스 회원 아이디(이메일)

  const [isLoading, setLoading] = React.useState(false);  
  const [chatHistory, setChatHistory] = React.useState([]); // 채팅 히스토리
  const [message, setMessage] = React.useState(''); // 메세지 텍스트
  const [msgFile, setMsgFile] = React.useState(''); // 채팅 파일(이미지 또는 엑셀, pdf 등) 값

  
  // 채팅방 글 히스토리 가져오기
  const getChatHistoryAPI = () => {
    Alert.alert("pm_id ?", chatId);
    setLoading(true);
    ChatAPI.getChatHistory(chatId)
      .then((res) => {
        console.log("결과", res);
        if (res && res.data && res.data.result === '1') {
          setChatHistory(res.data.item);
          setLoading(false);          
        } else {
          //res.data.message
          Alert.alert('test', '관리자에게 문의하세요.', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
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
    getChatHistoryAPI();
  },[]);

  // const onEndReached = () => {
  //   if (isLoading) {
  //     return;
  //   } else {
  //     getChatHistoryAPI();
  //   }
  // };


  // 이미지 모달창
  const ImageModal = ({toggleModal, isVisible, imgPath}) => {
    let extension = '';
    if (imgPath !== null) {
      extension = imgPath.slice(imgPath.lastIndexOf('.'));
    }

    return (
      <View>
        <Modal
          isVisible={isVisible}
          // onBackdropPress={toggleModal}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{marginBottom: 20}}>
            {extension !== '.gif' ? (
              <AutoHeightImage
                width={Dimensions.get('window').width - 40}
                source={{uri: `${imgPath}`}}
                maxHeight={600}
                resizeMode="contain"
              />
            ) : (
              <FastImage
                source={{uri: `${imgPath}`}}
                resizeMode={FastImage.resizeMode.contain}
                style={{
                  width: Dimensions.get('window').width - 40,
                  height: 250,
                  borderRadius: 5,
                  marginRight: 10,
                }}
              />
            )}
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={toggleModal}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#fff',
              paddingHorizontal: 14,
              paddingVertical: 7,
            }}>
            <Text style={{fontFamily: 'SCDream4', fontSize: 13, color: '#fff'}}>
              닫기
            </Text>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  };

  const [isModalVisible, setModalVisible] = React.useState(false);
  const [imgPath, setImgPath] = React.useState(null);

  // 이미지 모달 핸들러
  const imageModalHandler = () => {
    setModalVisible(!isModalVisible);
  };

  // 채팅 메세지 전송
  const sendMessageAPI = () => {
    let frmData = new FormData();
    frmData.append('method', 'proc_partner_message');
    frmData.append('company_id', mb_email);
    frmData.append('pm_id', chatId);
    frmData.append('msg', message);
    frmData.append('bf_file[]', msgFile);

    ChatAPI.sendMessage(frmData)
      .then((res) => {
        if (res.data.result === '1') {
          setMessage('');
          setMsgFile('');
          getChatHistoryAPI();
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
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


  // 파일 다운로드 핸들러
  const fileDownloadHandler = (filePath, fileName) => {
    Alert.alert('파일을 다운로드 하시겠습니까?', '', [
      {
        text: '다운드로',
        onPress: () => downloader(filePath, fileName),
      },
      {
        text: '취소',
      },
    ]);
  };

  // 파일 다운로드 메소드
  const downloader = async (filePath, fileName) => {
    await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        trusty: false,
        path: `${RNFetchBlob.fs.dirs.DownloadDir}/${fileName}`,
      },
    })
      .fetch('GET', filePath, {
        'Content-Type': 'multipart/form-data',
      })
      .then((res) => {
        Alert.alert('다운로드 되었습니다.', '내파일에서 확인해주세요.', [
          {
            text: '확인',
          },
        ]);
      });
  };

  // 파일 업로드 메소드
  const filePicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      setMsgFile({
        uri: res.uri,
        type: res.type,
        name: res.name,
      });
      Alert.alert('파일을 전송하시겠습니까?', '', [
        {
          text: '확인',
          onPress: () => sendMessageAPI(),
        },
      ]);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  // 채팅방 나가기
  const goOutChatRoomAPI = (payload) => {
    ChatAPI.goOutChatRoom(payload)
      .then((res) => {
        if (res.data.result === '1') {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Message'),
            },
          ]);
        } else {
          Alert.alert(res.data.message, '관리자에게 문의하세요.', [
            {
              text: '확인',
              onPress: () => navigation.navigate('Message'),
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
      '채팅방을 나가시겠습니까?',
      '채팅방과 대화내용이 영구삭제됩니다.',
      [
        {
          text: '나가기',
          onPress: () => goOutChatRoomAPI(payload),
        },
        {
          text: '취소',
        },
      ],
    );
  };

  const renderRow = ({item, idx}) => {
    return (
      <View key={item.pc_id} style={{paddingHorizontal:20}}>
        {item.diff === 'Y' ?
          <View style={{marginTop: 50, marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{marginRight: 10}}>- - - - - - - -</Text>
            <Text style={styles.normalText}>{moment(item.chat_date).locale('ko').format('YYYY.MM.DD (ddd)')}</Text>
            <Text style={{marginLeft: 10}}>- - - - - - - -</Text>
          </View>
        : null}
        {/* <Text>{item.pc_id}</Text> */}
        {item.mb_id === mb_email && item.msg ? 
          <View
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <View style={styles.msgBubbleP}>
              <Text style={styles.msgTextP}>{item.msg}</Text>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
        : item.mb_id === mb_email && item.bf_file && (item.bf_file_ext === 'jpg' || item.bf_file_ext === 'png') ?
          <View
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  imageModalHandler();
                  setImgPath(item.bf_file);
                }}>
                <Image
                  source={{uri: `${item.bf_file}`}}
                  resizeMode="cover"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
        : item.mb_id === mb_email && item.bf_file && item.bf_file_ext === 'gif' ? 
          <View
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  imageModalHandler();
                  setImgPath(item.bf_file);
                }}>
                <FastImage
                  source={{uri: `${item.bf_file}`}}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
          : item.mb_id === mb_email && item.bf_file &&
          item.bf_file_ext !== 'gif' &&
          item.bf_file_ext !== 'jpg' &&
          item.bf_file_ext !== 'png' ? 
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              fileDownloadHandler(
                item.bf_file,
                item.bf_file_soure,
              )
            }
            style={{
              alignSelf: 'flex-end',
              flexDirection: 'row-reverse',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginLeft: 10,
              }}>
              <Image
                source={require('../../src/assets/icon_down.png')}
                resizeMode="cover"
                style={{width: 30, height: 30, marginRight: 10}}
              />
              <Text style={styles.normalText}>
                {item.bf_file_soure}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </TouchableOpacity>
        : 
        item.mb_id !== mb_email && item.msg ?
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <Image
              source={{uri: `${item.mb_profile}`}}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
            <View style={styles.msgBubble}>
              <Text style={styles.msgText}>{item.msg}</Text>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
        : item.mb_id !== mb_email && item.bf_file && (item.bf_file_ext === 'jpg' || item.bf_file_ext === 'png') ?
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <Image
              source={{uri: `${item.mb_profile}`}}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  imageModalHandler();
                  setImgPath(item.bf_file);
                }}>
                <Image
                  source={{uri: `${item.bf_file}`}}
                  resizeMode="cover"
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
        : item.mb_id !== mb_email && item.bf_file && item.bf_file_ext === 'gif' ? 
          <View
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  imageModalHandler();
                  setImgPath(item.bf_file);
                }}>
                <FastImage
                  source={{uri: `${item.bf_file}`}}
                  resizeMode={FastImage.resizeMode.cover}
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </View>
          : item.mb_id !== mb_email && item.bf_file &&
          item.bf_file_ext !== 'gif' &&
          item.bf_file_ext !== 'jpg' &&
          item.bf_file_ext !== 'png' ? 
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              fileDownloadHandler(
                item.bf_file,
                item.bf_file_soure,
              )
            }
            style={{
              alignSelf: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              paddingVertical: 10,
              width: '70%',
            }}>
            <Image
              source={{uri: `${item.mb_profile}`}}
              resizeMode="cover"
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#fff',
                padding: 10,
                borderRadius: 5,
                marginRight: 10,
              }}>
              <Image
                source={require('../../src/assets/icon_down.png')}
                resizeMode="cover"
                style={{width: 30, height: 30, marginRight: 10}}
              />
              <Text style={styles.normalText}>
                {item.bf_file_soure}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: 'SCDream4',
                alignSelf: 'flex-end',
                fontSize: 12,
                color: '#000000',
              }}>
              {moment(item.chat_date).format('HH:mm')}
            </Text>
          </TouchableOpacity>
        : null}
      </View>
    )
  }
  

  return (
    <>
      <DetailHeader title={routeName} navigation={navigation} />
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
      {/* 채팅 내역 히스토리 */}
      
      <FlatList
        data={chatHistory}
        initialNumToRender={5}
        renderItem={renderRow}
        keyExtractor={(item, index) => index.toString()}
        // onEndReached={onEndReached}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false}
        progressViewOffset={true}
        refreshing={true}
        ListEmptyComponent={(
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: Dimensions.get('window').height - 230,
            }}>
            <Text style={{fontFamily: 'SCDream4'}}>
              채팅 내역이 없습니다.
            </Text>
          </View>
        )}
      />
      
      {/* <View
        style={{
          position: 'absolute',
          bottom: 100,
          alignSelf: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => goOutChatRoomChecking(chatId)}>
          <View
            style={{
              justifyContent: 'center',
              borderRadius: 50,
              backgroundColor: 'rgba(68, 68, 68, 0.2)',
            }}>
            <Text
              style={{
                fontFamily: 'SCDream4',
                fontSize: 14,
                color: '#000',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              채팅방 나가기
            </Text>
          </View>
        </TouchableOpacity>
      </View> */}
      {/* // 채팅 내역 히스토리 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#00A170',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => filePicker()}
          style={{flex: 1}}>
          <Image
            source={require('../../src/assets/chat_fileupload.png')}
            resizeMode="contain"
            style={{width: 22, height: 22}}
          />
        </TouchableOpacity>
        <View style={{flex: 10}}>
          <TextInput
            value={message}
            placeholder="메세지 글적기..."
            placeholderTextColor="#00A170"
            autoCapitalize="none"
            style={{
              textAlignVertical: 'center',
              fontFamily: 'SCDream4',
              color: '#000',
              fontSize: 14,
              lineHeight: 22,
              backgroundColor: '#fff',
              borderRadius: 5,
              paddingLeft: 10,
              marginHorizontal: 10,
            }}
            onChangeText={(text) => setMessage(text)}
            multiline={true}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => sendMessageAPI()}
          style={{flex: 1}}>
          <Image
            source={require('../../src/assets/icon01.png')}
            resizeMode="contain"
            style={{width: 40, height: 30}}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EFEFEF',
  },
  msgBubble: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    marginRight: 5,
    marginTop: 10,
  },
  msgText: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 20,
    color: '#000000',
  },
  msgBubbleP: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#00A170',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    marginLeft: 5,
  },
  msgTextP: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 20,
    color: '#fff',
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

export default Detail;
