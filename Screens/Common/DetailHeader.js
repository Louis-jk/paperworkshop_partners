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

const DetailHeader = (props) => {
  const navigation = props.navigation;

  const [title, setTitle] = React.useState('');
  const {container, headerCtrl, headerTitle, icons} = styles;

  React.useEffect(() => {
    switch (props.title) {
      case 'Main':
        setTitle('페이퍼공작소');
        break;
      case 'Order':
        setTitle('견적의뢰');
        break;
      case 'OrderStep':
        setTitle('견적의뢰');
        break;
      case 'MessageDetail':
        setTitle('메세지');
        break;
      case 'PartnerInfo':
        setTitle('파트너스 회원 등급 안내');
        break;
      case 'Alarm':
        setTitle('알림 설정');
        break;
      case 'Statistics':
        setTitle('통계');
        break;
      default:
        return false;
    }
  }, [title]);

  return (
    <SafeAreaView style={{backgroundColor: '#fff'}}>
      <View style={container}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <View style={headerCtrl}>
            <View style={{paddingVertical: 10, paddingRight: 10}}>
              <Image
                source={require('../../src/images/left-chevron.png')}
                resizeMode="contain"
                style={{
                  width: 16,
                  height: 22,
                }}
              />
            </View>

            <Text style={headerTitle}>{title}</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={icons}>
          {/* <TouchableWithoutFeedback
            onPress={() => navigation.openDrawer('right')}>
            <View>
              <Image
                source={require('../../src/assets/top_seach02.png')}
                resizeMode="contain"
                style={{
                  width: 30,
                  height: 30,
                  marginRight: 20,
                }}
              />
            </View>
          </TouchableWithoutFeedback> */}
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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -1,
    lineHeight: 50,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default DetailHeader;
