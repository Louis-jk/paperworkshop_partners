import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {useSelector} from 'react-redux';

import Header from '../Common/HeaderBackBtnNotSearch';
import Info from '../../src/api/Info';
import {SCDream4, SCDream5, SCDream6} from '../../src/font';

const QnAwrite = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  const {mb_email} = useSelector((state) => state.UserInfoReducer);

  const faqTitleRef = React.useRef(null);
  const faqContentRef = React.useRef(null);

  const [title, setTitle] = React.useState(null); // 문의 제목 담기
  const [content, setContent] = React.useState(null); // 문의 내용 담기
  const [titleError, setTitleError] = React.useState(null); // 문의 제목 입력 없을 시(유효성)
  const [contentError, setContentError] = React.useState(null); // 문의 내용 입력 없을 시(유효성)

  const senFaqAPI = () => {
    if (title === null || title === '') {
      setTitleError(true);
      faqTitleRef.current.focus();
    } else if (content === null || content === '') {
      setContentError(true);
      faqContentRef.current.focus();
    } else {
      Info.sendQna(mb_email, title, content)
        .then((res) => {
          if (res.data.result === '1' && res.data.count > 0) {
            Alert.alert(res.data.message, '문의 리스트로 이동합니다.', [
              {
                text: '리스트 이동',
                onPress: () => navigation.navigate('CCenterQnA'),
              },
              {
                text: '홈으로 이동',
                onPress: () => navigation.navigate('Stack'),
              },
            ]);
          } else {
            Alert.alert(res.data.message, '', [
              {
                text: '확인',
              },
            ]);
          }
        })
        .catch((err) => {
          Alert.alert(err, '관리자에게 문의하세요', [
            {
              text: '확인',
            },
          ]);
        });
    }
  };

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 20, paddingVertical: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.profileTitle, {marginRight: 5}]}>
              문의 제목
            </Text>
            <Text style={[styles.profileRequired]}>(필수)</Text>
          </View>
          <TextInput
            ref={faqTitleRef}
            value={title}
            placeholder="문의 제목을 입력해주세요."
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                fontSize: 14,
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 4,
                paddingHorizontal: 10,
                marginBottom: titleError ? 5 : 25,
              },
            ]}
            onChangeText={(text) => {
              setTitle(text);
              setTitleError(false);
            }}
            autoCapitalize="none"
            onSubmitEditing={() => faqContentRef.current.focus()}
          />
          {titleError ? (
            <Text
              style={{
                width: '100%',
                fontFamily: SCDream4,
                fontSize: 12,
                lineHeight: 18,
                color: '#00A170',
                marginBottom: 25,
              }}>
              문의 제목을 입력해주세요.
            </Text>
          ) : null}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={[styles.profileTitle, {marginRight: 5}]}>
              문의 내용
            </Text>
            <Text style={[styles.profileRequired]}>(필수)</Text>
          </View>
          <TextInput
            ref={faqContentRef}
            value={content}
            placeholder="문의 내용을 입력해주세요."
            placeholderTextColor="#A2A2A2"
            style={[
              styles.normalText,
              {
                borderWidth: 1,
                borderColor: '#E3E3E3',
                borderRadius: 5,
                backgroundColor: '#fff',
                height: 200,
                flex: 1,
                textAlignVertical: 'top',
                paddingLeft: 10,
                paddingVertical: 10,
                marginBottom: contentError ? 5 : 50,
              },
            ]}
            onChangeText={(text) => {
              setContent(text);
              setContentError(false);
            }}
            multiline={true}
          />
          {contentError ? (
            <Text
              style={{
                width: '100%',
                fontFamily: SCDream4,
                fontSize: 12,
                lineHeight: 18,
                color: '#00A170',
                marginBottom: 50,
              }}>
              문의 내용을 입력해주세요.
            </Text>
          ) : null}
          <View style={{marginBottom: 50}}>
            <TouchableOpacity onPress={() => senFaqAPI()} activeOpacity={0.8}>
              <View style={[styles.submitBtn, {marginBottom: 10}]}>
                <Text style={styles.submitBtnText}>문의하기</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
  normalText: {
    fontFamily: SCDream4,
  },
  mediumText: {
    fontFamily: SCDream5,
  },
  boldText: {
    fontFamily: SCDream6,
  },
  profileTitle: {
    fontFamily: SCDream5,
    fontSize: 15,
    color: '#111',
  },
  profileRequired: {
    fontFamily: SCDream4,
    fontSize: 14,
    color: '#00A170',
  },
  submitBtn: {
    borderRadius: 4,
    backgroundColor: '#00A170',
    width: '100%',
    paddingVertical: 15,
  },
  submitBtnText: {
    fontFamily: SCDream4,
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
    fontFamily: SCDream4,
    fontSize: 16,
    color: '#111',
    textAlign: 'center',
  },
});

export default QnAwrite;
