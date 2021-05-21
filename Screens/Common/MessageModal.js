import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

import Modal from 'react-native-modal';

const MessageModal = ({toggleModal, isVisible}) => {
  const sendMessage = () => {
    Alert.alert('메세지 보내기 성공', '상대방에게 메세지가 보내졌습니다.', [
      {
        text: '확인',
        onPress: () => toggleModal(),
      },
    ]);
  };

  return (
    <View>
      <Modal isVisible={isVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* <Button title="Show modal" onPress={toggleModal} /> */}

          <View
            style={{
              position: 'relative',
              backgroundColor: '#fff',
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleModal}
              hitSlop={{top: 50, bottom: 50, left: 50, right: 50}}
              style={{
                backgroundColor: '#00A170',
                padding: 10,
                borderRadius: 30,
                position: 'absolute',
                top: -15,
                right: -15,
                zIndex: 1,
                elevation: 1,
              }}>
              <Image
                source={require('../../src/assets/icon_close02.png')}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
            <TextInput
              placeholder="메세지를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                fontFamily: SCDream4,
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                width: Dimensions.get('window').width - 120,
                height: 150,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
              multiline={true}
              autoFocus={true}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={sendMessage}
              style={{
                backgroundColor: '#00A170',
                paddingVertical: 10,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 5,
                marginTop: 10,
              }}>
              <Text style={{fontFamily: SCDream4, color: '#fff'}}>
                메세지 보내기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MessageModal;
