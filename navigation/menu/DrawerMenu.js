import React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Linking,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';

import Carousel, {Pagination} from 'react-native-snap-carousel';

const DrawerMenu = (props) => {
  const navigation = props.navigation;

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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
                style={{width: 20, height: 20, marginRight: 10}}
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
              justifyContent: 'space-between',
              paddingHorizontal: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                <View>
                  <Text
                    style={{
                      color: '#00A170',
                      fontSize: 12,
                      fontWeight: 'bold',
                      lineHeight: 14,
                    }}>
                    페이퍼
                  </Text>
                  <Text
                    style={{
                      color: '#00A170',
                      fontSize: 12,
                      fontWeight: 'bold',
                      lineHeight: 14,
                    }}>
                    공작소
                  </Text>
                </View>
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
                        color: '#00A170',
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                      }}>
                      성실파트너스
                    </Text>
                  </View>
                  <Text style={{color: '#fff', fontSize: 18}}>파트너님</Text>
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
                <Text style={styles.whiteFont}>paper@naver.com</Text>
              </View>
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
                // console.log('C index', index);
                setActiveSlide(index);
              }}
              // containerCustomStyle={{ marginHorizontal: 20 }}
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
    color: '#fff',
  },
  categoryText: {
    fontSize: 14,
    lineHeight: 28,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default DrawerMenu;
