import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  ActivityIndicator,
  FlatList,
  Alert,
  Keyboard,
} from 'react-native';
import {useSelector} from 'react-redux';

import Header from '../Common/DetailHeader';
import Info from '../../src/api/Info';

const QnA = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const [isLoading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [step01, setStep01] = React.useState('');
  const [search, setSearch] = React.useState(null);

  const qnaListAPIHandler = (payload) => {
    setLoading(true);
    Info.getQnaList(mb_email, payload)
      .then((res) => {
        if (res.data.result === '1' && res.data.count > 0) {
          setList(res.data.item);
          setLoading(false);
        } else {
          setList(null);
          setLoading(false);
        }
      })
      .catch((err) => {
        Alert.alert(err, '관리자에게 문의하세요', [
          {
            text: '확인',
          },
        ]);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      qnaListAPIHandler();
    });

    return unsubscribe;
  }, [navigation]);

  const renderRow = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{paddingHorizontal: 20}}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CCenterQnADetail', {qa_id: item.qa_id})
          }>
          <View style={styles.categoryWrap}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                <View
                  style={
                    item.qa_status === '0'
                      ? styles.categoryBtn
                      : styles.categoryBtn02
                  }>
                  <Text
                    style={
                      item.qa_status === '0'
                        ? styles.categoryBtnTxt
                        : styles.categoryBtnTxt02
                    }>
                    {item.qa_status === '0' ? '미답변' : '답변완료'}
                  </Text>
                </View>
                <Text style={styles.new}>
                  {item.new_yn === 'Y' ? 'NEW' : null}
                </Text>
              </View>
              <Text style={styles.categoryDate}>{item.qa_datetime}</Text>
            </View>
            <Text style={styles.categoryTitle}>{item.qa_subject}</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            height: 0.5,
            width: Dimensions.get('window').width,
            backgroundColor: '#E3E3E3',
          }}
        />
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
      <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          {/* 상단 탭 메뉴 Area */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CCenterNotice')}
              activeOpacity={0.8}
              hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 15,
                    marginRight: 20,
                    color: '#707070',
                  },
                ]}>
                공지사항
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('CCenter')}
              activeOpacity={0.8}
              hitSlop={{top: 5, bottom: 5, right: 5, left: 5}}>
              <Text
                style={[
                  styles.normalText,
                  {
                    fontSize: 15,
                    marginRight: 20,
                    color: '#707070',
                  },
                ]}>
                FAQ
              </Text>
            </TouchableOpacity>
            <View style={{position: 'relative'}}>
              <Text
                style={[
                  styles.mediumText,
                  {
                    fontSize: 15,
                    marginRight: 20,
                    color: '#000000',
                  },
                ]}>
                1:1문의
              </Text>
              <View
                style={{
                  position: 'absolute',
                  top: -1,
                  right: 13,
                  width: 6,
                  height: 6,
                  borderRadius: 6,
                  backgroundColor: '#00A170',
                }}
              />
            </View>
          </View>
          {/* // 상단 탭 메뉴 Area */}

          {/* 문의 등록 Area */}
          <TouchableOpacity
            activeOpacity={0.8}
            hitSlop={{top: 5, bottom: 5, left: 5, right: 5}}
            onPress={() => navigation.navigate('CCenterQnAwrite')}
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{fontFamily: 'SCDream4', fontSize: 13, color: '#00A170'}}>
              문의 등록
            </Text>
            <Image
              source={require('../../src/assets/icon_plus_02.png')}
              resizeMode="contain"
              style={{width: 18, height: 18, marginLeft: 5}}
            />
          </TouchableOpacity>
          {/* // 문의 등록 Area */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
            backgroundColor: '#fff',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#DEDEDE',
              borderRadius: 5,
              paddingHorizontal: 10,
              backgroundColor: '#fff',
              width: '100%',
            }}>
            <TextInput
              value={search}
              placeholder="제목을 입력해주세요."
              placeholderTextColor="#BEBEBE"
              autoFocus={false}
              style={[styles.normalText, {width: '80%'}]}
              onChangeText={(text) => setSearch(text)}
              onSubmitEditing={() => qnaListAPIHandler(search)}
            />
            {search ? 
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setSearch(null);
                qnaListAPIHandler(null);
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 23,
                  height: 23,
                  borderRadius: 23,
                  backgroundColor: '#EFEFEF',
                }}>
                <Image
                  source={require('../../src/assets/icon_close02.png')}
                  resizeMode="cover"
                  style={{
                    width: 15,
                    height: 15,
                  }}
                  fadeDuration={1000}
                />
              </View>
            </TouchableOpacity>
            : null}
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                qnaListAPI();
              }}
              activeOpacity={1}>
              <Image
                source={require('../../src/assets/top_seach.png')}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 문의 리스트 */}
      <FlatList
        data={list}
        renderItem={renderRow}
        keyExtractor={(list, index) => index.toString()}
        numColumns={1}
        // pagingEnabled={true}
        persistentScrollbar={true}
        showsVerticalScrollIndicator={false}
        progressViewOffset={true}
        refreshing={true}
        style={{backgroundColor: '#fff'}}
        ListEmptyComponent={
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flex: 1,
              height: Dimensions.get('window').height - 300,
            }}>
            <Text style={{fontFamily: 'SCDream4'}}>
              문의하신 내역이 없습니다.
            </Text>
          </View>
        }
      />
      {/* // 문의 리스트 */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  categoryWrap: {
    paddingVertical: 20,
  },
  categoryBtn: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#00A170',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 7,
  },
  categoryBtnTxt: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#00A170',
  },
  categoryBtn02: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#F5F5F5',
    borderRadius: 2,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 7,
  },
  categoryBtnTxt02: {
    fontFamily: 'SCDream4',
    fontSize: 11,
    color: '#000',
  },
  new: {
    fontFamily: 'SCDream4',
    fontSize: 12,
    color: '#00A170',
  },
  categoryTitle: {
    fontFamily: 'SCDream5',
    fontSize: 14,
    color: '#000',
  },
  categoryDate: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#A2A2A2',
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

export default QnA;
