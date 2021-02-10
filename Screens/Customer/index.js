import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';

import Header from '../Common/DetailHeader';

const index = (props) => {
  const navigation = props.navigation;
  const routeName = props.route.name;

  return (
    <>
      <Header title={routeName} navigation={navigation} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            height: Dimensions.get('window').height - 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={styles.normalText}>고객센터</Text>
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
