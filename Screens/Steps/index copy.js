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
  ActivityIndicator,
  Alert,
} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../Common/Header';
import Estimate from '../../src/api/Estimate';
import Category from '../../src/api/Category';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [isLoading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]); // 견적 리스트 API 호출 결과값
  const [menu, setMenu] = React.useState('All');
  const [cateV, setCateV] = React.useState(null);
  const [caIdV, setCaIdV] = React.useState(null);
  const [keyword, setKeyword] = React.useState(null);

  const searchTypes = ['title', 'company'];
  const [search, setSearch] = React.useState('title');

  // 파트너스회원 email(Unique Key)
  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const printTypes = ['전체', '패키지', '일반인쇄', '기타인쇄'];
  const [printType, setPrintType] = React.useState('전체');
  const [isActiveTogglePrintType, setIsActiveTogglePrintType] = React.useState(
    false,
  );

  const togglePrintType = () => {
    setIsActiveTogglePrintType(!isActiveTogglePrintType);
    setPrintDetail('세부 카테고리');
  };

  // 리스트 출력 API 호출
  const getEstimateAllListAPI = () => {
    setLoading(true);

    Estimate.getList(null, '5', mb_email, cateV, caIdV, search, keyword)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setList(res.data.item);
          setLoading(false);
        } else if (res.data.result === '1' && res.data.count == 0) {
          setList(res.data.item);
          setLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    getEstimateAllListAPI();
    setPrintDetail('세부 카테고리');
  }, [cateV, caIdV, search]);

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

  const getCategoryDetail = (cate1_value) => {
    Category.getDetail(cate1_value)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setDetailTypes(res.data.item);
        } else {
          Alert.alert(res.data.message, '', [
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

  const [
    isActiveToggleSearchType,
    setIsActiveToggleSearchType,
  ] = React.useState(false);
  const toggleSearchType = () => {
    setIsActiveToggleSearchType(!isActiveToggleSearchType);
  };

  const renderRow = ({item}) => {
    return (
      <>
        <View style={{paddingHorizontal: 20}}>
          <TouchableOpacity
            onPress={() => {
              item.status === '0' || item.company_id === mb_email
                ? navigation.navigate('OrderStep', {
                    screen: 'OrderStep',
                    params: {pe_id: item.pe_id},
                  })
                : item.status === '1'
                ? navigation.navigate('OrderEdit', {
                    screen: 'OrderEdit',
                    params: {
                      status: 'choiceWait',
                    },
                  })
                : item.status === '2'
                ? navigation.navigate('OrderEdit', {
                    screen: 'OrderEdit',
                    params: {
                      status: 'payWait',
                    },
                  })
                : item.status === '3'
                ? navigation.navigate('OrderEdit', {
                    screen: 'OrderEdit',
                    params: {
                      status: 'payDone',
                    },
                  })
                : navigation.navigate('OrderComplete');
            }}
            activeOpacity={0.8}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={styles.listWrap}>
                {item.company_id === mb_email ? (
                  <View style={styles.listStep02Badge}>
                    <Text style={styles.listStep02BadgeText}>
                      사용자로부터 직접 견적요청
                    </Text>
                  </View>
                ) : item.status === '1' ? (
                  <View style={styles.listStep02Badge}>
                    <Text style={styles.listStep02BadgeText}>견적발송</Text>
                  </View>
                ) : item.status === '2' ? (
                  <View style={styles.listStep02Badge}>
                    <Text style={styles.listStep02BadgeText}>
                      계약금 입금 대기
                    </Text>
                  </View>
                ) : item.status === '3' ? (
                  <View style={styles.listStep03Badge}>
                    <Text style={styles.listStep03BadgeText}>
                      계약금 입금 완료
                    </Text>
                  </View>
                ) : null}
                <Text style={styles.listTitle}>{item.title}</Text>
                <Text style={styles.listDesc}>{item.ca_name}</Text>
              </View>
              <View>
                <Text style={styles.listDday02}>{item.dday}</Text>
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
                  onPress={() => {
                    if (printType !== '전체') {
                      toggleDetail();
                    } else {
                      Alert.alert(
                        '전체일 경우 세부 카테고리를 지정하실 수 없습니다.',
                        '카테고리명을 지정하여 이용해 주세요.',
                        [
                          {
                            text: '확인',
                          },
                        ],
                      );
                    }
                  }}
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
                  <Text style={{fontFamily: 'SCDream4'}}>
                    {search === 'title' ? '제목' : '회사'}
                  </Text>
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
                  onChangeText={(text) => setKeyword(text)}
                  onSubmitEditing={() => getEstimateAllListAPI()}
                />
              </View>
            </View>
            <TouchableWithoutFeedback onPress={getEstimateAllListAPI}>
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
          data={list}
          renderItem={renderRow}
          keyExtractor={(list, index) => index.toString()}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 120}}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                height: Dimensions.get('window').height - 330,
              }}>
              <Text style={{fontFamily: 'SCDream4'}}>
                등록된 견적 요청사항이 없습니다.
              </Text>
            </View>
          }
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
                  if (v === '전체') {
                    setCateV(null);
                  } else if (v === '패키지') {
                    setCateV('1');
                    getCategoryDetail('1');
                  } else if (v === '일반인쇄') {
                    setCateV('0');
                    getCategoryDetail('0');
                  } else {
                    setCateV('2');
                    getCategoryDetail('2');
                  }
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
                <Text style={{fontFamily: 'SCDream4'}}>
                  {v === 'title' ? '제목' : '회사'}
                </Text>
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
    height: Dimensions.get('window').height,
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
    marginBottom: 5,
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
    color: '#00A170',
    marginBottom: 5,
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
