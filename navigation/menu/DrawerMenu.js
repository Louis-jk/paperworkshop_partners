import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import {useSelector} from 'react-redux';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const DrawerMenu = (props) => {
  const navigation = props.navigation;  

  const {mb_profile_img, ptype, mb_2, mb_email} = useSelector(
    (state) => state.UserInfoReducer,
  );

  const [imgMime, setImgMime] = React.useState(null);

  React.useEffect(() => {
    if (mb_profile_img) {
      const sliceImg = mb_profile_img.slice(mb_profile_img.lastIndexOf('.'));
      setImgMime(sliceImg);
    }
    
  }, [mb_profile_img]);

  const bannerCarouselRef = React.useRef(null);

  const banners = [
    {
      id: 1,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 2,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 3,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 4,
      image: require('../../src/images/ban01.png'),
    },
    {
      id: 5,
      image: require('../../src/images/ban01.png'),
    },
  ];

  const [activeSlide, setActiveSlide] = React.useState(0);
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = Dimensions.get('window').width - 60;

  const renderItem = ({item, index}) => {
    return (
      <View style={{borderRadius: 20, height: 120}}>
        <Image
          key={index}
          source={item.image}
          resizeMode="contain"
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 7,
          }}
        />
      </View>
    );
  };

  const [isPopUpVisible, setIsPopUpVisible] = React.useState(false);
  const PopUp = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  // 로그아웃
  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@paper_info');
    } catch (e) {
      console.log('로그아웃 에러', e);
    }
    Alert.alert('로그아웃 되었습니다.', '로그인 화면으로 이동합니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('Login'),
      },
    ]);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Modal isVisible={isPopUpVisible} onBackdropPress={PopUp}>
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
              paddingVertical: 100,
              borderRadius: 5,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={PopUp}
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
            <Text style={{fontFamily: SCDream4}}>
              현재 페이퍼공작소 무료이용 가능합니다.
            </Text>
          </View>
        </View>
      </Modal>

      <View>
        <View
          style={{
            backgroundColor: '#00A170',
            paddingHorizontal: 20,
            paddingVertical: 25,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'flex-end',
              marginBottom: 7,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Main')}>
              <Image
                source={require('../../src/assets/home.png')}
                resizeMode="cover"
                style={{width: 20, height: 20, marginRight: 13}}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.closeDrawer('right')}>
              <Image
                source={require('../../src/assets/icon_close02.png')}
                resizeMode="cover"
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                height: 80,
                borderRadius: 160,
                backgroundColor: '#fff',
                marginRight: 20,
              }}>
              {mb_profile_img && imgMime !== '.gif' ? (
                <Image
                  source={{uri: `${mb_profile_img}`}}
                  resizeMode="cover"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                  }}
                />
              ) : mb_profile_img && imgMime === '.gif' ? (
                <FastImage
                  source={{uri: `${mb_profile_img}`}}
                  resizeMode={FastImage.resizeMode.contain}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                  }}
                />
              ) : (
                <Image
                  source={require('../../src/assets/photo.png')}
                  resizeMode="cover"
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 80,
                  }}
                />
              )}
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    marginRight: 5,
                  }}>
                  <Text
                    style={{
                      fontFamily: SCDream4,
                      color: '#00A170',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                    }}>
                    {ptype === 'sincere'
                      ? '성실파트너스'
                      : ptype === 'popular'
                      ? '인기파트너스'
                      : ptype === 'local'
                      ? '지역파트너스'
                      : '일반회원'}
                  </Text>
                </View>
                <Text
                  style={{
                    fontFamily: SCDream4,
                    color: '#fff',
                    fontSize: 18,
                  }}>
                  {mb_2} 님
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ProfileEdit')}>
                  <View
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                    }}>
                    <Image
                      source={require('../../src/assets/icon_pf.png')}
                      resizeMode="contain"
                      style={{
                        width: 15,
                        height: 15,
                        marginTop: 2,
                      }}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <Text style={styles.whiteFont}>{mb_email}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Statistics')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>통계</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('Message')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>메세지</Text>
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('ProfileDetailEdit', {
              screen: 'ProfileDetailEdit',
            })
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>파트너스 정보 수정</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('PartnerInfo')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>파트너스 회원 등급</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Service', {screen: 'Service'})}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>서비스 소개</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('CCenter', {screen: 'CCenter'})}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>고객센터</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CompanyInfo', {screen: 'CompanyInfo'})
          }
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>회사소개</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Alarm')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>알림 설정</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>

        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={PopUp}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>견적의뢰 이용권 구매</Text>
          <Image
            source={require('../../src/assets/arr03.png')}
            resizeMode="contain"
            style={{width: 30, height: 30}}
          />
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        <TouchableOpacity
          activeOpacity={1}
          onPress={logout}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={styles.categoryTitle}>로그아웃</Text>
        </TouchableOpacity>
        <View
          style={{
            width: Dimensions.get('window').width,
            height: 1,
            backgroundColor: '#F5F5F5',
          }}
        />
        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('Steps')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={[styles.categoryTitle, {color: '#e5e5e5'}]}>
            견적발송및채택-테스트
          </Text>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('Product')}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <Text style={[styles.categoryTitle, {color: '#e5e5e5'}]}>
            제작납품-테스트
          </Text>
        </TouchableOpacity> */}

        <View style={{height: 80}} />

        {/* 배너 광고 section */}
        <View
          style={{
            paddingVertical: 30,
            backgroundColor: '#FFF',
            position: 'relative',
          }}>
          <View>
            <Carousel
              ref={bannerCarouselRef}
              data={banners}
              renderItem={renderItem}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              layout="default"
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={5000}
              loop={true}
              onSnapToItem={(index) => {
                setActiveSlide(index);
              }}
            />
            <Pagination
              dotsLength={banners.length}
              activeDotIndex={activeSlide}
              dotContainerStyle={{margin: 0, padding: 0}}
              dotStyle={{
                width: 40,
                height: 8,
                borderRadius: 8,
                marginHorizontal: 0,
                paddingHorizontal: 0,
                backgroundColor: '#00A170',
              }}
              inactiveDotStyle={{
                width: 8,
                height: 8,
                backgroundColor: '#C8C8C8',
                marginHorizontal: 0,
                paddingHorizontal: 0,
              }}
              inactiveDotOpacity={1}
              inactiveDotScale={1}
              tappableDots={true}
              carouselRef={bannerCarouselRef}
              containerStyle={{paddingVertical: 20}}
            />
          </View>
        </View>
        {/* // 배너 광고 section */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  whiteFont: {
    fontFamily: SCDream4,
    color: '#fff',
  },
  categoryText: {
    fontFamily: SCDream4,
    fontSize: 14,
    lineHeight: 28,
  },
  categoryTitle: {
    fontFamily: SCDream5,
    fontSize: 16,
    paddingVertical: 15,
  },
  pdH20: {
    paddingHorizontal: 20,
  },
  mb10: {
    marginBottom: 10,
  },
  mb20: {
    marginBottom: 20,
  },
  mV10: {
    marginVertical: 10,
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

export default DrawerMenu;
