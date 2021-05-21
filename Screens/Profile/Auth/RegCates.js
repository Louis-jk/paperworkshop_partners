import * as React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const RegCates = (props) => {
  const categories = props.categories;
  const {categories_item} = props;
  const {setCategories_item} = props;
  const printTypes = ['패키지', '일반인쇄', '기타인쇄'];
  const [printType, setPrintType] = React.useState('패키지');
  const [isActiveTogglePrintType, setIsActiveTogglePrintType] = React.useState(
    false,
  );
  const togglePrintType = () => {
    setIsActiveTogglePrintType(!isActiveTogglePrintType);
    setPrintDetail('세부 카테고리');
  };

  const [printDetailType, setPrintDetail] = React.useState(null);
  const [isActiveToggleDetail, setIsActiveToggleDetail] = React.useState(false);
  const toggleDetail = () => {
    setIsActiveToggleDetail(!isActiveToggleDetail);
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

  const categoryRef = React.useRef(null);

  React.useEffect(() => {}, [categories]);
  const setCategories_item_handle = (key, item) => {
    const filter = categories_item.filter((item, idx) => {
      return idx === key;
    });
    if (filter.length !== 0) {
      setCategories_item(
        categories_item.map((element, idx) => {
          if (idx === key) {
            return {
              key: key,
              cate: item,
            };
          }
        }),
      );
    } else {
      setCategories_item([
        ...categories_item,
        {
          key: key,
          cate: item,
          ca_id: '',
        },
      ]);
    }
  };
  return categories.map((c, idx) => (
    <View
      key={idx}
      ref={categoryRef}
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
            <Text style={{fontFamily: SCDream4}}>{printType}</Text>
            {isActiveTogglePrintType ? (
              <Image
                source={require('../../../src/assets/arr01_top.png')}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            ) : (
              <Image
                source={require('../../../src/assets/arr01.png')}
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
            {printTypes.map((v, idx_key) => (
              <TouchableOpacity
                key={idx_key}
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
                  setCategories_item_handle(idx, v);
                }}>
                <Text style={{fontFamily: SCDream4}}>{v}</Text>
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
            <Text style={{fontFamily: SCDream4}}>
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
                source={require('../../../src/assets/arr01_top.png')}
                resizeMode="contain"
                style={{width: 20, height: 20}}
              />
            ) : (
              <Image
                source={require('../../../src/assets/arr01.png')}
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
                    <Text style={{fontFamily: SCDream4}}>{v}</Text>
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
                    <Text style={{fontFamily: SCDream4}}>{v}</Text>
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
                    <Text style={{fontFamily: SCDream4}}>{v}</Text>
                  </TouchableOpacity>
                ))}
          </View>
        )}
      </View>
    </View>
  ));
};

export default RegCates;
