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
} from 'react-native';

import {useSelector} from 'react-redux';
import Header from '../Common/Header';
import Modal from '../Common/PartnersInfoModal';

const Edit = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_name, mb_2, mb_hp} = useSelector((state) => state.UserInfoReducer);

  const [category01, setCategory01] = React.useState(null);
  const [category02, setCategory02] = React.useState(null);

  const [isModalVisible, setModalVisible] = React.useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [name, setName] = React.useState('김성준');
  const [businessName, setBusinessName] = React.useState('디몬스터');
  const [mobileNo, setMobileNo] = React.useState('01012345678');
  const [mobileCert, setMobileCert] = React.useState(null);
  const [bank, setBank] = React.useState('신한은행');
  const [bankAccount, setBankAccount] = React.useState('562-123-4567812');
  const [depositor, setDepositor] = React.useState('김성준');

  const regionCount = [
    '서울',
    '부산',
    '대구',
    '인천',
    '광주',
    '세종/대전/청주',
    '울산',
    '경기',
    '강원',
    '충청',
    '전라',
    '경상',
    '제주',
  ];
  const [region, setRegion] = React.useState('시/도 전체');
  const [isActiveToggleRegion, setIsActiveToggleRegion] = React.useState(false);
  const toggleRegion = () => {
    setIsActiveToggleRegion(!isActiveToggleRegion);
  };

  const printTypes = ['패키지', '일반인쇄', '기타인쇄'];
  const [printType, setPrintType] = React.useState('패키지');
  const [isActiveTogglePrintType, setIsActiveTogglePrintType] = React.useState(
    false,
  );
  const togglePrintType = () => {
    setIsActiveTogglePrintType(!isActiveTogglePrintType);
    setPrintDetail('세부 카테고리');
  };

  const packageTypes = [
    '칼라박스',
    '골판지박스',
    '합지골판지박스',
    '싸바리박스',
    '식품박스',
    '쇼핑백',
  ];
  const generalTypes = [
    '카달로그/브로슈어/팜플렛',
    '책자/서적류',
    '전단/포스터/안내장',
    '스티커/라벨',
    '봉투/명함',
  ];
  const etcTypes = ['상품권/티켓', '초대장/카드', '비닐BAG', '감압지', '기타'];

  const [printDetailType, setPrintDetail] = React.useState(null);
  const [isActiveToggleDetail, setIsActiveToggleDetail] = React.useState(false);
  const toggleDetail = () => {
    setIsActiveToggleDetail(!isActiveToggleDetail);
  };

  return (
    <>
      <Modal isVisible={isModalVisible} toggleModal={toggleModal} />
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{backgroundColor: '#F5F5F5'}}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              marginVertical: 10,
              paddingTop: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 100,
              }}>
              <Image
                source={require('../../src/assets/photo.png')}
                resizeMode="cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
            <Text
              style={[
                styles.normalText,
                {
                  textAlign: 'center',
                  fontSize: 15,
                  marginVertical: 5,
                  letterSpacing: -1,
                },
              ]}>
              프로필 이미지 등록
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View style={styles.profileBox}>
            <Text style={styles.profileTitle}>이메일</Text>
            <Text style={styles.profileDesc}>abcd@naver.com</Text>
          </View>
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              회원등급
            </Text>
            <View style={[styles.flexRowCenter, {marginBottom: 10}]}>
              <Text style={styles.profileDesc}>일반회원</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={toggleModal}>
                <Image
                  source={require('../../src/assets/q.png')}
                  resizeMode="contain"
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 5,
                    marginRight: 20,
                  }}
                />
              </TouchableOpacity>
              <Text
                style={[styles.profileDesc, {color: '#00A170', fontSize: 13}]}>
                일반회원/인기파트너스
              </Text>
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('ReqPopular')}>
              <View
                style={{
                  alignSelf: 'flex-start',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    fontSize: 12,
                    color: '#fff',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                  }}>
                  인기파트너스 신청
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 비밀번호 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              비밀번호 변경
            </Text>
            <TextInput
              placeholder="비밀번호를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
              autoCapitalize="none"
              secureTextEntry
            />
            <TextInput
              placeholder="비밀번호를 재입력해주세요."
              placeholderTextColor="#A2A2A2"
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
              secureTextEntry
            />
          </View>
          {/* // 비밀번호 변경 */}

          {/* 성함 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>성함</Text>
            <TextInput
              value={name}
              placeholder="성함을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setName(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 성함 변경 */}

          {/* 상호명 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              상호명
            </Text>
            <TextInput
              value={businessName}
              placeholder="상호명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBusinessName(text)}
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                fontFamily: 'SCDream4',
              }}
              autoCapitalize="none"
            />
          </View>
          {/* // 상호명 변경 */}

          {/* 휴대폰 번호 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              휴대폰 번호
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value={mobileNo}
                placeholder="휴대전화번호를 - 빼고 입력해주세요."
                placeholderTextColor="#A2A2A2"
                onChangeText={(text) => setMobileNo(text)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  fontFamily: 'SCDream4',
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  인증번호 전송
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginBottom: 5,
              }}>
              <TextInput
                value={mobileCert}
                placeholder="인증번호를 입력해주세요."
                placeholderTextColor="#A2A2A2"
                onChangeText={(text) => setMobileCert(text)}
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  fontFamily: 'SCDream4',
                }}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 15,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  인증번호 확인
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* // 휴대폰 번호 변경 */}

          {/* 사업자 등록증 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              사업자 등록증
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TextInput
                value="사업자등록증.jpg"
                placeholder="사업자 등록증을 첨부해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  fontFamily: 'SCDream4',
                }}
                editable={false}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  파일 선택
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert('다운로드')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  marginTop: 10,
                  marginBottom: 5,
                }}>
                <Image
                  source={require('../../src/assets/icon_down.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20, marginRight: 5}}
                />
                <Text style={styles.normalText}>사업자등록증.jpg</Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* // 사업자 등록증 변경 */}

          {/* 위치 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>위치</Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderTopRightRadius: 4,
                borderTopLeftRadius: 4,
                borderBottomRightRadius: isActiveToggleRegion ? 0 : 4,
                borderBottomLeftRadius: isActiveToggleRegion ? 0 : 4,
                backgroundColor: '#fff',
                width: '49%',
              }}>
              <TouchableOpacity
                onPress={toggleRegion}
                activeOpacity={0.8}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: 50,
                  paddingHorizontal: 10,
                }}>
                <Text style={{fontFamily: 'SCDream4'}}>{region}</Text>
                {isActiveToggleRegion ? (
                  <Image
                    source={require('../../src/assets/arr01_top.png')}
                    resizeMode="contain"
                    style={{width: 20, height: 20}}
                  />
                ) : (
                  <Image
                    source={require('../../src/assets/arr01.png')}
                    resizeMode="contain"
                    style={{width: 20, height: 20}}
                  />
                )}
              </TouchableOpacity>
            </View>
            {isActiveToggleRegion && (
              <View
                style={{
                  position: 'absolute',
                  top: 80,
                  left: 0,
                  width: '49%',
                  backgroundColor: '#fff',
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                  zIndex: 100,
                }}>
                {regionCount.map((v, idx) => (
                  <TouchableOpacity
                    key={idx}
                    style={{paddingVertical: 7, marginBottom: 7}}
                    activeOpacity={0.8}
                    onPress={() => {
                      setRegion(v);
                      setIsActiveToggleRegion(false);
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
          {/* // 위치 변경 */}

          {/* 제작물 카테고리 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              제작물 카테고리
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{width: '40%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    borderBottomRightRadius: isActiveTogglePrintType ? 0 : 4,
                    borderBottomLeftRadius: isActiveTogglePrintType ? 0 : 4,
                    backgroundColor: '#fff',
                  }}>
                  <TouchableOpacity
                    onPress={togglePrintType}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 50,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>{printType}</Text>
                    {isActiveTogglePrintType ? (
                      <Image
                        source={require('../../src/assets/arr01_top.png')}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    ) : (
                      <Image
                        source={require('../../src/assets/arr01.png')}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {isActiveTogglePrintType && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 51,
                      left: 0,
                      width: '100%',
                      backgroundColor: '#fff',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      zIndex: 100,
                    }}>
                    {printTypes.map((v, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={{
                          paddingVertical: 7,
                          backgroundColor: '#fff',
                          marginBottom: 7,
                          zIndex: 100,
                        }}
                        activeOpacity={0.8}
                        onPress={() => {
                          setPrintType(v);
                          setIsActiveTogglePrintType(false);
                          setIsActiveToggleDetail(false);
                        }}>
                        <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
              <View style={{width: '59%'}}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderTopRightRadius: 4,
                    borderTopLeftRadius: 4,
                    borderBottomRightRadius: isActiveToggleDetail ? 0 : 4,
                    borderBottomLeftRadius: isActiveToggleDetail ? 0 : 4,
                    backgroundColor: '#fff',
                  }}>
                  <TouchableOpacity
                    onPress={toggleDetail}
                    activeOpacity={0.8}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      height: 50,
                      paddingHorizontal: 10,
                    }}>
                    <Text style={{fontFamily: 'SCDream4'}}>
                      {printType === '패키지' && !printDetailType
                        ? packageTypes[0]
                        : printType === '일반인쇄' && !printDetailType
                        ? generalTypes[0]
                        : printType === '기타인쇄' && !printDetailType
                        ? etcTypes[0]
                        : printDetailType}
                    </Text>
                    {isActiveTogglePrintType ? (
                      <Image
                        source={require('../../src/assets/arr01_top.png')}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    ) : (
                      <Image
                        source={require('../../src/assets/arr01.png')}
                        resizeMode="contain"
                        style={{width: 20, height: 20}}
                      />
                    )}
                  </TouchableOpacity>
                </View>
                {isActiveToggleDetail && (
                  <View
                    style={{
                      position: 'absolute',
                      top: 51,
                      left: 0,
                      width: '100%',
                      backgroundColor: '#fff',
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      borderWidth: 1,
                      borderColor: '#E3E3E3',
                      borderBottomRightRadius: 5,
                      borderBottomLeftRadius: 5,
                      zIndex: 100,
                    }}>
                    {printType === '패키지'
                      ? packageTypes.map((v, idx) => (
                          <TouchableOpacity
                            key={idx}
                            style={{
                              paddingVertical: 7,
                              backgroundColor: '#fff',
                              marginBottom: 7,
                              zIndex: 100,
                            }}
                            activeOpacity={0.8}
                            onPress={() => {
                              setPrintDetail(v);
                              setIsActiveToggleDetail(false);
                              // setIsActiveTogglePrintType(false);
                            }}>
                            <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                          </TouchableOpacity>
                        ))
                      : printType === '일반인쇄'
                      ? generalTypes.map((v, idx) => (
                          <TouchableOpacity
                            key={idx}
                            style={{
                              paddingVertical: 7,
                              backgroundColor: '#fff',
                              marginBottom: 7,
                              zIndex: 100,
                            }}
                            activeOpacity={0.8}
                            onPress={() => {
                              setPrintDetail(v);
                              setIsActiveToggleDetail(false);
                              // setIsActiveTogglePrintType(false);
                            }}>
                            <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                          </TouchableOpacity>
                        ))
                      : etcTypes.map((v, idx) => (
                          <TouchableOpacity
                            key={idx}
                            style={{
                              paddingVertical: 7,
                              backgroundColor: '#fff',
                              marginBottom: 7,
                              zIndex: 100,
                            }}
                            activeOpacity={0.8}
                            onPress={() => {
                              setPrintDetail(v);
                              setIsActiveToggleDetail(false);
                              // setIsActiveTogglePrintType(false);
                            }}>
                            <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
                          </TouchableOpacity>
                        ))}
                  </View>
                )}
              </View>
            </View>
          </View>
          {/* // 제작물 카테고리 변경 */}

          {/* 계좌정보 변경 */}
          <View style={{marginBottom: 20, zIndex: -1}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              계좌정보
            </Text>
            <TextInput
              value={bank}
              placeholder="은행명을 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBank(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
            <TextInput
              value={bankAccount}
              placeholder="계좌번호를 - 빼고 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setBankAccount(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
            <TextInput
              value={depositor}
              placeholder="예금주를 입력해주세요."
              placeholderTextColor="#A2A2A2"
              onChangeText={(text) => setDepositor(text)}
              style={{
                fontFamily: 'SCDream4',
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: 5,
              }}
            />
          </View>
          {/* // 계좌정보 변경 */}

          {/* 회사 소개서 변경 */}
          <View style={{marginBottom: 20}}>
            <Text style={[styles.profileTitle, {marginBottom: 10}]}>
              회사 소개서
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <TextInput
                value="회사소개서.jpg"
                placeholder="회사 소개서를 첨부해주세요."
                placeholderTextColor="#A2A2A2"
                style={{
                  flex: 1,
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderRadius: 4,
                  paddingHorizontal: 10,
                  marginRight: 10,
                  fontFamily: 'SCDream4',
                }}
                editable={false}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 4,
                  height: 50,
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  파일 선택
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert('다운로드')}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  marginTop: 10,
                }}>
                <Image
                  source={require('../../src/assets/icon_down.png')}
                  resizeMode="contain"
                  style={{width: 20, height: 20, marginRight: 5}}
                />
                <Text style={styles.normalText}>회사소개서.jpg</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* // 회사 소개서 변경 */}

          <View style={{marginVertical: 50}}>
            <TouchableOpacity
              onPress={() => Alert.alert('수정 완료')}
              activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>수정 완료</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Alert.alert('취소')}
              activeOpacity={0.8}>
              <View style={styles.cancelBtn}>
                <Text style={styles.cancelBtnText}>취소</Text>
              </View>
            </TouchableOpacity>
          </View>
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

export default Edit;
