import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';

import {WebView} from 'react-native-webview';
import AutoHeightWebView from 'react-native-autoheight-webview';

import Header from '../DetailHeader';
import {SCDream4, SCDream5, SCDream6} from '../../../src/font';

const CompanyInfo = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      {/* <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height - 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.normalText}>회사 소개</Text>
        </View>
      </ScrollView> */}
      <AutoHeightWebView
        style={{
          width: Dimensions.get('window').width - 20,
          height: Dimensions.get('window').height - 300,
        }}
        source={{
          uri: `http://dmonster1506.cafe24.com/bbs/content.php?co_id=company`,
        }}
        scalesPageToFit={Platform.OS === 'Android' ? true : false}
        viewportContent={'width=device-width, user-scalable=no'}
      />
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
});

export default CompanyInfo;
