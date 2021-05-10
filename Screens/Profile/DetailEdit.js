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
import {useSelector, useDispatch} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import Header from '../Common/DetailHeader';
import Modal from '../Common/PartnersInfoModal';
import Auth from '../../src/api/Auth';
import {
  UserDescription,
  UserBusinessTime,
  UserCloseDay,
  UserUsed,
  UserPortfolio,
} from '../../Modules/UserInfoReducer';

const DetailEdit = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [isModalVisible, setModalVisible] = React.useState(false);
  const {
    mb_no,
    mb_email,
    description,
    businessTime,
    closeDay,
    used,
    portfolioImg,
  } = useSelector((state) => state.UserInfoReducer);


  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [descriptionEdit, setDescriptionEdit] = React.useState(''); // 업체 소개
  const [businessTimeEdit, setBusinessTimeEdit] = React.useState(''); // 영업 시간
  const [closeDayEdit, setCloseDayEdit] = React.useState(''); // 휴무일
  const [usedEdit, setUsedEdit] = React.useState(''); // 업체 품목

  const [source, setSource] = React.useState([]); // API 탈 때 넘길 format(형식)
  const [uploadImage, setUploadImage] = React.useState([]); // 현재(local: RN상에서) 표시될 사진 정보

  React.useEffect(() => {
    setDescriptionEdit(description);
    setBusinessTimeEdit(businessTime);
    setCloseDayEdit(closeDay);
    setUsedEdit(used);

    if (portfolioImg && portfolioImg.length > 0) {
      setUploadImage(
        portfolioImg.map((img) => {
          return {
            uri: img.uri,
            type: img.type,
            name: img.name,
          };
        }),
      );
    }
  }, []);

  // 사진 선택 제한 function
  const photoCountErr = (payload, num) => {
    if (payload === 'over') {
      Alert.alert(
        '사진은 5장까지 등록 가능합니다.',
        '사진 갯수를 확인해주세요.',
        [
          {
            text: '확인',
            onPress: () => {},
          },
        ],
      );
    } else if (payload === 'dubble') {
      Alert.alert(
        `중복되는 사진이 ${num}개 있습니다.`,
        '사진을 확인해주세요.',
        [
          {
            text: '확인',
            onPress: () => {},
          },
        ],
      );
    } else {
      return false;
    }
  };

  // react-native-image-crop-picker 모듈 사용
  const pickImageHandler = () => {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      sortOrder: 'none',
      compressImageMaxWidth: 500,
      compressImageMaxHeight: 500,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperCircleOverlay: true,
      useFrontCamera: false,
      cropping: true,
    })
      .then((img) => {
        if (img.length + uploadImage.length > 5) {
          photoCountErr('over', '');
        } else {
          // setUploadImage((prev) => prev.concat(img));
          setUploadImage((prev) =>
            prev.concat(
              img.map((i) => {
                return {
                  uri: i.path,
                  type: i.mime,
                  name: i.path.slice(i.path.lastIndexOf('/')),
                };
              }),
            ),
          );
        }
      })
      .catch((e) => console.log(e.message ? e.message : e));
  };

  const removeImg = (payload) => {
    const result = uploadImage.filter((select) => select.uri !== payload);
    setUploadImage(result);
  };

  // 파트너스 정보 수정 API
  const onEditAPI = () => {

    const frmData = new FormData();
    frmData.append('method', 'proc_modify_partner2');
    frmData.append('mb_no', mb_no);
    frmData.append('mb_id', mb_email);
    frmData.append('mb_6', descriptionEdit);
    frmData.append('mb_7', businessTimeEdit);
    frmData.append('mb_8', closeDayEdit);
    frmData.append('mb_9', usedEdit);
    uploadImage.map((img) => {
      frmData.append('bf_file[]', img);
    });


    Auth.onEdit(frmData).then((res) => {
      if (res.data.result === '1') {
        dispatch(UserDescription(descriptionEdit));
        dispatch(UserBusinessTime(businessTimeEdit));
        dispatch(UserCloseDay(closeDayEdit));
        dispatch(UserUsed(usedEdit));
        dispatch(UserPortfolio(uploadImage));
        Alert.alert(res.data.message, '홈으로 이동합니다.', [
          {
            text: '확인',
            onPress: () => navigation.navigate('Stack'),
          },
        ]);
      }
    });
  };


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
              value={descriptionEdit}
              placeholder="내용을 적어주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setDescriptionEdit(text)}
              style={{
                fontFamily: 'SCDream4',
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
            />
          </View>
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              영업시간
            </Text>
            <TextInput
              value={businessTimeEdit}
              placeholder="예: 10:00 ~ 17:00 (점심시간 12:00~13:00)"
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBusinessTimeEdit(text)}
              style={{
                fontFamily: 'SCDream4',
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
            />
          </View>
          <View style={styles.profileBox}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              휴무일
            </Text>
            <TextInput
              value={closeDayEdit}
              placeholder="예: 토,일,공휴일"
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setCloseDayEdit(text)}
              style={{
                fontFamily: 'SCDream4',
                borderRadius: 5,
                backgroundColor: '#F5F5F5',
                paddingLeft: 10,
                paddingVertical: 10,
              }}
            />
          </View>
          <View style={{marginBottom: 20}}>
            <View style={styles.profileBox}>
              <Text style={[styles.profileTitle, {marginBottom: 10}]}>
                영업 품목
              </Text>
              <TextInput
                value={usedEdit}
                placeholder="예: 패키지, 명함, 책자, 스티커, 전단지"
                placeholderTextColor="#A2A2A2"
                onChangeText={(text) => setUsedEdit(text)}
                style={{
                  fontFamily: 'SCDream4',
                  borderRadius: 5,
                  backgroundColor: '#F5F5F5',
                  paddingLeft: 10,
                  paddingVertical: 10,
                }}
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
              ({uploadImage.length}/5)
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
              {uploadImage && uploadImage.length > 0 ? (
                uploadImage.map((uImg, idx) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={idx}
                    style={{
                      flex:
                        uploadImage.length > 3
                          ? 1
                          : uploadImage.length <= 3
                          ? 0
                          : null,
                    }}>
                    <ImageBackground
                      source={{uri: `${uImg.uri}`}}
                      resizeMode="cover"
                      borderRadius={4}
                      style={{
                        position: 'relative',
                        width: Dimensions.get('window').width / 5 - 15,
                        height: Dimensions.get('window').width / 5 - 15,
                        marginRight: uploadImage.length <= 3 ? 10 : 0,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          removeImg(uImg.uri);
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderTopRightRadius: 4,
                          borderBottomLeftRadius: 4,
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
                      </TouchableOpacity>
                    </ImageBackground>
                  </TouchableOpacity>
                ))
              ) : null}

              {/* 기존 업로드 된 이미지 */}
              {/* {portfolioImg && portfolioImg.length === 1 ? (
                <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}>
                  <ImageBackground
                    source={{uri: `${portfolioImg}`}}
                    resizeMode="cover"
                    borderRadius={4}
                    style={{
                      position: 'relative',
                      width: Dimensions.get('window').width / 5 - 15,
                      height: Dimensions.get('window').width / 5 - 15,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        removeImg(portfolioImg);
                      }}
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
                    </TouchableOpacity>
                  </ImageBackground>
                </TouchableOpacity>
              ) : portfolioImg && portfolioImg.length > 1 ? (
                portfolioImg.map((uImg, idx) => (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    key={idx}
                    style={{
                      flex:
                        portfolioImg.length > 3
                          ? 1
                          : portfolioImg.length <= 3
                          ? 0
                          : null,
                    }}>
                    <ImageBackground
                      source={{uri: `${uImg}`}}
                      resizeMode="cover"
                      borderRadius={4}
                      style={{
                        position: 'relative',
                        width: Dimensions.get('window').width / 5 - 15,
                        height: Dimensions.get('window').width / 5 - 15,
                        marginRight: portfolioImg.length <= 3 ? 10 : 0,
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          removeImg(uImg);
                        }}
                        style={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: 30,
                          height: 30,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderTopRightRadius: 4,
                          borderBottomLeftRadius: 4,
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
                      </TouchableOpacity>
                    </ImageBackground>
                  </TouchableOpacity>
                ))
              ) : null}
              {portfolioImg && portfolioImg.length < 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={pickImageHandler}
                  style={{}}>
                  <Image
                    source={require('../../src/assets/photo_plus.png')}
                    resizeMode="cover"
                    style={{
                      width: Dimensions.get('window').width / 5 - 15,
                      height: Dimensions.get('window').width / 5 - 15,
                    }}
                  />
                </TouchableOpacity>
              )} */}
              {/* // 기존 업로드 된 이미지 */}

              {uploadImage && uploadImage.length < 5 && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={pickImageHandler}
                  style={{}}>
                  <Image
                    source={require('../../src/assets/photo_plus.png')}
                    resizeMode="cover"
                    style={{
                      width: Dimensions.get('window').width / 5 - 15,
                      height: Dimensions.get('window').width / 5 - 15,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
          {/* // 사진 Area */}
        </View>

        <View style={{paddingHorizontal: 20, marginBottom: 50}}>
          <TouchableOpacity onPress={() => onEditAPI()} activeOpacity={0.8}>
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
