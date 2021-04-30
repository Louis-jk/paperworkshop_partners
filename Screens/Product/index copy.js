import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';

// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

import Header from '../Common/Header';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;


  const [category01, setCategory01] = React.useState(null);


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

  const searchTypes = ['제목', '회사'];
  const [searchType, setSearchType] = React.useState('제목');
  const [
    isActiveToggleSearchType,
    setIsActiveToggleSearchType,
  ] = React.useState(false);
  const toggleSearchType = () => {
    setIsActiveToggleSearchType(!isActiveToggleSearchType);
  };

  const orders = [
    {
      id: 1,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '제작 요청',
      order: false,
      pay: false,
      dDay: 'D-Day',
      deliveryDay: '2020.12.30',
    },
    {
      id: 2,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '납품 완료',
      order: false,
      pay: false,
      dDay: 'D-Day',
      deliveryDay: '2020.12.30',
    },
    {
      id: 3,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '수령 완료',
      order: false,
      pay: false,
      dDay: 'D-Day',
      deliveryDay: '2020.12.30',
    },
    {
      id: 4,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '수령 완료',
      order: false,
      pay: false,
      dDay: 'D-Day',
      deliveryDay: '2020.12.30',
    },
    {
      id: 5,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '수령 완료',
      order: false,
      pay: false,
      dDay: 'D-Day',
      deliveryDay: '2020.12.30',
    },
    {
      id: 6,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '수령 완료',
      order: false,
      pay: false,
      dDay: 'D-Day',
      deliveryDay: '2020.12.30',
    },
  ];

  const renderRow = ({item}) => {
    return (
      <>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('OrderDetailProps', {
                screen: 'OrderDetailProps',
                params: {
                  title:
                    item.status === '제작 요청'
                      ? '제작 요청'
                      : item.status === '납품 완료'
                      ? '납품 완료'
                      : '수령 완료',
                },
              })
            }
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDesc}>{item.description}</Text>
                <View style={styles.listStep04Badge}>
                  <Text style={styles.listStep04BadgeText}>
                    납품 희망일 {item.deliveryDay}
                  </Text>
                </View>
              </View>
              <View>
                <Text style={styles.listStep}>{item.status}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </>
    );
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <View style={styles.container}>
        {/* 카테고리 선택 및 검색 부분 */}
        <View
          style={{
            width: Dimensions.get('window').width,
            backgroundColor: '#F5F5F5',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 5,
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
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: '#E3E3E3',
                  borderTopRightRadius: 4,
                  borderTopLeftRadius: 4,
                  borderBottomRightRadius: isActiveToggleSearchType ? 0 : 4,
                  borderBottomLeftRadius: isActiveToggleSearchType ? 0 : 4,
                  backgroundColor: '#fff',
                  width: 95,
                  zIndex: -1,
                }}>
                <TouchableOpacity
                  onPress={toggleSearchType}
                  activeOpacity={0.8}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{fontFamily: 'SCDream4'}}>{searchType}</Text>
                  {isActiveToggleSearchType ? (
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

              <View style={{width: 230}}>
                <TextInput
                  placeholder="검색어를 입력하세요."
                  style={{
                    fontFamily: 'SCDream4',
                    borderWidth: 1,
                    borderColor: '#E3E3E3',
                    borderRadius: 4,
                    backgroundColor: '#fff',
                    paddingHorizontal: 10,
                    height: 52,
                    marginLeft: 4,
                    marginRight: 4,
                  }}
                />
              </View>
            </View>
            <TouchableWithoutFeedback>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#00A170',
                  borderRadius: 4,
                  height: 52,
                }}>
                <Text
                  style={{
                    fontFamily: 'SCDream4',
                    color: '#fff',
                    paddingHorizontal: 20,
                  }}>
                  검색
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        {/* // 카테고리 선택 및 검색 부분 */}

        {/* 리스트 출력 부분 */}

        <FlatList
          data={orders}
          renderItem={renderRow}
          keyExtractor={(list, index) => index.toString()}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 200}}
          // onEndReached={handleLoadMore}
        />

        {/* // 리스트 출력 부분 */}

        {isActiveTogglePrintType && (
          <View
            style={{
              position: 'absolute',
              top: 70,
              left: 10,
              width: '38%',
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

        {isActiveToggleDetail && (
          <View
            style={{
              position: 'absolute',
              top: 70,
              right: 10,
              width: '56.1%',
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
                      marginBottom: 7,
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

        {isActiveToggleSearchType && (
          <View
            style={{
              position: 'absolute',
              top: 127,
              left: 10,
              width: 95,
              backgroundColor: '#fff',
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: '#E3E3E3',
              borderBottomRightRadius: 5,
              borderBottomLeftRadius: 5,
              zIndex: 100,
            }}>
            {searchTypes.map((v, idx) => (
              <TouchableOpacity
                key={idx}
                style={{
                  paddingVertical: 7,
                  backgroundColor: '#fff',
                  marginBottom: 7,
                }}
                activeOpacity={0.8}
                onPress={() => {
                  setSearchType(v);
                  setIsActiveToggleSearchType(false);
                  // setIsActiveTogglePrintType(false);
                  // setIsActiveToggleDetail(false);
                }}>
                <Text style={{fontFamily: 'SCDream4'}}>{v}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
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
    fontSize: 14,
    lineHeight: 16,
    color: '#000000',
  },
  listStep: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
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
  listStep02: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#275696',
  },
  listDday02: {
    fontFamily: 'SCDream4',
    alignSelf: 'flex-end',
    fontSize: 14,
    color: '#000000',
  },
  listStep03: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#E3E3E3',
  },
  listStep02Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#00A170',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep02BadgeText: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  listStep03Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    backgroundColor: '#F5F5F5',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep03BadgeText: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#000000',
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  listStep04Badge: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    backgroundColor: 'rgba(0, 161, 112, 0.07)',
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  listStep04BadgeText: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#00A170',
    paddingVertical: 2,
    paddingHorizontal: 5,
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
