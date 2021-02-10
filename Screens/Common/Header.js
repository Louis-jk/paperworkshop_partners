import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  SafeAreaView,
} from 'react-native';

const Header = (props) => {
  const navigation = props.navigation;

  const [title, setTitle] = React.useState('');
  const {container, headerCtrl, headerTitle, icons} = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'Main':
        setTitle('페이퍼공작소');
        break;
      case 'Steps':
        setTitle('페이퍼공작소');
        break;
      case 'Product':
        setTitle('페이퍼공작소');
        break;
      case 'Message':
        setTitle('페이퍼공작소');
        break;
      case 'ProfileEdit':
        setTitle('회원 정보 수정');
        break;
      case 'Signed':
        setTitle('회원 가입 완료');
        break;
      case 'SetPwdComplete':
        setTitle('비밀번호 변경 완료');
        break;
      default:
        return false;
    }
  }, [title]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={container}>
        <View style={headerCtrl}>
          <Text style={headerTitle}>{title}</Text>
        </View>

        <View style={icons}>
          <TouchableWithoutFeedback
            onPress={() => navigation.openDrawer('right')}>
            <View>
              <Image
                source={require('../../src/assets/icon_menu.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 3,
    // height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerCtrl: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#ffaaee',
  },
  headerTitle: {
    fontFamily: 'SCDream5',
    fontSize: 18,
    letterSpacing: -1,
    lineHeight: 50,
    marginBottom: 2,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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

export default Header;
