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
      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
          <TouchableOpacity
            onPress={() => navigation.navigate('MessageDetail')}
            activeOpacity={0.8}>
            <View style={[styles.wrap, styles.msgBox]}>
              <View style={styles.flexRow}>
                <Image
                  source={{
                    uri:
                      'https://img.freepik.com/free-photo/portrait-cheerful-attractive-young-woman-longsleeve-standing-with-arms-crossed-smiling_295783-39.jpg?size=626&ext=jpg',
                  }}
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
          <View style={[styles.wrap, styles.msgBox]}>
            <View style={styles.flexRow}>
              <Image
                source={{
                  uri:
                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSId_V6IdniMTIkPLs_6LHkBL6o8GyF4U9k6A&usqp=CAU',
                }}
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
          <View style={[styles.wrap, styles.msgBox]}>
            <View style={styles.flexRow}>
              <Image
                source={{
                  uri:
                    'https://images.fastcompany.net/image/upload/w_596,c_limit,q_auto:best,f_auto/fc/3025992-inline-i-design-work4.jpg',
                }}
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
    fontSize: 14,
    color: '#000000',
    marginBottom: 5,
  },
  msgInfoContent: {
    fontSize: 13,
    color: '#000000',
  },
});

export default index;
