import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
} from 'react-native';

import Header from '../Common/DetailHeader';
import Info from '../../src/api/Info';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const [isLoading, setLoading] = React.useState(false);
  const [list, setList] = React.useState([]);
  const [step01, setStep01] = React.useState('');
  const [keyword, setKeyword] = React.useState('');

  const getFaqListHandler = (payload) => {
    setLoading(true);
    Info.getFaqList(payload)
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
    getFaqListHandler();
  }, []);

  const renderRow = ({item, index}) => {
    return (
      <>
        <TouchableOpacity
          style={{paddingHorizontal: 20}}
          activeOpacity={0.8}
          onPress={() =>
            navigation.navigate('CCenterDetail', {fa_id: item.fa_id})
          }>
          <View style={styles.categoryWrap}>
            <View
              style={{
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  // marginBottom: 12,
                }}>
                <Text style={styles.categoryTitle}>{item.fa_subject}</Text>
                {/* <Text style={styles.new}>NEW</Text> */}
              </View>
              {/* <Text style={styles.categoryDate}>2020.11.01</Text> */}
            </View>
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
              FAQ
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

          <TouchableOpacity
            onPress={() => navigation.navigate('CCenterQnA')}
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
              1:1문의
            </Text>
          </TouchableOpacity>
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
              value={keyword}
              placeholder="제목을 입력해주세요."
              placeholderTextColor="#BEBEBE"
              autoFocus={false}
              style={[styles.normalText, {width: '80%'}]}
              onChangeText={text => setKeyword(text)}
              onSubmitEditing={() => getFaqListHandler(keyword)}
            />
            {keyword ? 
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => {
                setKeyword(null);
                getFaqListHandler(null);
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
              activeOpacity={0.8}
              onPress={() => getFaqListHandler(keyword)}
            >
              <Image
                source={require('../../src/assets/top_seach.png')}
                resizeMode="contain"
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 자주묻는질문(FAQ) 리스트 */}
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
            <Text style={{fontFamily: SCDream4}}>
              문의하신 내역이 없습니다.
            </Text>
          </View>
        }
      />
      {/* // 자주묻는질문(FAQ) 리스트 */}
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
    backgroundColor: '#00A170',
    borderRadius: 2,
    paddingVertical: 5,
    paddingHorizontal: 7,
    marginRight: 5,
  },
  categoryBtnTxt: {
    fontFamily: SCDream4,
    fontSize: 11,
    color: '#fff',
  },
  new: {
    fontFamily: SCDream4,
    fontSize: 12,
    color: '#00A170',
    marginLeft: 10,
  },
  categoryTitle: {
    fontFamily: SCDream5,
    fontSize: 14,
    color: '#000',
  },
  categoryDate: {
    fontFamily: SCDream4,
    fontSize: 13,
    color: '#A2A2A2',
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

export default index;
