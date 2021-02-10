import * as React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TextInput,
  Button,
  Image,
} from 'react-native';

// import RNPickerSelect from 'react-native-picker-select';
import {Picker} from '@react-native-community/picker';

import Header from '../Common/Header';
import Footer from '../Common/Footer';
import {TouchableOpacity} from 'react-native-gesture-handler';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  console.log('props :', props);

  const [category01, setCategory01] = React.useState(null);
  const [value, setValue] = React.useState(null);

  console.log('category01 : ', category01);

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.wrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={require('../../src/images/person01.jpg')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 20,
                  }}
                />
                <View style={{flex: 2}}>
                  <Text style={styles.msgInfoName}>삼보인쇄</Text>
                  <Text style={styles.msgInfoContent} numberOfLines={1}>
                    안녕하세요. 박스견적 문의 드릴게 있어요 ...
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image
                      source={require('../../src/assets/icon_close01.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginBottom: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={require('../../src/images/package02.jpg')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 20,
                  }}
                />
                <View style={{flex: 2}}>
                  <Text style={styles.msgInfoName}>업체명</Text>
                  <Text style={styles.msgInfoContent} numberOfLines={1}>
                    안녕하세요. 박스견적 문의 드릴게 있어요 ...
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image
                      source={require('../../src/assets/icon_close01.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginBottom: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={require('../../src/images/package03.jpg')}
                  resizeMode="cover"
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    marginRight: 20,
                  }}
                />
                <View style={{flex: 2}}>
                  <Text style={styles.msgInfoName}>업체명</Text>
                  <Text style={styles.msgInfoContent} numberOfLines={1}>
                    안녕하세요. 박스견적 문의 드릴게 있어요 ...
                  </Text>
                </View>
                <View style={{position: 'relative'}}>
                  <TouchableOpacity activeOpacity={0.8}>
                    <Image
                      source={require('../../src/assets/icon_close01.png')}
                      resizeMode="contain"
                      style={{
                        width: 30,
                        height: 30,
                        marginBottom: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  wrap: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  msgBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 5,
    marginBottom: 5,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  msgInfoName: {
    fontFamily: 'SCDream4',
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  msgInfoContent: {
    fontFamily: 'SCDream4',
    fontSize: 13,
    color: '#000000',
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
