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
} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../Common/Header';
import Estimate from '../../src/api/Estimate';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  console.log('Main props :', props);

  const [isLoading, setIsLoading] = React.useState(false);
  const [list, setList] = React.useState([]);

  // 파트너스회원 email(Unique Key)
  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const getEstimateSendAPI = () => {
    setIsLoading(true);
    Estimate.getEstimateSend('test01@test.com')
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setList(res.data.item);
          setIsLoading(false);
        } else if (res.data.result === '1' && res.data.count == 0) {
          setList(res.data.item);
          setIsLoading(false);
        } else {
          Alert.alert(res.data.message, '', [
            {
              text: '확인',
            },
          ]);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert('문제가 있습니다.', err, [
          {
            text: '확인',
          },
        ]);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    getEstimateSendAPI();
  }, []);

  const [category01, setCategory01] = React.useState(null);

  console.log('category01 : ', category01);
  console.log('list!!!!!!!!!!! : ', list);

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
      status: '입찰중',
      order: false,
      pay: false,
      dDay: 'D-Day',
    },
    {
      id: 2,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '파트너 선정',
      order: false,
      pay: false,
      dDay: 'D-25',
    },
    {
      id: 3,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '파트너 선정',
      order: true,
      pay: false,
      dDay: 'D-25',
    },
    {
      id: 4,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '파트너 선정',
      order: true,
      pay: false,
      dDay: 'D-25',
    },
    {
      id: 5,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '파트너 선정',
      order: true,
      pay: true,
      dDay: 'D-25',
    },
    {
      id: 6,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '파트너 선정',
      order: true,
      pay: true,
      dDay: 'D-25',
    },
    {
      id: 7,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '파트너 선정',
      order: true,
      pay: true,
      dDay: 'D-25',
    },
    {
      id: 8,
      title: '[인쇄+디자인] 중소기업 박람회 리플렛 제...',
      description: '칼라 박스 - B형 십자 (경기/김성규)',
      status: '마감',
      order: true,
      pay: true,
      dDay: 'D-25',
    },
  ];

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
                    <Text style={styles.listStep02BadgeText}>
                      견적 확정 대기
                    </Text>
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
                <Text
                  style={
                    item.status === '1'
                      ? styles.listStep
                      : item.status === '2'
                      ? styles.listStep02
                      : {fontFamily: 'SCDream4', color: '#000'}
                  }>
                  {item.company_id !== mb_email
                    ? item.status === '1'
                      ? '견적발송'
                      : item.status === '2'
                      ? '파트너스최종선정(견적확정대기)'
                      : item.status === '3'
                      ? '파트너스최종선정(계약금입금대기)'
                      : item.status === '4'
                      ? '파트너스최종선정(계약금입금완료)'
                      : item.status === '5'
                      ? '입금제작요청'
                      : item.status === '6'
                      ? '납품완료'
                      : item.status === '7'
                      ? '수령완료'
                      : item.status === '8'
                      ? '마감'
                      : null
                    : '직접요청'}
                </Text>
                <Text style={styles.listDday02}>{item.dday}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </>
    );
  };

  // const renderRow = ({item, idx}) => {
  //   return (
  //     <>
  //       <View style={{paddingHorizontal: 20}} key={idx}>
  //         <TouchableOpacity
  //           onPress={() =>
  //             navigation.navigate('OrderStep', {
  //               screen: 'OrderStep',
  //               params: {pe_id: item.pe_id},
  //             })
  //           }
  //           activeOpacity={0.8}
  //           style={{zIndex: -1}}>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               alignItems: 'center',
  //             }}>
  //             <View style={styles.listWrap}>
  //               <Text style={styles.listTitle}>{item.title}</Text>
  //               <Text style={styles.listDesc}>{item.ca_name}</Text>
  //             </View>
  //             <View>
  //               <Text style={styles.listStep}>
  //                 {item.status === '0'
  //                   ? '입찰중'
  //                   : item.status === '1'
  //                   ? '파트너스최종선정(견적확정대기)'
  //                   : item.status === '2'
  //                   ? '파트너스최종선정(계약금입금대기)'
  //                   : item.status === '3'
  //                   ? '파트너스최종선정(계약금입금완료)'
  //                   : item.status === '4'
  //                   ? '입금제작요청'
  //                   : item.status === '5'
  //                   ? '납품완료'
  //                   : item.status === '6'
  //                   ? '수령완료'
  //                   : item.status === '7'
  //                   ? '마감'
  //                   : null}
  //               </Text>
  //               <Text style={styles.listDday}>{item.dday}</Text>
  //             </View>
  //           </View>
  //         </TouchableOpacity>
  //       </View>
  //       <View style={styles.line} />
  //     </>
  //   );
  // };

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
          data={list}
          renderItem={renderRow}
          keyExtractor={(list, index) => index.toString()}
          persistentScrollbar={true}
          showsVerticalScrollIndicator={false}
          style={{marginBottom: 120}}
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
