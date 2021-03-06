import * as React from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';

const PartnersInfoModal = ({toggleModal, isVisible}) => {
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

            {/* 컨텐츠 */}
            <ScrollView
              style={styles.container}
              showsVerticalScrollIndicator={false}>
              <Image
                source={require('../../src/assets/img01.png')}
                resizeMode="cover"
                style={{width: Dimensions.get('window').width, height: 170}}
              />
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  backgroundColor: 'rgba(0, 161, 112, 0.07)',
                  marginBottom: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingHorizontal: 0,
                  }}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 20,
                      color: '#00A170',
                      marginRight: 5,
                    }}>
                    *
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 20,
                        color: '#00A170',
                      }}>
                      페이퍼 공작소의 파트너스 회원은 4가지 분류로 나누어집니다.
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 20,
                        color: '#00A170',
                      }}>
                      자세한 설명은 아래의 내용을 참고해주세요.
                    </Text>
                  </View>
                </View>
              </View>

              {/* 파트너스 상세 설명 Area */}
              <View style={{marginBottom: 20}}>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>
                    파트너스 일반 회원
                  </Text>
                  <Text style={styles.partnerInfoDesc}>
                    파트너스 회원으로 가입해주신 회원들에게 부여되는 등급입니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>성실 파트너스</Text>
                  <Text style={styles.partnerInfoDesc}>
                    성실 파트너스는 별점 4.5점 이상, 제작 건 수 99건 이상 달성
                    시, 자동으로 승격됩니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>인기 파트너스</Text>
                  <Text style={styles.partnerInfoDesc}>
                    페이퍼공작소에 인기 파트너스 요청 등록을 하시고 안내드린
                    금액을 입금 해주시면 페이퍼공작소 매니저가 입금 확인 후,
                    인기 파트너스로 등록해드립니다.
                  </Text>
                </View>
                <View style={styles.partnerInfoBox}>
                  <Text style={styles.partnerInfoTitle}>지역 파트너스</Text>
                  <Text style={styles.partnerInfoDesc}>
                    지역 파트너스는 각각의 지역에 속한 파트너스의 누적 진행 건
                    수와 후기 등을 참고하여 페이퍼공작소 매니저가 등록합니다.
                  </Text>
                </View>
              </View>
              {/* // 파트너스 상세 설명 Area */}
              <View
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  backgroundColor: '#F5F5F5',
                  marginBottom: 50,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontFamily: 'SCDream4',
                      fontSize: 12,
                      lineHeight: 20,
                      color: '#707070',
                      marginRight: 5,
                    }}>
                    ※
                  </Text>
                  <View>
                    <Text
                      style={{
                        fontFamily: 'SCDream4',
                        fontSize: 12,
                        lineHeight: 20,
                        color: '#707070',
                      }}>
                      성실 파트너스 / 인기 파트너스 / 지역 파트너스 3가지 등급에
                      대해 중복 적용은 불가능합니다.
                    </Text>
                  </View>
                </View>
              </View>
            </ScrollView>

            {/* // 컨텐츠 */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  partnerInfoBox: {
    paddingHorizontal: 20,
    marginVertical: 15,
  },
  partnerInfoTitle: {
    fontFamily: 'SCDream4',
    fontSize: 15,
    color: '#00A170',
    marginBottom: 10,
  },
  partnerInfoDesc: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    lineHeight: 20,
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

export default PartnersInfoModal;
