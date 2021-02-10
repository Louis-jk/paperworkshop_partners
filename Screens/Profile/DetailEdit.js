import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
  ImageBackground,
  Dimensions,
} from 'react-native';

import Header from '../Common/DetailHeader';
import Modal from '../Common/PartnersInfoModal';

const DetailEdit = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [description, setDescription] = React.useState('');
  const [used, setUsed] = React.useState('');

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} />
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginBottom: 50,
          }}>
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              업체 소개
            </Text>
            <TextInput
              value={description}
              placeholder="내용을 적어주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setDescription(text)}
              style={{
                fontFamily: 'SCDream4',
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                height: 120,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
              multiline={true}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <View style={styles.profileBox}>
              <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                영업 품목
              </Text>
              <TextInput
                value={used}
                placeholder="내용을 적어주세요."
                placeholderTextColor="#A2A2A2"
                onChangeText={(text) => setUsed(text)}
                style={{
                  fontFamily: 'SCDream4',
                  borderRadius: 5,
                  backgroundColor: '#F5F5F5',
                  height: 120,
                  flex: 1,
                  textAlignVertical: 'top',
                  paddingLeft: 10,
                  paddingVertical: 10,
                }}
                multiline={true}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 15,
            }}>
            <Text
              style={[styles.orderInfoTitle, {marginTop: 0, marginRight: 5}]}>
              사진 첨부
            </Text>

            <Text style={[styles.normalText, {color: '#00A170', fontSize: 14}]}>
              (4/5)
            </Text>
          </View>

          {/* 사진 Area */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
                <ImageBackground
                  source={require('../../src/images/w02.jpg')}
                  resizeMode="cover"
                  borderRadius={4}
                  style={{
                    position: 'relative',
                    width: Dimensions.get('window').width / 5 - 15,
                    height: Dimensions.get('window').width / 5 - 15,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                    <Image
                      source={require('../../src/assets/icon_close02.png')}
                      resizeMode="center"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
                <ImageBackground
                  source={require('../../src/images/w02.jpg')}
                  resizeMode="cover"
                  borderRadius={4}
                  style={{
                    position: 'relative',
                    width: Dimensions.get('window').width / 5 - 15,
                    height: Dimensions.get('window').width / 5 - 15,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                    <Image
                      source={require('../../src/assets/icon_close02.png')}
                      resizeMode="center"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
                <ImageBackground
                  source={require('../../src/images/w02.jpg')}
                  resizeMode="cover"
                  borderRadius={4}
                  style={{
                    position: 'relative',
                    width: Dimensions.get('window').width / 5 - 15,
                    height: Dimensions.get('window').width / 5 - 15,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                    <Image
                      source={require('../../src/assets/icon_close02.png')}
                      resizeMode="center"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
                <ImageBackground
                  source={require('../../src/images/w02.jpg')}
                  resizeMode="cover"
                  borderRadius={4}
                  style={{
                    position: 'relative',
                    width: Dimensions.get('window').width / 5 - 15,
                    height: Dimensions.get('window').width / 5 - 15,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      width: 35,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderTopRightRadius: 4,
                      backgroundColor: 'rgba(0,0,0,0.3)',
                    }}>
                    <Image
                      source={require('../../src/assets/icon_close02.png')}
                      resizeMode="center"
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </View>
                </ImageBackground>
              </TouchableOpacity>

              <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
                <Image
                  source={require('../../src/assets/photo_plus.png')}
                  resizeMode="cover"
                  style={{
                    width: Dimensions.get('window').width / 5 - 15,
                    height: Dimensions.get('window').width / 5 - 15,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* // 사진 Area */}
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity
            onPress={() => Alert.alert('수정')}
            activeOpacity={0.8}>
            <View style={[styles.submitBtn, {marginBottom: 10}]}>
              <Text style={styles.submitBtnText}>수정</Text>
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
    fontFamily: 'SCDream5',
    fontSize: 15,
    lineHeight: 19,
    marginBottom: 7,
  },
  profileDesc: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#111',
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
  cancelBtn: {
    borderRadius: 4,
    backgroundColor: '#F5F5F5',
    width: '100%',
    paddingVertical: 15,
  },
  cancelBtnText: {
    fontFamily: 'SCDream4',
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
    fontFamily: 'SCDream4',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 5,
  },
  listDesc: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    lineHeight: 16,
    color: '#A2A2A2',
  },
  listStep: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#00A170',
  },
  listDday: {
    fontFamily: 'SCDream4',
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#A2A2A2',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  orderInfoTitle: {
    fontFamily: 'SCDream5',
    fontSize: 15,
    color: '#000000',
    marginTop: 20,
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

export default DetailEdit;
